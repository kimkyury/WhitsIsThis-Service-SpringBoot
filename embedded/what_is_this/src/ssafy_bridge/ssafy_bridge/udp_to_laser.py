import numpy as np
import cv2
import socket

import rclpy
from rclpy.node import Node
from ssafy_bridge.utils import UDP_LIDAR_Parser

from std_msgs.msg import Float32MultiArray
from sensor_msgs.msg import LaserScan, PointCloud, ChannelFloat32
from geometry_msgs.msg import Point32


params_lidar = {
    "CHANNEL" : int(1),
    "localIP": "127.0.0.1",
    "localPort": 9094,
    "Block_SIZE": int(1206)
}


class PCPublisher(Node):

    def __init__(self):
        super().__init__(node_name='pointcloud_convertor')

        self.udp_parser = UDP_LIDAR_Parser(ip=params_lidar["localIP"], port=params_lidar["localPort"], params_lidar=params_lidar)
        
        if params_lidar["CHANNEL"]==int(1):

            self.publisher_laser = self.create_publisher(LaserScan, '/scan', 5)


            self.pc_msg_init = LaserScan()

            self.pc_msg_init.header.frame_id = "laser"

            self.pc_msg_init.angle_min = 0.0

            self.pc_msg_init.angle_max = 360.0

            self.pc_msg_init.angle_increment = np.pi/180
            
            

            self.pc_msg_init.range_max = 10.0

        else:
            
            self.publisher_ = self.create_publisher(PointCloud, '/point_cloud', 5)
        
        self.timer_period = 1/60  # seconds
        self.timer = self.create_timer(self.timer_period, self.timer_callback)


    def timer_callback(self):

        if params_lidar["CHANNEL"]==int(1):

            self.pc_msg = self.pc_msg_init

            self.pose_msg = Float32MultiArray()

            ranges, intens, aux_data = self.udp_parser.recv_udp_data()

            if len(ranges)==0:

                pass

            else:

                self.pc_msg.ranges = ranges.astype(np.float32).tolist()
                self.pc_msg.ranges[-1]=0.0

                self.pc_msg.intensities = intens.astype(np.float32).tolist()
                self.pose_msg.data = aux_data.astype(np.float32).tolist()
                # self.pc_msg.intensities

                # self.pc_msg.angle_min=self.pose_msg.data[0]   
                self.pc_msg.range_min = self.pose_msg.data[0] #x
                self.pc_msg.scan_time=self.pose_msg.data[1]   #y
                self.pc_msg.time_increment=self.pose_msg.data[2] #heading
                
                

                self.publisher_laser.publish(self.pc_msg)
            



        else:

            self.pc_msg = PointCloud()

            self.pc_msg.header.frame_id = "map"

            X, Y, Z, Intensity = self.udp_parser.recv_udp_data()

            for x, y, z, intens in zip(X.tolist(), Y.tolist(), Z.tolist(), Intensity.tolist()):

                tmp_point = Point32()
                tmp_point.x = x
                tmp_point.y = y
                tmp_point.z = z

                tmp_channelfloat = ChannelFloat32()
                tmp_channelfloat.name = "intensity"
                tmp_channelfloat.values = [intens]

                self.pc_msg.points.append(tmp_point)
                self.pc_msg.channels.append(tmp_channelfloat)

            self.publisher_.publish(self.pc_msg)

        


def main(args=None):

    rclpy.init(args=args)

    pc_parser = PCPublisher()

    rclpy.spin(pc_parser)


if __name__ == '__main__':

    main()