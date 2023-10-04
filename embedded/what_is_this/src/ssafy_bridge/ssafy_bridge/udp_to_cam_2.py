import numpy as np
import cv2
import socket

import rclpy
from rclpy.node import Node
from ssafy_bridge.utils import UDP_CAM_Parser
from sensor_msgs.msg import CompressedImage


params_cam_2 = {
    "SOCKET_TYPE": 'JPG',
    "WIDTH": 320, # image width
    "HEIGHT": 240, # image height
    "FOV": 60, # Field of view
    "localIP": "127.0.0.1",
    "localPort": 1233,
    "Block_SIZE": int(65000),
    "UnitBlock_HEIGHT": int(30),
    "X": 1.7, # meter
    "Y": 0,
    "Z": 1.2,
    "YAW": 0, # deg
    "PITCH": -5,
    "ROLL": 0
}


class IMGPublisher(Node):

    def __init__(self):
        super().__init__(node_name='image_convertor')

        self.udp_parser2 = UDP_CAM_Parser(ip=params_cam_2["localIP"], port=params_cam_2["localPort"], params_cam=params_cam_2)

        self.publisher2 = self.create_publisher(CompressedImage, '/obstacle/compressed', 5)
        self.timer_period = 1/5  # seconds
        self.timer = self.create_timer(self.timer_period, self.timer_callback)

        self.img_msg2 = CompressedImage()

    def timer_callback(self):

        self.udp_parser2.recv_udp_data()

        if len(self.udp_parser2.img_byte)==0:

            pass

        else:
            self.img_msg2.format = "jpeg"

            self.img_msg2.data = self.udp_parser2.img_byte

            self.publisher2.publish(self.img_msg2)


def main(args=None):

    rclpy.init(args=args)

    image_parser = IMGPublisher()

    rclpy.spin(image_parser)


if __name__ == '__main__':

    main()