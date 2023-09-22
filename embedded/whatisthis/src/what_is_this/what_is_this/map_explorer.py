from sys import maxsize as INF
import numpy as np
import matplotlib.pyplot as plt
from collections import deque
from heapq import heappush, heappop
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

    while Path_points:
        # print(cur_x, cur_y, Path_points)
        # print(Path_points)
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

        min_path = dijkstra(cur_x, cur_y, Map, Path_points)
        path.extend(min_path)

        cur_x, cur_y = path[-1]
    
    return path

def floodFill(x: int, y: int, Map: np) -> np:
    visit = np.zeros((700,700))
    Map[x][y] = 60
    visit[x][y] = 1
    q = deque([(x, y)])

    while q:
        cx, cy = q.popleft()
        for dx, dy in DELTA:
            nx = cx + dx
            ny = cy + dy
            if nx < 0 or nx >= 700 or ny < 0 or ny >= 700:continue
            if visit[nx][ny]:continue
            if Map[nx][ny] > 85:continue
            if Map[nx][ny] == 0:continue
            visit[nx][ny] = 1
            Map[nx][ny] = 60
            q.append((nx,ny))
    return Map

def main():
    file = open('./map.txt','r')

    lines = file.readline().strip(' ')
    line_data = np.array(list(map(int,lines.split(' '))))
    Map = np.reshape(line_data, (700, 700))

    Map = floodFill(0, 0, Map)[180:520,180:520]
    Path_points = dict()

    for x in range(340):
        for y in range(340):
            if Map[x][y] == 100:
                for i in range(-4,5):
                    for j in range(-4,5):
                        if 0 <= x+i < 340 and 0 <= y+j < 340:
                            # 그 점도 장애물이 있으면 그 장애물 주위도 127로 바꿔야 하기 때문에 놔둔다.
                            if Map[x+i][y+j] != 100 and Map[x+i][y+i] != 127:
                                Map[x+i][y+j] = 127

    for x in range(0,340,15):
        min_y, max_y = INF, 0
        y = 0
        while y < 340:
            while Map[x][y] < 50:
                # Map[x][y] = 90
                min_y = y if y < min_y else min_y
                max_y = y if y > max_y else max_y
                y+=1
            
            if x != INF and min_y != INF and x != 0 and max_y != 0:
                Path_points[(x, min_y)] = max_y
                Path_points[(x, max_y)] = min_y
                min_y, max_y = INF, 0
            y+=1


    (start_point_x, start_point_y), _ = sorted(list(Path_points.items()))[0]
    # print(start_point_x, start_point_y)

    route = make_path(start_point_x, start_point_y, Path_points, Map)
    
    for x, y in route:
        Map[x][y] = 500
    #     plt.cla()
    #     plt.scatter(x,y)
    #     plt.xlim([0,340])
    #     plt.ylim([0,340])
    #     plt.pause(0.0001)
    # plt.show()

    # 배열 시각화
    # plt.imshow(Map, cmap='jet')  # cmap은 색상 맵을 지정합니다. 여기서는 'viridis'를 사용하였습니다.
    # plt.colorbar()  # 컬러 바 추가
    # plt.show()  # 그림 표시    

if __name__ == "__main__":
    main()