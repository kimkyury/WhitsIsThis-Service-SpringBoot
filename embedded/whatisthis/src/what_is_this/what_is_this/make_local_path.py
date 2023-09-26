import rclpy
from rclpy.node import Node
from geometry_msgs.msg import PoseStamped
from sensor_msgs.msg import Imu,LaserScan
from nav_msgs.msg import Odometry,Path
from math import pi,cos,sin,sqrt
from queue import PriorityQueue


class MakeLocalPath(Node):

    def __init__(self):
        super().__init__('local_path')
        self.local_path_pub = self.create_publisher(Path, 'local_path', 10)
        self.scan_sub = self.create_subscription(LaserScan, 'scan', self.scan_callback, 10)
        self.global_path_sub = self.create_subscription(Path,'/global_path',self.path_callback,10)
        self.odometry_sub = self.create_subscription(Odometry,'/odom',self.listener_callback,10)

        self.is_scan=False
        self.is_odom=False
        self.is_path=False       
        self.local_path_size=30 

        self.odom_msg=Odometry()
        self.global_path_msg=Path()
        
        time_period=0.05 
        self.timer = self.create_timer(time_period, self.timer_callback)

    #odom msg
    def listener_callback(self,msg):
        self.is_odom=True
        self.odom=msg.pose.position

    #global path msg
    def path_callback(self,msg):
        self.is_path = True
        self.global_path = msg
    
    #ridar scan msg
    def scan_callback(self,msg):
        self.is_scan = True
        self.ridar_scan = msg

    #local path make
    def timer_callback(self):
        if self.is_odom and self.is_path == True:
            local_path = Path()
            local_path.header.frame_id = '/map'
            
            current_waypoint = -1
            min_dis = float('inf')
            
            for i,waypoint in enumerate(self.global_path_msg.poses): 
                distance = sqrt(pow(self.odom.x-waypoint.pose.position.x,2) + pow(self.odom.x-waypoint.pose.position.y,2))
                if distance < min_dis:
                    min_dis = distance
                    current_waypoint = i
            
            for i in range(current_waypoint, current_waypoint + self.local_path_size):  # 예: 가장 가까운 포인트부터 10개 포인트를 선택
                if i < len(self.global_path.poses):
                    local_path.poses.append(self.global_path.poses[i])

            
            self.local_path_pub.publish(local_path)

    

def main(args=None):
    rclpy.init(args=args)
    local_path = MakeLocalPath()
    rclpy.spin(local_path)
    local_path.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()