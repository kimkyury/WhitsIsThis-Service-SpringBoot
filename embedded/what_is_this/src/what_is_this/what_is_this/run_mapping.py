import rclpy
from rclpy.node import Node
import ros2pkg
from std_msgs.msg import String
from geometry_msgs.msg import Pose
from sensor_msgs.msg import LaserScan
from nav_msgs.msg import OccupancyGrid, MapMetaData
import os
import what_is_this.utils as utils
import numpy as np
import cv2
from collections import deque
from copy import deepcopy

params_map = {
    "MAP_RESOLUTION" : 0.05,
    "OCCUPANCY_UP" : 0.02,
    "OCCUPANCY_DOWN" : 0.01,
    "MAP_CENTER" : (-9.0, 10.0),
    "MAP_SIZE" : (17, 17),
    "MAP_FILENAME" : 'test.png',
    "MAPVIS_RESIZE_SCALE" : 2.0
}

#bresenham 
def createLineIterator(P1, P2, img):
    imageH = img.shape[0] #height
    imageW = img.shape[1] #width
    P1Y = P1[1] #시작점 y좌표
    P1X = P1[0] #시작점 x좌표
    P2Y = P2[1] #끝점 y좌표
    P2X = P2[0] #끝점 x좌표

    dy = P2Y - P1Y
    dx = P2X - P1X
    dya = np.abs(dy)
    dxa = np.abs(dx)

    itbuffer = np.empty(shape = (np.maximum(dya,dxa),3),dtype=np.float32)
    itbuffer.fill(np.nan)

    negY = P1Y > P2Y
    negX = P1X > P2X

    if(P1X == P2X) : 
        itbuffer[:,0] = P1X
        if negY : itbuffer[:,1] = np.arange(P1Y-1, P1Y-dya-1, -1)
        else : itbuffer[:,1] = np.arange(P1Y+1, P1Y+dya+1)
    elif P1Y == P2Y: #horizontal line segment
        itbuffer[:,1] = P1Y
        if negX:
            itbuffer[:,0] = np.arange(P1X-1,P1X-dxa-1,-1)
        else:
            itbuffer[:,0] = np.arange(P1X+1,P1X+dxa+1)
    else: #diagonal line segment
        steepSlope = dya > dxa
        if steepSlope:
            slope = dx.astype(np.float32)/dy.astype(np.float32)
            if negY:
                itbuffer[:,1] = np.arange(P1Y-1,P1Y-dya-1,-1)
            else:
                itbuffer[:,1] = np.arange(P1Y+1,P1Y+dya+1)
            itbuffer[:,0] = (slope*(itbuffer[:,1]-P1Y)).astype(np.int) + P1X
        else:
            slope = dy.astype(np.float32)/dx.astype(np.float32)
            if negX:
                itbuffer[:,0] = np.arange(P1X-1,P1X-dxa-1,-1)
            else:
                itbuffer[:,0] = np.arange(P1X+1,P1X+dxa+1)
            itbuffer[:,1] = (slope*(itbuffer[:,0]-P1X)).astype(np.int) + P1Y    

    colX = itbuffer[:,0]
    colY = itbuffer[:,1]
    itbuffer = itbuffer[(colX >= 0) & (colY >=0) & (colX<imageW) & (colY<imageH)]

    #Get intensities from img ndarray
    itbuffer[:,2] = img[itbuffer[:,1].astype(np.uint),itbuffer[:,0].astype(np.uint)]

    return itbuffer

class Mapping : 
    def __init__(self, params_map) :
        self.map_resolution = params_map["MAP_RESOLUTION"]
        self.map_size = np.array(params_map["MAP_SIZE"]) / self.map_resolution
        self.map_center = params_map["MAP_CENTER"]
        self.map = np.ones((self.map_size[0].astype(np.int), self.map_size[1].astype(np.int)))*0.5
        self.occu_up = params_map["OCCUPANCY_UP"]
        self.occu_down = params_map["OCCUPANCY_DOWN"]

        self.map_filename = params_map["MAP_FILENAME"]
        self.map_vis_resize_scale = params_map["MAPVIS_RESIZE_SCALE"]
        
        self.T_r_l = np.array([[0,-1,0],[1,0,0],[0,0,1]])

    def update(self, pose, laser):
        n_points = laser.shape[1]
        pose_mat = utils.xyh2mat2D(pose)
        
        pose_mat = np.matmul(pose_mat,self.T_r_l)
        laser_mat = np.ones((3, n_points))
        laser_mat[:2, :] = laser

        laser_global = np.matmul(pose_mat, laser_mat)

        pose_x = (pose[0] - self.map_center[0] + (self.map_size[0]*self.map_resolution)/2) / self.map_resolution
        pose_y = (pose[1] - self.map_center[1] + (self.map_size[1]*self.map_resolution)/2) / self.map_resolution
        laser_global_x = (laser_global[0, :] - self.map_center[0] + (self.map_size[0]*self.map_resolution)/2) / self.map_resolution
        laser_global_y =  (laser_global[1, :] - self.map_center[1] + (self.map_size[1]*self.map_resolution)/2) / self.map_resolution

        for i in range(laser_global.shape[1]):
            p1 = np.array([pose_x, pose_y]).reshape(-1).astype(np.int)
            p2 = np.array([laser_global_x[i], laser_global_y[i]]).astype(np.int)
            # print(p1)
            line_iter = createLineIterator(p1, p2, self.map)
        
            if (line_iter.shape[0] is 0):
                continue
        
            avail_x = line_iter[:, 0].astype(np.int)
            avail_y = line_iter[:, 1].astype(np.int)
        
            self.map[avail_y[:-1], avail_x[:-1]] = self.map[avail_y[:-1], avail_x[:-1]] + self.occu_down
        
            self.map[avail_y[-1], avail_x[-1]] = self.map[avail_y[-1], avail_x[-1]] - self.occu_up

    def __del__(self):
        self.save_map()


    def save_map(self):
        map_clone = self.map.copy()
        cv2.imwrite(self.map_filename, map_clone*255)


    def show_pose_and_points(self, pose, laser_global):
        tmp_map = self.map.astype(np.float32)
        map_bgr = cv2.cvtColor(tmp_map, cv2.COLOR_GRAY2BGR)

        pose_x = (pose[0] - self.map_center[0] + (self.map_size[0]*self.map_resolution)/2) / self.map_resolution
        pose_y = (pose[1] - self.map_center[1] + (self.map_size[1]*self.map_resolution)/2) / self.map_resolution

        laser_global_x = (laser_global[0, :] - self.map_center[0] + (self.map_size[0]*self.map_resolution)/2) / self.map_resolution
        laser_global_y =  (laser_global[1, :] - self.map_center[1] + (self.map_size[1]*self.map_resolution)/2) / self.map_resolution

        for i in range(laser_global.shape[1]):
            (l_x, l_y) = np.array([laser_global_x[i], laser_global_y[i]]).astype(np.int)
            center = (l_x, l_y)
            cv2.circle(map_bgr, center, 1, (0,255,0), -1)

        center = (pose_x.astype(np.int32)[0], pose_y.astype(np.int32)[0])
        
        cv2.circle(map_bgr, center, 2, (0,0,255), -1)

        map_bgr = cv2.resize(map_bgr, dsize=(0, 0), fx=self.map_vis_resize_scale, fy=self.map_vis_resize_scale)

    
class Mapper(Node):
    def __init__(self):
        super().__init__('Mapper')        
        self.subscription = self.create_subscription(LaserScan, '/scan',self.scan_callback,10)
        self.map_pub = self.create_publisher(OccupancyGrid, '/map', 1)
        # status 확인
        self.status_publisher = self.create_publisher(String, 'result', 1)
        self.status_subscriber = self.create_subscription(String, 'progress', self.check_bot_status, 10)
        self.status = None
        
        self.map_msg=OccupancyGrid()
        self.map_msg.header.frame_id="map"
        self.map_size=int(params_map["MAP_SIZE"][0]\
            /params_map["MAP_RESOLUTION"]*params_map["MAP_SIZE"][1]/params_map["MAP_RESOLUTION"])
        
        m = MapMetaData()
        m.resolution = params_map["MAP_RESOLUTION"]
        m.width = int(params_map["MAP_SIZE"][0]/params_map["MAP_RESOLUTION"])
        m.height = int(params_map["MAP_SIZE"][1]/params_map["MAP_RESOLUTION"])
        quat = np.array([0, 0, 0, 1])
        m.origin = Pose()
        m.origin.position.x = params_map["MAP_CENTER"][0]
        m.origin.position.y = params_map["MAP_CENTER"][1]
        self.map_meta_data = m
        self.map_msg.info=self.map_meta_data
        self.mapping = Mapping(params_map)
        self.save_data = None

    def check_bot_status(self,msg):
        self.status = msg.data
        if self.status == "SKIP_MAPPING":
            pkg_path =os.getcwd()
            back_folder='src\what_is_this'
            folder_name='map'
            file_name='map.txt'
            full_path=os.path.join(pkg_path,back_folder,folder_name,file_name)

            with open(full_path, 'r') as file:
                lines = file.readline().strip(' ')
                line_data = np.array(list(map(float,lines.split(' '))))
                map_data = line_data.reshape((340,340))
                np.rot90(map_data, k=1)
                np.flipud(map_data)
                self.mapping.map = map_data
            
            print("\r맵 불러오기 완료")

    def scan_callback(self,msg):   
        pose_x=msg.range_min
        pose_y=msg.scan_time
        heading=msg.time_increment+180
        Distance=np.array(msg.ranges)
        x = Distance * np.cos(np.linspace(0, 2 * np.pi, 360))
        y = Distance * np.sin(np.linspace(0, 2 * np.pi, 360))
        laser = np.vstack((x.reshape((1, -1)), y.reshape((1, -1))))

        pose = np.array([[pose_x],[pose_y],[heading]])
        self.mapping.update(pose, laser)

        np_map_data=self.mapping.map.reshape(1,self.map_size) 
        list_map_data=np_map_data.tolist()
        self.save_data = deepcopy(list_map_data[0])
        for i in range(self.map_size):
            list_map_data[0][i]=100-int(list_map_data[0][i]*100)
            if list_map_data[0][i] >100 :
                list_map_data[0][i]=100
            if list_map_data[0][i] <0 :
                list_map_data[0][i]=0
                
        self.map_msg.header.stamp =rclpy.clock.Clock().now().to_msg()
        self.map_msg.data=list_map_data[0]
        self.map_pub.publish(self.map_msg)

def save_map(node,file_path):
    pkg_path =os.getcwd()
    back_folder='what_is_this'
    folder_name='map'
    file_name=file_path
    full_path=os.path.join(pkg_path,back_folder,folder_name,file_name)
    print(full_path)
    f=open(full_path,'w')
    data=''
    for pixel in node.save_data:
        data += '{:.3f} '.format(pixel)
    f.write(data) 
    f.close()

def main(args=None):    
    rclpy.init(args=args)
    
    try :    
        run_mapping = Mapper()
        rclpy.spin(run_mapping)
        run_mapping.destroy_node()
        rclpy.shutdown()

    except :
        save_map(run_mapping,'map.txt')

if __name__ == '__main__':
    main()
