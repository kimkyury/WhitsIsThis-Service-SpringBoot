from sys import maxsize as INF
import numpy as np
import matplotlib.pyplot as plt
from collections import deque
from heapq import heappush, heappop
from PIL import Image
from math import sqrt

DELTA = ((-1, 0), (1, 0), (0, -1), (0, 1))
DELTA_D = ((0, 1, 1), (1, 1, 1.414), (1, 0, 1), (1, -1, 1.414), (0, -1, 1), (-1, -1, 1.414), (-1, 0, 1), (-1, 1, 1.414))

def dijkstra(x: int, y: int, Map: list, points: dict) -> tuple:
    visit = [[[INF, 0] for _ in range(340)] for _ in range(340)]
    visit[x][y] = [0, 0]
    h = [(0, x, y)]

    while h:
        cost, cur_x, cur_y = heappop(h)

        if points.get((cur_x, cur_y),0):break
        if visit[cur_x][cur_y][0] < cost:continue

        for dx, dy, w in DELTA_D:
            nx = cur_x + dx
            ny = cur_y + dy
            if nx < 0 or ny < 0 or nx >= 340 or ny >= 340:continue
            if Map[nx][ny] >= 59:continue
            total_cost = cost + w
            if total_cost < visit[nx][ny][0]:
                visit[nx][ny] = [total_cost, (cur_x, cur_y)]
                heappush(h, (total_cost, nx, ny))
                
    history = []
    cur = (cur_x, cur_y)
    while visit[cur[0]][cur[1]][1]:
        history.append(cur)
        cur = visit[cur[0]][cur[1]][1]
    history.reverse()

    return history


def make_path(start_x: int, start_y: int, Path_points: dict, Map: np) -> None:
    path = []
    cur_x, cur_y = start_x, start_y

    while True:
        target = Path_points.get((cur_x, cur_y),0)
        if target:
            if cur_y < target:
                for i in range(cur_y, target+1):
                    path.append((cur_x, i))
            elif cur_y > target:
                for i in range(cur_y, target-1, -1):
                    path.append((cur_x, i))
            
            Path_points.pop((cur_x, cur_y))
            Path_points.pop((cur_x, target))
            cur_y = target
            if not Path_points:break
        
        min_path = dijkstra(cur_x, cur_y, Map, Path_points)
        path.extend(min_path)

        cur_x, cur_y = path[-1]

    return path

def floodFill(x: int, y: int, Map: np) -> np:
    visit = np.zeros((340,340))
    Map[x][y] = 60
    visit[x][y] = 1
    q = deque([(x, y)])

    while q:
        cx, cy = q.popleft()
        for dx, dy in DELTA:
            nx = cx + dx
            ny = cy + dy
            if nx < 0 or nx >= 340 or ny < 0 or ny >= 340:continue
            if visit[nx][ny]:continue
            if Map[nx][ny] > 85:continue
            if Map[nx][ny] == 0:continue
            visit[nx][ny] = 1
            Map[nx][ny] = 60
            q.append((nx,ny))
    return Map

def main():
    with open('C:\map\map1.txt', 'r') as file:
        lines = file.readline().strip(' ')
        line_data = np.array(list(map(int,lines.split(' '))))
        Map = np.reshape(line_data, (340, 340))

        Map = floodFill(0, 0, Map)
        Path_points = dict()

    for x in range(340):
        for y in range(340):
            if Map[x][y] == 100:
                for i in range(-4,5):
                    for j in range(-4,5):
                        if 0 <= x+i < 340 and 0 <= y+j < 340:
                            if Map[x+i][y+j] != 100:
                                Map[x+i][y+j] = 127

    # for x in range(0,340,20):
    #     min_y, max_y = INF, 0
    #     y = 0
    #     while y < 340:
    #         while Map[x][y] < 50:
    #             min_y = y if y < min_y else min_y
    #             max_y = y if y > max_y else max_y
    #             y+=1
            
    #         if x != INF and min_y != INF and x != 0 and max_y != 0:
    #             Path_points[(x, min_y)] = max_y
    #             Path_points[(x, max_y)] = min_y
    #             min_y, max_y = INF, 0
    #         y+=1

    # (start_point_x, start_point_y), _ = sorted(list(Path_points.items()))[0]
    
    # route = make_path(start_point_x, start_point_y, Path_points, Map)
    # route = make_path(200, 200, Path_points, Map)

    images=[]

    # 기존 NumPy 배열 생성 (예: 340x340 크기의 검은색 이미지)
    width, height = 340, 340
    numpy_array = np.zeros((height, width, 3), dtype=np.uint8)

    for x in range(340):
        for y in range(340):
            if Map[x][y] == 60:
                numpy_array[x][y] = (248,243,252)
            elif Map[x][y] == 127:
                numpy_array[x][y] = (254,208,129)
            elif Map[x][y] == 100:
                numpy_array[x][y] = (249,108,108)
            else:
                numpy_array[x][y] = (248,243,252)

    # map_img = Image.fromarray(numpy_array)
    # map_img.show()

    razol = int(sqrt(340))-int(sqrt(sqrt(340)))
    numpy_conver = np.zeros((340//razol+1,340//razol+1,3), dtype=np.uint8)

    for x in range(0,340,razol):
        for y in range(0,340,razol):
            temp = np.max(Map[x:x+razol, y:y+razol])
            if temp == 60:
                numpy_conver[x//razol][y//razol] = (254,208,129)
            elif temp == 127:
                numpy_conver[x//razol][y//razol] = (254,208,129)
            elif temp == 100:
                numpy_conver[x//razol][y//razol] = (254,208,129)
            else:
                numpy_conver[x//razol][y//razol] = (248,243,252)

    room = list()
    for x in range(340):
        for y in range(340):
            if (numpy_conver[x//razol][y//razol] == np.array([248,243,252])).all():
                numpy_array[x][y] = (123,193,178)
    
    cnt = 1
    for x in range(340):
        for y in range(340):
            if (numpy_array[x][y] == np.array([123,193,178])).all():
                R = x%255
                G = y%255
                B = x+y%255
                cnt += 1
                q = [(x,y)]
                points = []
                while q:
                    x, y = q.pop()
                    for dx, dy in DELTA:
                        nx = x + dx
                        ny = y + dy
                        if 1 <= nx < 339 and 1 <= ny < 339:
                            if (numpy_array[nx][ny] == np.array([123,193,178])).all():
                                q.append((nx,ny))
                                numpy_array[nx][ny] = (R,G,B)

                                if Map[nx-1][ny] < 60 or Map[nx-1][ny] < 60 or Map[nx+1][ny] < 60 or Map[nx][ny+1] < 60:
                                    points.append((x,y))
                room.append(points)
    razol -= 3
    for points in room:
        for x, y in points:
            for i in range(-razol,razol+1):
                for j in range(-razol,razol+1):
                    if 0 <= x+i < 340 and 0 <= y+j < 340:
                        if Map[x+i][y+j] == 100 or Map[x+i][y+j] == 127 or Map[x+i][y+j]:continue
                        numpy_array[x+i][y+j] = numpy_array[x][y]
    # for x, y in point:
    #     for i in range(-razol,razol+1):
    #         for j in range(-razol,razol+1):
    #             if 0 <= x+i < 340 and 0 <= y+j < 340:
    #                 if Map[x+i][y+j] == 100 or Map[x+i][y+j] == 127 or Map[x+i][y+j]:continue
    #                 numpy_array[x+i][y+j] = (123,193,178)

    # for x in range(340):
    #     for y in range(340):
    #         if (numpy_conver[x//razol][y//razol] == np.array([248,243,252])).all():
    #             numpy_array[x][y] = (123,193,178)

    map_img = Image.fromarray(numpy_array)
    map_img.show()

    # 이미지를 Pillow 이미지로 변환
    # (123,193,178), (169,212,244)

    # for x, y in route:
    #     numpy_array[x][y] = (0, 184, 178)
    #     img = Image.fromarray(numpy_array)
    #     images.append(img)
    
    # images = images[1:][::45]

    # images[0].save('path_animation.gif', save_all=True, append_images=images, duration=1, loop=0)

if __name__ == "__main__":
    main()