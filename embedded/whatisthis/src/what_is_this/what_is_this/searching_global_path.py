import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from nav_msgs.msg import Odometry,OccupancyGrid,Path

class Searching_path(Node):

    def __init__(self):
        super().__init__('searching_path')
        self.map_sub = self.create_subscription(OccupancyGrid, 'map', self.map_callback, 1)
        self.odom_sub = self.create_subscription(Odometry, 'odom', self.odom_callback, 1)
        
        self.map_msg = OccupancyGrid()
        self.odom_msg = Odometry()

    def odom_callback(self,msg):
        self.is_odom=True
        self.odom_msg=msg

    def map_callback(self,msg):
        self.is_map=True
        self.map_msg=msg



def main(args=None):
    rclpy.init(args=args)
    global_planner = Searching_path()
    rclpy.spin(global_planner)
    global_planner.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()