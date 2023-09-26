import rclpy
from rclpy.node import Node
from std_msgs.msg import String
import websocket
import requests
import threading
import time
import json

DEVICE_SERIAL="DEVICE1"
BASE_URL = "https://j9e203.p.ssafy.io"
WS_BASE_URL = "wss://j9e203.p.ssafy.io/ws"

class socket:
    def __init__(self):
        self.serial_number = DEVICE_SERIAL
        self.token = None
        self.sed_message = None
        self.rev_message = None
        self.ws = None

        self.ws_message = None
        self.ws_error = None
        self.ws_open = None
        self.ws_close = None

        self.get_token()
        self.connect()

    def get_token(self):
        cnt = 0
        while self.token == None and cnt < 10:
            response = requests.post(f"{BASE_URL}/api/v1/auth/devices/login",
                                        json={"serialNumber": self.serial_number}).json()
            if response['status'] == 200:
                self.token = response['data']['accessToken']
                self.rev_message = response['message']
                return
            elif response['status'] == 400:
                print('연결에 실패했습니다. 5초뒤 다시 시도합니다.')
                cnt += 1
                time.sleep(5)
        print('연결에 실패했습니다. 다시 시도해주세요.')
        exit(0)
    
    def connect(self):
        self.ws = websocket.WebSocketApp(
            WS_BASE_URL,
            on_message=self.ws_message,
            on_error=self.ws_error,
            on_close=self.ws_close,
            on_open=self.ws_open
        )

        self.ws_thread = threading.Thread(target=self.ws.run_forever)
        self.ws_thread.start()
        
        self.sed_message = {"type": "AUTH", "data": {"accessToken": self.token}}
        send_data = json.dumps(self.sed_message)

        self.ws.send(send_data)

        while True:
            message = self.ws.recv()

class What_is_this(Node):

    def __init__(self):
        super().__init__('what_is_this')
        self.status_publisher = self.create_publisher(String, 'progress', 10)
        self.status_subscriber = self.create_subscription(String, 'result', self.check_bot_status, 10)

        self.str_msg = String()
        self.status = "WAIT_CONNECT"
        self.get_result = None

        TIME_PERIOD = 1
        self.timer = self.create_timer(TIME_PERIOD, self.tell_bot_status)

    
    # 현재 진행상태 publish
    def tell_bot_status(self):
        self.str_msg.data = self.status
        print(f"STATUS : {self.status}")
        self.status_publisher.publish(self.str_msg)
    

    # 진행결과에 따라 status 변경
    def check_bot_status(self,msg):
        self.get_result = msg.data
        if self.get_result == "CONNECTED":
            self.status = "WAIT_MAPPING"
        elif self.get_result == "START_MAPPING":
            self.status = "MAPPING"
        elif self.get_result == "END_MAPPING":
            self.status = "WAIT_FINDING"
        elif self.get_result == "START_FINDING":
            self.status = "FINDING"
        elif self.get_result == "END_FINDING":
            self.status = "FINISH"


def main(args=None):
    rclpy.init(args=args)
    what_is_this = What_is_this()
    rclpy.spin(what_is_this)
    what_is_this.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()