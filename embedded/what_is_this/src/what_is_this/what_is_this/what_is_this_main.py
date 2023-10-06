import threading
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

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
        self.control_status = threading.Thread(target=self.control)
        self.control_status.start()

    def control(self):
        while True:
            temp = input()
            if temp == '1':
                self.status = "WAIT_MAPPING"
            if temp == '2':
                self.status = "SKIP_MAPPING"
            if temp == '3':
                self.status = "CALCULATE_PATH"
            if temp == '4':
                self.status = "WAIT_FINDING"
            if temp == '5':
                self.status = "FINDING"
            print(f"\rSTATUS를 {self.status}로 변경합니다.\n",end="")

    # 현재 진행상태 publish
    def tell_bot_status(self):
        self.str_msg.data = self.status
        print("{0:<40} >>".format(f"\rSTATUS : {self.status}"),end="")
        self.status_publisher.publish(self.str_msg)
    
    # 진행결과에 따라 status 변경
    def check_bot_status(self,msg):
        self.get_result = msg.data
        if self.get_result == "CONNECTED":
            self.status = "WAIT_WORK"
        if self.get_result == "WORK_START":
            self.status = "WAIT_MAPPING"
        elif self.get_result == "MAPPING":
            self.status = "MAPPING"
        elif self.get_result == "END_MAPPING":
            self.status = "CALCULATE_PATH"
        elif self.get_result == "CALCULATE_PATH_FINISHED":
            self.status = "WAIT_FINDING"
        elif self.get_result == "FINDING":
            self.status = "FINDING"
        elif self.get_result == "END_FINDING":
            self.status = "FINISH"
        elif self.get_result == "ERROR":
            self.status = "ERROR"
        elif self.get_result == "WORK_STOP":
            self.status = "WORK_STOP"


def main(args=None):
    rclpy.init(args=args)
    what_is_this = What_is_this()
    rclpy.spin(what_is_this)
    what_is_this.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()