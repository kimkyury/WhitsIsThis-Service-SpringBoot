import rclpy
from rclpy.node import Node
import ros2pkg
from geometry_msgs.msg import PoseStamped, PoseArray
from sensor_msgs.msg import LaserScan,CompressedImage
from nav_msgs.msg import Odometry, Path
from std_msgs.msg import String
from math import sqrt,cos,sin
import os
import numpy as np
import cv2

class MakeLocalPath(Node):
    def __init__(self):
        super().__init__('local_path')
        self.local_path_pub = self.create_publisher(Path, '/local_path', 10)
        self.obstacle_pos_pub = self.create_publisher(PoseStamped, '/obstacle', 10)
        self.obstacle_img_pub = self.create_publisher(CompressedImage, '/ob/compressed', 10)
        self.status_publisher = self.create_publisher(String, 'result', 1)
        self.percent_publisher = self.create_publisher(String, 'percent', 1)
        self.scan_sub = self.create_subscription(LaserScan, '/scan', self.scan_callback, 10)
        self.global_path_sub = self.create_subscription(Path, 'global_path', self.path_callback, 10)
        self.img_sub = self.create_subscription(CompressedImage,'/image_jpeg/compressed',self.img_callback,10)
        self.img_sub2 = self.create_subscription(CompressedImage,'/obstacle/compressed',self.img2_callback,10)

        self.percent = 0
        self.img_bgr = None  
        self.img_bgr2 = None       
        self.obstacle_img = None
        self.is_scan = False
        self.is_odom = False
        self.is_path = False
        self.pose_array_msg = PoseArray()
        self.pose_array_msg.header.frame_id = "/obstacle"
        self.pose_array_msg.header.stamp = self.get_clock().now().to_msg()

        self.local_path_size = 30
        self.prev_waypoint = 0
        self.percnet_msg = String()
        self.result_msg = String()
        self.odom_msg = Odometry()
        self.global_path_msg = Path()
        self.map_center = [-9,10]
        self.map_size = [17,17]
        self.map_resolution = 0.05
        time_period = 0.05
        self.timer = self.create_timer(time_period, self.timer_callback)
        self.percent_timer = self.create_timer(1, self.percent_callback)

    #img msg
    def img_callback(self, msg):
        np_arr = np.frombuffer(msg.data, np.uint8)
        self.img_bgr = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        cv2.imshow('img0',self.img_bgr)
        cv2.waitKey(1)

    def img2_callback(self, msg):
        self.obstacle_img = msg
        np_arr2 = np.frombuffer(msg.data, np.uint8)
        self.img_bgr2 = cv2.imdecode(np_arr2, cv2.IMREAD_COLOR)
        cv2.imshow('img1',self.img_bgr2)
        cv2.waitKey(1)

    # global path msg
    def path_callback(self, msg):
        self.is_path = True
        self.global_path_msg = msg

    # radar scan msg
    def scan_callback(self, msg):
        self.is_scan = True
        self.radar_scan = msg

    def percent_callback(self):
        if self.percent != 0:
            self.percnet_msg.data = str(self.percent)
            self.percent_publisher.publish(self.percnet_msg)

    # local path make
    def timer_callback(self):
        #if self.is_path and self.img_bgr is not None:
        if self.is_scan == False:
            print("radar error")
        elif self.img_bgr is None:
            print("img error")

        else :
            theta = self.radar_scan.time_increment
            if -90 <= theta <= 180 : 
                theta += 90
            else :
                theta += 450
            bounding_boxes = self.find_bbox()
            check_x = self.img_bgr.shape[1] // 2
            check_y = self.img_bgr.shape[0] // 4 + self.img_bgr.shape[0] // 2

            for x, y, w, h in bounding_boxes:
                # 바운딩 박스의 중심을 계산
                box_x1 = x
                box_x2 = x + w
                box_y1 = y
                box_y2 = y + h
                obstacle_pose = PoseStamped()
                obstacle_img = None
                if check_y <= box_y2 and (box_x1 < check_x + 180 or box_x2 > check_x - 180):            
                    obstacle = [ 0.3 * cos(theta) + self.radar_scan.range_min,0.3 * sin(theta) + self.radar_scan.scan_time]
                    obstacle = self.pose_to_grid_cell(obstacle)
                    flag = True
                    for pose in self.pose_array_msg.poses :
                        dis_to_obstacle = sqrt(pow(pose.pose.position.x - obstacle[0], 2) +
                                               pow(pose.pose.position.y - obstacle[1], 2))
                        if dis_to_obstacle < 20 :
                            flag = False 
                            break
                            # Set orientation and other fields if needed
                    if flag : 
                        obstacle_pose.pose.position.x = obstacle[0]
                        obstacle_pose.pose.position.y = obstacle[1]
                        self.pose_array_msg.poses.append(obstacle_pose)
                        self.obstacle_pos_pub.publish(obstacle_pose)
                        self.obstacle_img_pub.publish(self.obstacle_img)

            current_pose = [self.radar_scan.range_min,self.radar_scan.scan_time]
            current_pose = self.pose_to_grid_cell(current_pose)
            local_path = Path()
            local_path.header.frame_id = '/map'

            current_waypoint = -1
            min_dis = float('inf')
            for i, waypoint in enumerate(self.global_path_msg.poses):
                if (self.prev_waypoint<= i < self.prev_waypoint + 30):
                    distance = sqrt(pow(self.radar_scan.range_min - waypoint.pose.position.x, 2) +
                                    pow(self.radar_scan.scan_time - waypoint.pose.position.y, 2))
                    if distance < min_dis:
                        min_dis = distance
                        current_waypoint = i
            
            if current_waypoint != -1:
                self.percent = round(current_waypoint/len(self.global_path_msg.poses)*100,2)
                print("{0:<20} >>".format(f"\r진행률 : {self.percent}"),end="")
                if self.percent > 99.96:
                    self.percent = "100"
                    self.percnet_msg.data = str(self.percent)
                    self.percent_publisher.publish(self.percnet_msg) 
                    self.result_msg.data = "END_FINDING"
                    self.status_publisher.publish(self.result_msg)

                if current_waypoint + self.local_path_size < len(self.global_path_msg.poses):
                    for num in range(current_waypoint, current_waypoint + self.local_path_size):
                        tmp_pose = PoseStamped()
                        tmp_pose.pose.position.x = self.global_path_msg.poses[num].pose.position.x
                        tmp_pose.pose.position.y = self.global_path_msg.poses[num].pose.position.y
                        tmp_pose.pose.orientation.w = 1.0
                        local_path.poses.append(tmp_pose)
                else:
                    for num in range(current_waypoint, len(self.global_path_msg.poses)):
                        tmp_pose = PoseStamped()
                        tmp_pose.pose.position.x = self.global_path_msg.poses[num].pose.position.x
                        tmp_pose.pose.position.y = self.global_path_msg.poses[num].pose.position.y
                        tmp_pose.pose.orientation.w = 1.0
                        local_path.poses.append(tmp_pose)

            self.local_path_pub.publish(local_path)
            self.prev_waypoint = current_waypoint
            

    def find_bbox(self):
        lower = np.array([0, 0, 0]) # obstacle
        upper = np.array([10, 10, 10])
        
        self.imge = cv2.inRange(self.img_bgr, lower, upper)
        
        contours, _ = cv2.findContours(self.imge, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
        
        bounding_boxes = self.find_cnt(contours)
        return bounding_boxes

    def find_cnt(self, contours):
        bounding_boxes = []
        for cnt in contours: # countours : 그림 그릴 컨투어 배열
            x,y,w,h = cv2.boundingRect(cnt) #  cv2.boundingRect : 인자로 받은 contour에 외접하고 똑바로 세워진 직사각형의 좌상단 꼭지점 좌표 (x,y)와 가로 세로 폭을 리턴
            cv2.rectangle(self.img_bgr,(x,y),(x+w,y+h),(0, 255, 0),2) # (0, 255, 0) : 초록색
            bounding_boxes.append((x, y, w, h))
        return bounding_boxes
    
    
    def pose_to_grid_cell(self,pose):
        pose_x = (pose[0] +9 + (self.map_size[0]*self.map_resolution)/2) / self.map_resolution
        pose_y = (pose[1] -2 + (self.map_size[1]*self.map_resolution)/2) / self.map_resolution
        return [pose_x,pose_y]

    # def grid_cell_to_pose(self,grid_cell):
    #     x = grid_cell[0] * self.map_resolution + self.map_center[0] - (self.map_size[0] * self.map_resolution) / 2
    #     y = grid_cell[1] * self.map_resolution + self.map_center[1] - (self.map_size[1] * self.map_resolution) / 2
    #     print("current pose : ", x, y)
    #     return [x,y]
    

def main(args=None):
    rclpy.init(args=args)
    local_path = MakeLocalPath()
    rclpy.spin(local_path)
    local_path.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
