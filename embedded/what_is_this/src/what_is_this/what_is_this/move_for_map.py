import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist, Pose, PoseStamped
from ssafy_msgs.msg import TurtlebotStatus
from sensor_msgs.msg import Imu,LaserScan
from std_msgs.msg import String
from squaternion import Quaternion
from nav_msgs.msg import Odometry, OccupancyGrid, MapMetaData, Path
from math import pi, cos, sin
import numpy as np
import math
from queue import PriorityQueue

class MoveForMap(Node) : 
    def __init__(self):
        super().__init__('move_for_map')
        self.scan_sub = self.create_subscription(LaserScan, '/scan', self.scan_callback, 1)
        self.status_sub = self.create_subscription(TurtlebotStatus,'/turtlebot_status',self.status_callback,1)
        self.cmd_vel_pub = self.create_publisher(Twist,'cmd_vel', 20)
        
        # 메인과 상태 pub, sub
        self.status_publisher = self.create_publisher(String, 'result', 1)
        self.status_subscriber = self.create_subscription(String, 'progress', self.check_bot_status, 1)
        self.status = None
        self.result_msg = String()
        
        time_period=0.05 
        self.timer = self.create_timer(time_period, self.timer_callback)

        self.wall_distance = 0.3 # 벽과의 거리 (미터)
        self.linear_speed = 0.0  # 로봇의 직진 속도 (m/s)
        self.angular_speed = 0.0  # 로봇의 회전 속도 (rad/s)
        self.wall_detected = False
        self.start = False
        self.has_completed_one_rotation = False
        self.initial_pose = None
        self.current_pose = None
        self.time = 0
    
    # 진행에 따라 status 변경
    def check_bot_status(self,msg):
        self.status = msg.data

    def scan_callback(self, msg):
        self.current_pose = [msg.range_min, msg.scan_time]
        range_data = msg.ranges
        min_data = 100.0
        min_theta = 360
        for i in range(181, 359):
            if(0 < range_data[i] < min_data) : 
                min_data = range_data[i]
                min_theta = i 
        if self.start == False : 
            if(85 < msg.time_increment < 95) : 
                self.angular_speed = 0.0
                self.linear_speed = 0.1 * range_data[180]
                if self.linear_speed >= 1.0 : 
                    self.linear_speed = 1.0
                if(range_data[180] <= self.wall_distance) and self.initial_pose is None : 
                    self.start = True
                    self.initial_pose = self.current_pose
                    print(range_data[180] , self.initial_pose)
            elif (95 <= msg.time_increment <= 180) : 
                self.angular_speed = 0.2
                self.linear_speed = 0.0
            else : 
                self.angular_speed = -0.2
                self.linear_speed = 0.0
        else : 
            if abs(min_theta-270) > 3: 
                self.angular_speed = 0.03 * (270-min_theta)
                self.linear_speed = 0.1 
            else : 
                if(min_data < self.wall_distance + 0.05) : 
                    self.angular_speed = 0.1
                elif (min_data > self.wall_distance - 0.05): 
                    self.angular_speed = -0.1
                else : 
                    self.angular_speed = 0.0
                    self.linear_speed = 0.3

    def status_callback(self,msg):
        self.is_status=True
        self.status_msg=msg
        
    def timer_callback(self):
        if self.has_completed_one_rotation and self.status == "MAPPING":
            twist_msg = Twist()
            twist_msg.linear.x = 0.0
            twist_msg.angular.z = 0.0
            if self.status == "MAPPING":
                self.cmd_vel_pub.publish(twist_msg)
                self.result_msg.data = "END_MAPPING"
                self.status_publisher.publish(self.result_msg)
        
        elif self.status == "WAIT_MAPPING" or self.status == "MAPPING":
            if self.status == "WAIT_MAPPING":
                self.result_msg.data = "MAPPING"
                self.status_publisher.publish(self.result_msg)
            twist_msg = Twist()
            twist_msg.linear.x = self.linear_speed
            twist_msg.angular.z = self.angular_speed
            self.cmd_vel_pub.publish(twist_msg)
        
            if self.initial_pose is not None:
                self.time +=1
                initial_x = self.initial_pose[0]
                initial_y = self.initial_pose[1]
                current_x = self.current_pose[0]
                current_y = self.current_pose[1]
                
                if self.start == True:      
                    if(abs(initial_x-current_x) < 0.5 and abs(initial_y-current_y) < 0.2):
                        if self.time > 1000 : 
                            self.has_completed_one_rotation = True
                            self.result_msg.data = "END_MAPPING"
                            self.status_publisher.publish(self.result_msg)
                            print("success")
            
        
def main(args=None):
    rclpy.init(args=args)
    move = MoveForMap()
    rclpy.spin(move)
    move.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()                                                                          