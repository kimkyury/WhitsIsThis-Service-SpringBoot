import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from nav_msgs.msg import Odometry,OccupancyGrid,Path
from geometry_msgs.msg import Pose,PoseStamped

from sys import maxsize as INF
import numpy as np
from heapq import heappush, heappop
from collections import deque

DELTA = ((-1, 0), (1, 0), (0, -1), (0, 1))
DELTA_D = ((0, 1, 1), (1, 1, 1.414), (1, 0, 1), (1, -1, 1.414), (0, -1, 1), (-1, -1, 1.414), (-1, 0, 1), (-1, 1, 1.414))
MAP_LENGTH = 340

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
            if Map[nx][ny] > 85:continue
            if Map[nx][ny] == 0:continue
            visit[nx][ny] = 1
            Map[nx][ny] = 60
            q.append((nx,ny))
    return Map

def dijkstra(x: int, y: int, Map: list, points: dict) -> tuple:
    visit = [[[INF, 0] for _ in range(MAP_LENGTH)] for _ in range(MAP_LENGTH)]
    visit[x][y] = [0, 0]
    h = [(0, x, y)]

    while h:
        cost, cur_x, cur_y = heappop(h)

        if points.get((cur_x, cur_y),0):break
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
                
    history = []
    cur = (cur_x, cur_y)
    while visit[cur[0]][cur[1]][1]:
        history.append(cur)
        cur = visit[cur[0]][cur[1]][1]
    history.reverse()

    return history

def make_path(start_x: int, start_y: int, Path_points: dict, Map: np) -> None:
    path = []
    cur_x, cur_y = start_x, start_y

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

        min_path = dijkstra(cur_x, cur_y, Map, Path_points)
        path.extend(min_path)

        cur_x, cur_y = path[-1]
    
    return path

class Searching_path(Node):

    def __init__(self):
        super().__init__('searching_path')
        self.map_sub = self.create_subscription(OccupancyGrid, 'map', self.map_callback, 1)
        self.odom_sub = self.create_subscription(Odometry, 'odom', self.odom_callback, 1)
        self.status_sub =  self.create_subscription(String, 'progress', self.check_status, 10)
        self.global_path_pub = self.create_publisher(Path, 'global_path', 1)
        
        self.map_msg = OccupancyGrid()
        self.odom_msg = Odometry()

        self.is_map=False
        self.is_odom=False
        self.status=None
        self.map_data=None
        self.pre_map=None

        self.map_size_x=MAP_LENGTH
        self.map_size_y=MAP_LENGTH
        
        self.map_resolution=0.05 
        self.map_offset_x=-2.8
        self.map_offset_y=4

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
        self.map_msg=map_data
        if not self.is_map:
            self.map_data=map_data

    def check_status(self,msg):
        self.status = msg.data
        if self.status == '':
            self.path_pub()
    
    def grid_cell_to_pose(self,grid_cell):
            x = (grid_cell[0] * self.map_resolution) + self.map_offset_x
            y = (grid_cell[1] * self.map_resolution) + self.map_offset_y
            return [x,y]

    def path_pub(self):
        Path_points=dict()
        self.pre_map = self.map_data
        
        for x in range(340):
            for y in range(340):
                if self.pre_map[x][y] == 100:
                    for i in range(-4,5):
                        for j in range(-4,5):
                            if 0 <= x+i < 340 and 0 <= y+j < 340:
                                if self.pre_map[x+i][y+j] != 100:
                                    self.pre_map[x+i][y+j] = 127

        for x in range(0,340,15):
            min_y, max_y = INF, 0
            y = 0
            while y < 340:
                while self.pre_map[x][y] < 50:
                    min_y = y if y < min_y else min_y
                    max_y = y if y > max_y else max_y
                    y+=1
                
                if x != INF and min_y != INF and x != 0 and max_y != 0:
                    Path_points[(x, min_y)] = max_y
                    Path_points[(x, max_y)] = min_y
                    min_y, max_y = INF, 0
                y+=1
        
        (start_point_x, start_point_y), _ = sorted(list(Path_points.items()))[0]
        route = make_path(start_point_x, start_point_y, Path_points, self.pre_map)

        if len(route)!=0:
            self.global_path_msg=Path()
            self.global_path_msg.header.frame_id='map'
            for grid_cell in route:
                tmp_pose=PoseStamped()
                waypoint_x,waypoint_y=self.grid_cell_to_pose(grid_cell)
                tmp_pose.pose.position.x=waypoint_x
                tmp_pose.pose.position.y=waypoint_y
                tmp_pose.pose.orientation.w=1.0
                self.global_path_msg.poses.append(tmp_pose)
        
            if len(self.final_path)!=0 :
                self.global_path_pub.publish(self.global_path_msg)

def main(args=None):
    rclpy.init(args=args)
    global_planner = Searching_path()
    rclpy.spin(global_planner)
    global_planner.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()