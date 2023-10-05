import rclpy
from rclpy.node import Node

from geometry_msgs.msg import Twist,Point
from ssafy_msgs.msg import TurtlebotStatus
from squaternion import Quaternion
from nav_msgs.msg import Odometry,Path
from std_msgs.msg import String
from math import pi,cos,sin,sqrt,atan2,exp
import numpy as np

# path_tracking 노드는 로봇의 위치(/odom), 로봇의 속도(/turtlebot_status), 주행 경로(/local_path)를 받아서, 주어진 경로를 따라가게 하는 제어 입력값(/cmd_vel)을 계산합니다.
# 제어입력값은 선속도와 각속도로 두가지를 구합니다. 


# 노드 로직 순서
# 1. 제어 주기 및 타이머 설정
# 2. 파라미터 설정
# 3. Quaternion 을 euler angle 로 변환
# 4. 터틀봇이 주어진 경로점과 떨어진 거리(lateral_error)와 터틀봇의 선속도를 이용해 전방주시거리 계산
# 5. 전방 주시 포인트 설정
# 6. 전방 주시 포인트와 로봇 헤딩과의 각도 계산
# 7. 선속도, 각속도 정하기


class followTheCarrot(Node):

    def __init__(self):
        super().__init__('path_tracking')
        self.cmd_pub = self.create_publisher(Twist, 'cmd_vel', 20)
        self.subscription = self.create_subscription(Odometry,'/odom',self.odom_callback,10)
        self.status_sub = self.create_subscription(TurtlebotStatus,'/turtlebot_status',self.status_callback,1)
        self.main_status_sub =  self.create_subscription(String, 'progress', self.check_status, 1)
        self.path_sub = self.create_subscription(Path,'/local_path',self.path_callback,10)
        self.status_publisher = self.create_publisher(String, 'result', 1)

        # 로직 1. 제어 주기 및 타이머 설정
        time_period=0.05 
        self.timer = self.create_timer(time_period, self.timer_callback)

        self.is_odom=False
        self.is_path=False
        self.is_status=False
        self.status=False
        self.main_status = ""

        self.result_msg=String()
        self.odom_msg=Odometry()            
        self.robot_yaw=0.0
        self.path_msg=Path()
        self.cmd_msg=Twist()

        # 로직 2. 파라미터 설정
        self.lfd=0.1
        self.min_lfd=0.1
        self.max_lfd=1.0

    def check_status(self,msg):
        self.main_status = msg.data
        if self.main_status == "WAIT_FINDING":
            self.status = True
            self.result_msg.data = "FINDING"
            self.status_publisher.publish(self.result_msg)
            
    def timer_callback(self):

        if self.is_status and self.is_odom ==True and self.is_path==True:
            if self.status and len(self.path_msg.poses)> 1 and self.main_status == "FINDING":
                self.is_look_forward_point= False
                
                # 로봇의 현재 위치를 나타내는 변수
                robot_pose_x=self.odom_msg.pose.pose.position.x
                robot_pose_y=self.odom_msg.pose.pose.position.y

                # 로봇이 경로에서 떨어진 거리를 나타내는 변수
                lateral_error= sqrt(pow(self.path_msg.poses[0].pose.position.x-robot_pose_x,2)+pow(self.path_msg.poses[0].pose.position.y-robot_pose_y,2))

                self.lfd= (self.status_msg.twist.linear.x+lateral_error)*0.5

                if self.lfd < self.min_lfd :
                    self.lfd=self.min_lfd
                if self.lfd > self.max_lfd:
                    self.lfd=self.max_lfd

                min_dis=float('inf')

                for num, waypoint in enumerate(self.path_msg.poses):
                    self.current_point = waypoint.pose.position
                    dis = sqrt(pow(self.current_point.x - self.path_msg.poses[0].pose.position.x, 2) + pow(self.current_point.y - self.path_msg.poses[0].pose.position.y, 2))
                    if abs(dis - self.lfd) < min_dis:
                        min_dis = abs(dis - self.lfd)
                        self.forward_point = self.current_point
                        self.is_look_forward_point = True

                if self.is_look_forward_point :
            
                    global_forward_point=[self.forward_point.x ,self.forward_point.y,1]

                    trans_matrix = np.array([
                        [cos(self.robot_yaw), -sin(self.robot_yaw), robot_pose_x],
                        [sin(self.robot_yaw), cos(self.robot_yaw), robot_pose_y],
                        [0, 0, 1]
                    ])

                    det_trans_matrix = np.linalg.inv(trans_matrix)
                    local_forward_point = det_trans_matrix.dot(global_forward_point)
                    theta = -atan2(local_forward_point[1], local_forward_point[0])

                    out_vel = 1*exp((-1)*(abs(theta))/(2*sqrt(2))) * 0.5
                    out_rad_vel =theta

                    self.cmd_msg.linear.x=out_vel
                    self.cmd_msg.angular.z=out_rad_vel
                    self.cmd_pub.publish(self.cmd_msg)
           
            else :
                if self.main_status == "FINISH" or self.main_status == "WORK_STOP":
                    # print("no found forward point, traking finished")
                    self.cmd_msg.linear.x=0.0
                    self.cmd_msg.angular.z=0.0
                    self.status = False
                    # self.result_msg.data = "END_FINDING"
                    # self.status_publisher.publish(self.result_msg)
                    self.cmd_pub.publish(self.cmd_msg)     

    def odom_callback(self, msg):
        self.is_odom=True
        self.odom_msg=msg
        q=self.odom_msg.pose.pose.orientation
        q=Quaternion(q.w, q.x, q.y, q.z)
        self.robot_roll,self.robot_pitch,self.robot_yaw=q.to_euler()

    def path_callback(self, msg):
        self.is_path=True
        self.path_msg=msg


    def status_callback(self,msg):
        self.is_status=True
        self.status_msg=msg

        
def main(args=None):
    rclpy.init(args=args)

    path_tracker = followTheCarrot()

    rclpy.spin(path_tracker)


    path_tracker.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()