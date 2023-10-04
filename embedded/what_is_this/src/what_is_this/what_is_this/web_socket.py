import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from sensor_msgs.msg import LaserScan
from nav_msgs.msg import OccupancyGrid

import base64
from PIL import Image
from io import BytesIO
import websocket
import requests
import threading
import time
import json
import numpy as np

DEVICE_SERIAL="DEVICE1"
BASE_URL = "https://j9e203.p.ssafy.io"
WS_BASE_URL = "wss://j9e203.p.ssafy.io/ws"

class Web_socket(Node):
    
    def __init__(self):
        super().__init__('web_socket')
        self.status_publisher = self.create_publisher(String, 'result', 1)
        # 현재 상태 받아오기
        self.status_sub =  self.create_subscription(String, 'progress', self.check_status, 1)
        self.is_status = False
        # 현재 좌표 받아오기
        self.subscription = self.create_subscription(LaserScan, 'scan',self.scan_callback,1)
        self.is_scan = False
        # 현재 맵 정보 받아오기
        self.map_sub = self.create_subscription(OccupancyGrid, 'map', self.map_callback,1)
        self.is_map = False
        # 현재 진행도 받아오기
        self.percnet_sub = self.create_subscription(String, 'percent', self.percent_callback,1)
        self.is_percent = False        

        self.serial_number = DEVICE_SERIAL
        self.result_msg = String()
        self.token = None
        self.sed_message = None
        self.rev_message = None
        self.x = "0"
        self.y = "0"
        self.map_data = None
        self.get_token()

        print("{0:<40} >>".format('\rAttempting a WebSocket connection.'),end="")
        self.ws = websocket.create_connection(WS_BASE_URL,)

        print("{0:<40} >>".format('\rAttempting WebSocket authentication.'),end="")
        self.sed_message = json.dumps({"type": "AUTH", "data": {"accessToken": self.token}})
        self.ws.send(self.sed_message)

        print("{0:<40} >>".format('\rConnection completed.'),end="")
        self.result_msg.data = "CONNECTED"
        self.status_publisher.publish(self.result_msg)

        thread_r = threading.Thread(target=self.w_recv)
        thread_s = threading.Thread(target=self.w_send)

        thread_r.start()
        thread_s.start()

    def percent_callback(self,msg):
        self.is_percent = True
        self.percent = msg.data

    def check_status(self,msg):
        self.is_status = True
        self.status = msg.data

    def map_callback(self,msg):
        self.is_map=True
        map_data=np.array(msg.data)
        map_data=map_data.reshape((340,340))
        # 대각선 대칭
        map_data = np.rot90(map_data, k=1)
        map_data = np.flipud(map_data)

        map_datas=np.zeros((340,340,3), dtype=np.uint8)
        
        for x in range(340):
            for y in range(340):
                if map_data[x][y] == 60:
                    map_datas[x][y] = (248,243,252)
                elif map_data[x][y] == 127:
                    map_datas[x][y] = (254,208,129)
                elif map_data[x][y] == 100:
                    map_datas[x][y] = (249,108,108)
                else:
                    map_datas[x][y] = (248,243,252)

        # 이미지를 'RGB' 모드로 바이트로 변환
        map_img = Image.fromarray(map_datas)
        buffered = BytesIO()
        map_img = map_img.convert('RGB')
        map_img.save(buffered, format="PNG")

        # 바이트 데이터를 base64로 인코딩
        image_bytes = buffered.getvalue()
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')

        self.map_data = image_base64
    
    def scan_callback(self, msg):
        self.is_scan=True
        self.x=str(round(msg.range_min,4))
        self.y=str(round(msg.scan_time,4))

    def say(self,message):
        print("\n" + "="*40 + "\n\n{0:<40}\n\n".format(f'\r{message}') + "="*40)

    def get_token(self):
        cnt = 0
        print("{0:<40} >>".format('\rRequesting a token.'),end="")
        while self.token == None and cnt < 10:
            response = requests.post(f"{BASE_URL}/api/v1/auth/devices/login",
                                        json={"serialNumber": self.serial_number}).json()
            if response['status'] == 200:
                self.token = response['data']['accessToken']
                self.rev_message = response['message']
                print("{0:<40} >>".format('\rReceived the token.'),end="")
                return
            elif response['status'] == 400:
                print("{0:<40} >>".format('\rConnection failed. Retrying in 2 seconds.'),end="")
                cnt += 1
                time.sleep(2)
        print("{0:<40} >>".format('\rConnection failed. Please try again.'),end="")
        self.result_msg.data = "ERROR"
        self.status_publisher.publish(self.result_msg)

    def w_recv(self):
        while True:
            print("{0:<40} >>".format('\r"Waiting for a command."'),end="")
            self.rev_message = json.loads(self.ws.recv())
            if self.rev_message["type"] == "COMMAND":
                if self.rev_message["data"]["command"] == "START":
                    self.say("Starting the task shortly.")
                    self.result_msg.data = "WORK_START"
                    self.status_publisher.publish(self.result_msg)
                elif self.rev_message["data"]["command"] == "END":
                    self.say("work end!!")
                    self.result_msg.data = "WORK_STOP"
                    self.status_publisher.publish(self.result_msg)
                    self.ws.close()
                    break
                else:
                    print("{0:<40} >>".format('\rundefined message'), end="")
        
    def w_send(self):
        # try:
        while True:
            time.sleep(1)
            if self.is_status:
                self.sed_message = json.dumps({"type":"STATUS","data":{"state" : self.status}})
                self.ws.send(self.sed_message)
                self.is_status = False

            if self.is_scan:
                self.sed_message = json.dumps({"type":"COORDINATE","data":{"x":self.x,"y":self.y}})
                self.ws.send(self.sed_message)
                self.is_scan = False
            
            if self.is_percent:
                self.sed_message = json.dumps({"type":"COMPLETION_RATE","data":{"rate":self.percent}})
                self.ws.send(self.sed_message)
                self.is_percent = False
            
            if self.is_map:
                self.sed_message = json.dumps({"type":"DRAWING","data":{"image" : str(self.map_data)}})
                self.ws.send(self.sed_message)
                self.is_map = False

        # except:
        #     print("{0:<40} >>".format('\rweb socket closed'),end="")

def main(args=None):
    rclpy.init(args=args)
    socket = Web_socket()
    rclpy.spin(socket)
    socket.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()