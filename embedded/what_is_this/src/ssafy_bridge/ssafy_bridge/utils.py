import socket
import threading
import time
import struct
import os
import numpy as np
import cv2

class UDP_CAM_Parser:

    def __init__(self, ip, port, params_cam=None):

        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        recv_address = (ip,port)
        self.sock.bind(recv_address)

        self.data_size=int(65000)
        self.sock.settimeout(600)
        
        self.max_len = int(0)
        
        # the steps while checking how many blocks need to complete jpg
        self.ready_step = int(10)
        self.check_max_len()

    def check_max_len(self):

        idx_list = b''

        for _ in range(self.ready_step):

            UnitBlock, sender = self.sock.recvfrom(self.data_size)
            
            idx_list+=UnitBlock[3:7]

        self.max_len = np.max(np.fromstring(idx_list, dtype = "int"))+1

    def recv_udp_data(self):

        TotalBuffer = b''
        num_block = 0

        while True:

            UnitBlock, sender = self.sock.recvfrom(self.data_size)

            if len(UnitBlock)==0:
                self.img_bytes=[]

            else:

                UnitIdx = np.fromstring(UnitBlock[3:7], dtype = "int")[0]
                UnitSize = np.fromstring(UnitBlock[7:11], dtype = "int")[0]
                UnitTail = UnitBlock[-2:]
                
                if num_block==UnitIdx:
                    TotalBuffer+=UnitBlock[11:(11 + UnitSize)]
                    num_block+=1

                if UnitTail==b'EI' and num_block==self.max_len:

                    self.img_byte = TotalBuffer

                    # TotalIMG = cv2.imdecode(np.fromstring(TotalBuffer, np.uint8), 1)
                    # self.img_byte = np.array(cv2.imencode('.jpeg', TotalIMG)[1]).tostring()
                
                    # TotalIMG = cv2.imdecode(np.fromstring(TotalBuffer, np.uint8), 1)
                    # self.img_byte = TotalBuffer

                    TotalBuffer = b''
                    num_block = 0

                    break

                elif UnitTail==b'EI' and num_block!=self.max_len:

                    TotalBuffer = b''
                    num_block = 0

                else:
                    pass
        
    def __del__(self):
        self.sock.close()
        print('del')



class UDP_LIDAR_Parser :
    
    def __init__(self, ip, port, params_lidar=None):

        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        recv_address = (ip,port)
        self.sock.bind(recv_address)

        self.data_size=params_lidar["Block_SIZE"]
        
        if params_lidar["CHANNEL"]==int(16):
            self.channel = int(16)
            self.max_len = 150
            self.VerticalAngleDeg = np.array([[-15,1,-13,3,-11,5,-9,7,-7,9,-5,11,-3,13,-1,15]])

        elif params_lidar["CHANNEL"]==int(32):
            self.channel = int(32)
            self.max_len = 300
            self.VerticalAngleDeg = np.array([[-30.67,-9.33,-29.33,-8.0,-28.0,-6.67,-26.67,-5.33,-25.33,-4,-24,-2.67,-22.67,-1.33,-21.33,
                                    0.0,-20.,1.33,-18.67,2.67,-17.33,4,-16,5.33,-14.67,6.67,-13.33,8,-12,9.33,-10.67,10.67]])

        else:
            self.channel = int(1)

    def recv_udp_data(self):

        Buffer = b''

        if self.channel==int(1):

            UnitBlock, sender = self.sock.recvfrom(self.data_size)

            if len(UnitBlock)==0:

                return [], [], []
            else:

                AuxData = np.frombuffer(UnitBlock[13:25], dtype=np.float32)

                Buffer+=UnitBlock[25:]
                Buffer_dist = b''

                for i in range(360):
                    
                    Buffer_dist+=Buffer[(3*i):(3*i+2)]
            
                Distance = np.frombuffer(Buffer_dist, dtype=np.uint8)

                Distance = (Distance[0::2].astype(np.float32) + 256*Distance[1::2].astype(np.float32))/1000
            
                Intensity = np.frombuffer(Buffer[0::3], dtype=np.ubyte)


                return Distance, Intensity, AuxData

        else:

            for _ in range(self.max_len):

                UnitBlock, sender = self.sock.recvfrom(self.data_size)
                
                Buffer+=UnitBlock[:1200]

            Buffer_np=np.frombuffer(Buffer, dtype=np.uint8).reshape([-1, 100])

            if self.channel==16:
                Azimuth = np.zeros((24*self.max_len,))
                Azimuth[0::2] = Buffer_np[:,2].astype(np.float32) + 256*Buffer_np[:,3].astype(np.float32)
                Azimuth[1::2] = Buffer_np[:,2].astype(np.float32) + 256*Buffer_np[:,3].astype(np.float32) + 20
            else:
                Azimuth = Buffer_np[:,2] + 256*Buffer_np[:,3]
            
            Distance = (Buffer_np[:,4::3].astype(np.float32) + 256*Buffer_np[:,5::3].astype(np.float32))*2
            Intensity = Buffer_np[:,6::3].astype(np.float32)

            # reshape outputs based on 16 channels
            Azimuth = Azimuth.reshape([-1, 1])/100
            Distance = Distance.reshape([-1, self.channel])/1000
            Intensity = Intensity.reshape([-1])

            x, y, z = self.sph2cart(Distance, Azimuth)

            return x, y, z, Intensity

    def sph2cart(self, R, a):

        x = R * np.cos(np.deg2rad(self.VerticalAngleDeg)) * np.sin(np.deg2rad(a))
        y = R * np.cos(np.deg2rad(self.VerticalAngleDeg)) * np.cos(np.deg2rad(a))
        z = R * np.sin(np.deg2rad(self.VerticalAngleDeg))
        
        return x.reshape([-1]), y.reshape([-1]), z.reshape([-1])

    def __del__(self):
        self.sock.close()
        print('del')

