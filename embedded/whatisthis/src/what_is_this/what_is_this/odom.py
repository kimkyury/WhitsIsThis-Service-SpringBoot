import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from ssafy_msgs.msg import TurtlebotStatus
from sensor_msgs.msg import Imu
from squaternion import Quaternion
from nav_msgs.msg import Odometry
from math import pi, cos, sin
import tf2_ros
import geometry_msgs.msg

class Odom(Node):
    def __init__(self):
        super().__init__('odom')
        self.imu_sub = self.create_subscription(Imu, '/imu', self.imu_callback, 10)
        self.subscription = self.create_subscription(TurtlebotStatus,'/turtlebot_status', self.listener_callback, 10)

        self.odom_publisher = self.create_publisher(Odometry, 'odom', 10)

        self.broadcaster = tf2_ros.StaticTransformBroadcaster(self)

        self.odom_msg = Odometry()
        self.laser_transform = geometry_msgs.msg.TransformStamped()
        self.base_link_transform = geometry_msgs.msg.TransformStamped()
        
        self.is_imu = False
        self.is_status = False
        self.is_calc_theta = False

        # turtlebot start position
        self.x = 2.8
        self.y = -4
        self.theta = 0.0
        self.prev_time = 0

        self.odom_msg.header.frame_id="map"
        self.odom_msg.child_frame_id="base_link"
        self.base_link_transform.header.frame_id="map"
        self.base_link_transform.child_frame_id="base_link"

        self.laser_transform.header.frame_id="base_link"
        self.laser_transform.child_frame_id="laser"
        self.laser_transform.transform.translation.x = 0.0
        self.laser_transform.transform.translation.y = 0.0
        self.laser_transform.transform.translation.z = 1.0
        self.laser_transform.transform.rotation.w = 1.0
        
    def imu_callback(self, msg):
        if self.is_imu == False:
            self.is_imu = True
            imu_q = msg.orientation
            imu = Quaternion(imu_q.w, imu_q.x, imu_q.y, imu_q.z)

            _,_,yaw = imu.to_euler()
        else :
            imu_q = msg.orientation
            imu = Quaternion(imu_q.w, imu_q.x, imu_q.y, imu_q.z)

            _,_,yaw = imu.to_euler()
            self.theta = yaw

    def listener_callback(self, msg):
        if self.is_imu == True:
            if self.is_status == False:
                self.is_status = True
                self.prev_time = rclpy.clock.Clock().now()
            else : 
                self.current_time = rclpy.clock.Clock().now()
                self.period = (self.current_time-self.prev_time).nanoseconds/1000000000
                linear_x = msg.twist.linear.x
                angular_z = msg.twist.angular.z

                self.x+=linear_x*cos(self.theta)*self.period
                self.y+=linear_x*sin(self.theta)*self.period
                self.theta+=angular_z*self.period    
                
                self.base_link_transform.header.stamp =rclpy.clock.Clock().now().to_msg()
                self.laser_transform.header.stamp =rclpy.clock.Clock().now().to_msg()

                q = Quaternion.from_euler(0, 0, self.theta)

                self.base_link_transform.transform.translation.x = self.x
                self.base_link_transform.transform.translation.y = self.y
                self.base_link_transform.transform.rotation.x = q.x
                self.base_link_transform.transform.rotation.y = q.y
                self.base_link_transform.transform.rotation.z = q.z
                self.base_link_transform.transform.rotation.w = q.w
                
                self.odom_msg.pose.pose.position.x=self.x
                self.odom_msg.pose.pose.position.y=self.y
                self.odom_msg.pose.pose.orientation.x = q.x
                self.odom_msg.pose.pose.orientation.y = q.y
                self.odom_msg.pose.pose.orientation.z = q.z
                self.odom_msg.pose.pose.orientation.w = q.w
                self.odom_msg.twist.twist.linear.x = linear_x
                self.odom_msg.twist.twist.angular.z= angular_z

                self.broadcaster.sendTransform(self.base_link_transform)
                self.broadcaster.sendTransform(self.laser_transform)
                self.odom_publisher.publish(self.odom_msg)
                self.prev_time=self.current_time
  
def main(args=None):
    rclpy.init(args=args)

    wit_odom = Odom()

    rclpy.spin(wit_odom)
    wit_odom.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
