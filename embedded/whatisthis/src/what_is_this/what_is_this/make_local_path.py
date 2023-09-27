import rclpy
from rclpy.node import Node
from geometry_msgs.msg import PoseStamped
from sensor_msgs.msg import LaserScan
from nav_msgs.msg import Odometry, Path
from math import sqrt


class MakeLocalPath(Node):

    def __init__(self):
        super().__init__('local_path')
        self.local_path_pub = self.create_publisher(Path, 'local_path', 10)
        self.scan_sub = self.create_subscription(LaserScan, '/scan', self.scan_callback, 10)
        self.global_path_sub = self.create_subscription(Path, '/global_path', self.path_callback, 10)
        self.odometry_sub = self.create_subscription(Odometry, '/odom', self.listener_callback, 10)

        self.is_scan = False
        self.is_odom = False
        self.is_path = False
        self.local_path_size = 30
        self.prev_waypoint = 0
        self.odom_msg = Odometry()
        self.global_path_msg = Path()

        time_period = 0.05
        self.timer = self.create_timer(time_period, self.timer_callback)

    # odom msg
    def listener_callback(self, msg):
        self.is_odom = True
        self.odom_msg = msg.pose.pose  # Update odom_msg correctly

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
        if self.is_odom and self.is_path:
            local_path = Path()
            local_path.header.frame_id = '/map'

            current_waypoint = -1
            min_dis = float('inf')
            for i, waypoint in enumerate(self.global_path_msg.poses):
                if (self.prev_waypoint - 5 < i < self.prev_waypoint + 30):
                    distance = sqrt(pow(self.odom_msg.position.x - waypoint.pose.position.x, 2) +
                                    pow(self.odom_msg.position.y - waypoint.pose.position.y, 2))
                    if distance < min_dis:
                        min_dis = distance
                        current_waypoint = i

            if current_waypoint != -1:
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
