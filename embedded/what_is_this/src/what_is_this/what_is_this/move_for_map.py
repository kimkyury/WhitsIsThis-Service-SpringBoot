import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist, Pose, PoseStamped
from ssafy_msgs.msg import TurtlebotStatus
from sensor_msgs.msg import Imu,LaserScan
from squaternion import Quaternion
from nav_msgs.msg import Odometry, OccupancyGrid, MapMetaData, Path
from math import pi, cos, sin
import numpy as np
import math
from queue import PriorityQueue

class MoveForMap(Node) : 
    def __init__(self):
        super().__init__('move_for_map')
        self.scan_sub = self.create_subscription(LaserScan, '/scan', self.scan_callback, 10)
        self.status_sub = self.create_subscription(TurtlebotStatus,'/turtlebot_status',self.status_callback,10)
        self.cmd_vel_pub = self.create_publisher(Twist,'cmd_vel', 10)
        
        time_period=0.05 
        self.timer = self.create_timer(time_period, self.timer_callback)

        self.wall_distance = 0.3 # 벽과의 거리 (미터)
        self.linear_speed = 0.0  # 로봇의 직진 속도 (m/s)
        self.angular_speed = 0.0  # 로봇의 회전 속도 (rad/s)
        self.wall_detected = False
        self.start = False
        self.initial_pose = None
        self.current_pose = None
        self.has_completed_one_rotation = False
        self.time = 0
    
    def scan_callback(self, msg):
        self.current_pose = [msg.range_min, msg.scan_time]
        range_data = msg.ranges
        min_data = 100.0
        min_theta = 360
        for i in range(1, 359):
            if(5 < i < 175):
                pass
            else :
                if(0 < range_data[i] < min_data) : 
                    min_data = range_data[i]
                    min_theta = i 
        if self.start == False : 
            if(85 < msg.time_increment < 95) : 
                self.angular_speed = 0.0
                self.linear_speed = 0.1
                if(range_data[180] <= self.wall_distance) : 
                    if self.initial_pose is None:
                        self.start = True
                        self.initial_pose = self.current_pose
                        print(range_data[180] , self.initial_pose)
                        return
            elif (95 <= msg.time_increment <= 180) : 
                self.angular_speed = 0.2
                self.linear_speed = 0.0
            else : 
                self.angular_speed = -0.2
                self.linear_speed = 0.0
        else : 
            self.angular_speed = 0.03 * (270-min_theta)

            if abs(min_theta-270) > 3: 
                self.linear_speed = 0.1 
            else : 
                if(min_data < self.wall_distance + 0.05) : 
                    self.angular_speed = 0.1
                elif (min_data > self.wall_distance - 0.05): 
                    self.angular_speed = -0.1
                
                self.linear_speed = 0.3

    def status_callback(self,msg):
        self.is_status=True
        self.status_msg=msg
        
    def timer_callback(self):
        if self.has_completed_one_rotation == True :
            twist_msg = Twist()
            twist_msg.linear.x = 0.0
            twist_msg.angular.z = 0.0
            self.cmd_vel_pub.publish(twist_msg)
            return
        else :
            twist_msg = Twist()
            twist_msg.linear.x = self.linear_speed
            twist_msg.angular.z = self.angular_speed
            self.cmd_vel_pub.publish(twist_msg)
        
            if self.initial_pose is not None:
                self.time +=1
                initial_x = self.initial_pose[0]
                initial_y = self.initial_pose[1]
                current_x = self.current_pose[0]
                current_y = self.current_pose[1]
                
                if self.start == True:      
                    if(abs(initial_x-current_x) < 0.5 and abs(initial_y-current_y) < 0.2):
                        if self.time > 1000 : 
                            self.has_completed_one_rotation = True
                            print("success")
                            twist_msg = Twist()
                            twist_msg.linear.x = 0.0
                            twist_msg.angular.z = 0.0
                            self.cmd_vel_pub.publish(twist_msg)
                            return
            

    def heuristic(self, start, goal):
        x1, y1 = start
        x2, y2 = goal
        return abs(x1 - x2) + abs(y1 - y2)

    def a_star(self,start):
        Q = PriorityQueue()
        # Q.put((우선 순위, 좌표))
        # 우선 순위에 비용을 넣겠다. 그러면 비용이 작은 좌표부터 나올 것이다.
        Q.put((1, start))
        self.cost[start[0]][start[1]] = 1
        found = False

        while not Q.empty():
            if found:
                break

            # Q.get() 하면 (우선순위, [ , ]) 이렇게 나온다.
            current = Q.get()[1]
            # print("current:", current)
            if current == self.goal:
                found = True

            for i in range(8):
                next = [current[0]+self.dx[i], current[1]+self.dy[i]]
                if next[0] >= 0 and next[1] >= 0 and next[0] < self.GRIDSIZE and next[1] < self.GRIDSIZE:
                    # 맵의 데이터를 이용한다.
                    # 대단히 중요한 부분이다. [next[0]][next[1]]이 아닌 점에 주목하기
                    # if self.grid[next[0]][next[1]] < 50:
                    if self.grid[next[1]][next[0]] < 50:
                    
                        # f = g+h
                        g = self.cost[current[0]][current[1]] + self.dCost[i]
                        f = g + self.heuristic(next, self.goal)
                        if f < self.cost[next[0]][next[1]]:
                            # 넥스트를 넣어준다.
                            # Q.put((f, next))
                            Q.put((g, next))
                            self.path[next[0]][next[1]] = current
                            self.cost[next[0]][next[1]] = g

        node = self.goal
        self.final_path.append(node)

        while node != start:
            nextNode = self.path[node[0]][node[1]]
            self.final_path.append(nextNode)
            node = nextNode
            
        print(self.final_path)


def main(args=None):
    rclpy.init(args=args)
    move = MoveForMap()
    rclpy.spin(move)
    move.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()                                                                          
