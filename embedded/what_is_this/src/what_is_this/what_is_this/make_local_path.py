import rclpy
from rclpy.node import Node
from geometry_msgs.msg import PoseStamped
from sensor_msgs.msg import LaserScan,CompressedImage
from nav_msgs.msg import Odometry, Path
from std_msgs.msg import String
from math import sqrt
import numpy as np
import cv2

class IMGParser(Node):
    def __init__(self):
        super().__init__(node_name='image_parser')
        self.subscription = self.create_subscription(CompressedImage,'/image_jpeg/compressed',self.img_callback,10)
        self.img_bgr = None
        self.timer_period = 0.05
        self.timer = self.create_timer(self.timer_period, self.timer_callback)
        self.status_publisher = self.create_publisher(String, 'result', 1)
        

    def img_callback(self, msg):
        np_arr = np.frombuffer(msg.data, np.uint8)
        self.img_bgr = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    def find_bbox(self):
        lower = np.array([17, 250, 241]) # wallet
        upper = np.array([22, 260, 251])
        
        self.imge = cv2.inRange(self.img_bgr, lower, upper)
        
        contours, _ = cv2.findContours(self.imge, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
        
        self.find_cnt(contours)

    def find_cnt(self, contours):
        print(contours)
        for cnt in contours: # countours : 그림 그릴 컨투어 배열
            x,y,w,h = cv2.boundingRect(cnt) #  cv2.boundingRect : 인자로 받은 contour에 외접하고 똑바로 세워진 직사각형의 좌상단 꼭지점 좌표 (x,y)와 가로 세로 폭을 리턴
            cv2.rectangle(self.img_bgr,(x,y),(x+w,y+h),(201,174,255),2) # (0, 255, 0) : 초록색

    def timer_callback(self):
        if self.img_bgr is not None:
            self.find_bbox()
            cv2.imshow("seg_results", self.img_bgr)
            cv2.waitKey(1)
        else:
            pass

class MakeLocalPath(Node):
    def __init__(self):
        super().__init__('local_path')
        self.local_path_pub = self.create_publisher(Path, '/local_path', 10)
        self.status_publisher = self.create_publisher(String, 'result', 1)
        self.percent_publisher = self.create_publisher(String, 'percent', 1)
        self.scan_sub = self.create_subscription(LaserScan, '/scan', self.scan_callback, 10)
        self.global_path_sub = self.create_subscription(Path, '/global_path', self.path_callback, 10)

        self.percent = -1
        self.is_scan = False
        self.is_odom = False
        self.is_path = False
        self.local_path_size = 30
        self.prev_waypoint = 0

        self.percnet_msg = String()
        self.result_msg = String()
        self.odom_msg = Odometry()
        self.global_path_msg = Path()

        time_period = 0.05
        self.timer = self.create_timer(time_period, self.timer_callback)

    # global path msg
    def path_callback(self, msg):
        self.is_path = True
        self.global_path_msg = msg

    # radar scan msg
    def scan_callback(self, msg):
        self.is_scan = True
        self.radar_scan = msg

    # local path make
    def timer_callback(self):
        if self.is_path:
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
                self.percnet_msg.data = str(self.percent)
                self.percent_publisher.publish(self.percnet_msg)                

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


def main(args=None):
    rclpy.init(args=args)
    local_path = MakeLocalPath()
    rclpy.spin(local_path)
    local_path.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
