import rclpy
from rclpy.node import Node
from std_msgs.msg import String

import websocket
import asyncio
import requests
import threading
import time
import json

DEVICE_SERIAL="DEVICE1"
BASE_URL = "https://j9e203.p.ssafy.io"
WS_BASE_URL = "wss://j9e203.p.ssafy.io/ws"

class Web_socket(Node):
    
    def __init__(self):
        super().__init__('web_socket')
        self.status_publisher = self.create_publisher(String, 'result', 1)
        self.serial_number = DEVICE_SERIAL
        self.result_msg = String()
        self.token = None
        self.sed_message = None
        self.rev_message = None
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
        try:
            while True:
                self.sed_message = json.dumps({"type":"COORDINATE","data":{"x":"5.123","y":"5.123"}})
                self.ws.send(self.sed_message)
                # self.say("Data transmission completed.")
                time.sleep(3)
        except:
            print("{0:<40} >>".format('\rweb socket closed'),end="")

def main(args=None):
    rclpy.init(args=args)
    socket = Web_socket()
    rclpy.spin(socket)
    socket.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()