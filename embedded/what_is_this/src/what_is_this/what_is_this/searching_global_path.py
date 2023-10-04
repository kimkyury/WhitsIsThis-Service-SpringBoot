import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from nav_msgs.msg import Odometry,OccupancyGrid,Path
from geometry_msgs.msg import Pose,PoseStamped
from sensor_msgs.msg import LaserScan
import what_is_this.utils as utils

from sys import maxsize as INF
from PIL import Image
import numpy as np
from heapq import heappush, heappop
from collections import deque

DELTA = ((-1, 0), (1, 0), (0, -1), (0, 1))
DELTA_D = ((0, 1, 1), (1, 1, 1.414), (1, 0, 1), (1, -1, 1.414), (0, -1, 1), (-1, -1, 1.414), (-1, 0, 1), (-1, 1, 1.414))
MAP_LENGTH = 340

params_map = {
    "MAP_RESOLUTION" : 0.05,
    "OCCUPANCY_UP" : 0.02,
    "OCCUPANCY_DOWN" : 0.01,
    "MAP_CENTER" : (-9.0, 10.0),
    "MAP_SIZE" : (17, 17),
    "MAP_FILENAME" : 'test.png',
    "MAPVIS_RESIZE_SCALE" : 2.0
}

def floodFill(x: int, y: int, Map: np) -> np:
    visit = np.zeros((340,340))
    Map[x][y] = 60
    visit[x][y] = 1
    q = deque([(x, y)])

    while q:
        cx, cy = q.popleft()
        for dx, dy in DELTA:
            nx = cx + dx
            ny = cy + dy
            if nx < 0 or nx >= 340 or ny < 0 or ny >= 340:continue
            if visit[nx][ny]:continue
            if Map[nx][ny] > 95:continue
            if Map[nx][ny] == 0:continue
            visit[nx][ny] = 1
            Map[nx][ny] = 60
            q.append((nx,ny))
    return Map

def dijkstra(x: int, y: int, Map: list, points: dict) -> tuple:
    visit = [[[INF, 0] for _ in range(MAP_LENGTH)] for _ in range(MAP_LENGTH)]
    visit[x][y] = [0, 0]
    h = [(0, x, y)]
    check = True

    while h:
        cost, cur_x, cur_y = heappop(h)

        if points.get((cur_x, cur_y),0):check = False;break
        if visit[cur_x][cur_y][0] < cost:continue

        for dx, dy, w in DELTA_D:
            nx = cur_x + dx
            ny = cur_y + dy
            if nx < 0 or ny < 0 or nx >= MAP_LENGTH or ny >= MAP_LENGTH:continue
            if Map[nx][ny] >= 59:continue
            total_cost = cost + w
            if total_cost < visit[nx][ny][0]:
                visit[nx][ny] = [total_cost, (cur_x, cur_y)]
                heappush(h, (total_cost, nx, ny))

    if check:return None
    history = []
    cur = (cur_x, cur_y)
    while visit[cur[0]][cur[1]][1]:
        history.append(cur)
        cur = visit[cur[0]][cur[1]][1]
    history.reverse()

    return history

def make_path(start_x: int, start_y: int, Path_points: dict, Map: np) -> None:
    print('경로 생성 중')
    path = []
    cur_x, cur_y = start_x, start_y
    total = len(Path_points)

    while Path_points:
        target = Path_points.get((cur_x, cur_y),0)
        if target:
            if cur_y < target:
                for i in range(cur_y, target+1):
                    path.append((cur_x, i))
            elif cur_y > target:
                for i in range(cur_y, target-1, -1):
                    path.append((cur_x, i))
            
            Path_points.pop((cur_x, cur_y))
            Path_points.pop((cur_x, target))
            cur_y = target
        
        print(f'\r진행율 :  {round((1-(len(Path_points)/total))*100,2)} %            ',end="")
        min_path = dijkstra(cur_x, cur_y, Map, Path_points)
        if min_path == None:
            print('\n생성 종료')
            return path
        path.extend(min_path)

        cur_x, cur_y = path[-1]
    
    print('생성 완료')
    return path

class Searching_path(Node):

    def __init__(self):
        super().__init__('searching_path')
        self.map_sub = self.create_subscription(OccupancyGrid, 'map', self.map_callback, 1)
        self.odom_sub = self.create_subscription(Odometry, 'odom', self.odom_callback, 1)
        self.status_sub =  self.create_subscription(String, 'progress', self.check_status, 10)
        self.subscription = self.create_subscription(LaserScan, 'scan',self.scan_callback,20)
        self.status_publisher = self.create_publisher(String, 'result', 1)
        self.global_path_pub = self.create_publisher(Path, 'global_path', 1)
        
        self.map_msg = OccupancyGrid()
        self.odom_msg = Odometry()
        self.result_msg = String()

        self.is_map=False
        self.is_odom=False
        self.status=None
        self.map_data=None
        self.pre_map=None
        self.pose_x=None
        self.pose_y=None

        self.map_size_x=MAP_LENGTH
        self.map_size_y=MAP_LENGTH

        self.map_center = params_map["MAP_CENTER"]
        self.map_resolution = params_map["MAP_RESOLUTION"]
        self.map_size = np.array(params_map["MAP_SIZE"]) / self.map_resolution
        self.map_offset_x=-2.8
        self.map_offset_y=4


    def scan_callback(self,msg):
        pose_x=msg.range_min
        pose_y=msg.scan_time
        heading=msg.time_increment+180
        pose = np.array([[pose_x],[pose_y],[heading]])
        self.pose_x = (pose[0] - self.map_center[0] + (self.map_size[0]*self.map_resolution)/2) / self.map_resolution
        self.pose_y = (pose[1] - self.map_center[1] + (self.map_size[1]*self.map_resolution)/2) / self.map_resolution
        pose = np.array([self.pose_x, self.pose_y]).reshape(-1).astype(np.int)
        self.pose_x = pose[0]
        self.pose_y = pose[1]

    def odom_callback(self,msg):
        self.is_odom=True
        self.odom_msg=msg
        
        """
        nav_msgs.msg.Odometry(header=std_msgs.msg.Header(stamp=builtin_interfaces.msg.Time(sec=0, nanosec=0), frame_id='map'), child_frame_id='base_link', pose=geometry_msgs.msg.PoseWithCovariance(pose=geometry_msgs.msg.Pose(position=geometry_msgs.msg.Point(x=-9.999999997751436, y=-8.000000828715963, z=0.0), orientation=geometry_msgs.msg.Quaternion(x=0.0, y=0.0, z=-0.7061468362475904, w=0.708065424701361)), covariance=array([0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
        0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
        0., 0.])), twist=geometry_msgs.msg.TwistWithCovariance(twist=geometry_msgs.msg.Twist(linear=geometry_msgs.msg.Vector3(x=3.0073977086431114e-07, y=0.0, z=0.0), angular=geometry_msgs.msg.Vector3(x=0.0, y=0.0, z=-0.0)), covariance=array([0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
        0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 0.,
        0., 0.])))
        """

    def map_callback(self,msg):
        self.is_map=True
        map_data=np.array(msg.data)
        map_data=map_data.reshape((340,340))
        # 대각선 대칭
        map_data = np.rot90(map_data, k=1)
        map_data = np.flipud(map_data)
        self.map_data=map_data
        
    def check_status(self,msg):
        self.status = msg.data
        if self.status == "CALCULATE_PATH" and self.is_map:
            self.path_pub()
    
    def grid_cell_to_pose(self,grid_cell):
        x = grid_cell[0] * self.map_resolution + self.map_center[0] - (self.map_size[0] * self.map_resolution) / 2
        y = grid_cell[1] * self.map_resolution + self.map_center[1] - (self.map_size[1] * self.map_resolution) / 2
        return [x,y]
    
    def path_pub(self):
        Path_points=dict()
        self.pre_map = self.map_data
        # print(self.map_data)
        for x in range(340):
            for y in range(340):
                if self.pre_map[x][y] == 100:
                    for i in range(-7,8):
                        for j in range(-7,8):
                            if 0 <= x+i < 340 and 0 <= y+j < 340:
                                if self.pre_map[x+i][y+j] != 100:
                                    self.pre_map[x+i][y+j] = 127
        
        self.pre_map = floodFill(0, 0, self.pre_map)
        print('Map 전처리')
        for x in range(0,340,10):
            min_y, max_y = INF, 0
            y = 0
            while y < 340:
                while y < 340 and self.pre_map[x][y] < 50:
                    min_y = y if y < min_y else min_y
                    max_y = y if y > max_y else max_y
                    y+=1
                
                if x != INF and min_y != INF and x != 0 and max_y != 0:
                    Path_points[(x, min_y)] = max_y
                    Path_points[(x, max_y)] = min_y
                    min_y, max_y = INF, 0
                y+=1

        print('경로 전처리')
        # (start_point_x, start_point_y), _ = sorted(list(Path_points.items()))[0]
        print(self.pose_x,self.pose_y)
        route = make_path(self.pose_x, self.pose_y, Path_points, self.pre_map)
        # route = make_path(start_point_x, start_point_y, Path_points, self.pre_map)
        # print(route)

        # 확인용 이미지화
        for x, y in route:
            self.pre_map[x][y] = 254
                
        # map_img = Image.fromarray(self.pre_map)
        # map_img.show()

        print('경로 전송')
        if len(route)!=0:
            self.global_path_msg=Path()
            self.global_path_msg.header.frame_id='map'

            for grid_cell in route:
                tmp_pose=PoseStamped()
                waypoint_x,waypoint_y=self.grid_cell_to_pose(grid_cell)
                # print(waypoint_x, waypoint_y, "/", end="")
                # waypoint_x,waypoint_y=grid_cell
                tmp_pose.pose.position.x=waypoint_x
                tmp_pose.pose.position.y=waypoint_y
                tmp_pose.pose.orientation.w=1.0
                self.global_path_msg.poses.append(tmp_pose)

            if len(route)!=0 :
                self.global_path_pub.publish(self.global_path_msg)
                self.result_msg.data = "CALCULATE_PATH_FINISHED"
                self.status_publisher.publish(self.result_msg)
                print('경로 전송 완료')


def main(args=None):
    rclpy.init(args=args)
    global_planner = Searching_path()
    rclpy.spin(global_planner)
    global_planner.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()