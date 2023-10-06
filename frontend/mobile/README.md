E203

# [](#outline-of-iot)Outline of FrontEnd

Duration : August 21, 2023 (Mon) ~ October 6, 2023 (Fri)

Theme : 신축 건축물의 사전점검/홈체크 서비스

Service Name : ***이게뭐징 (What is this)***

Member : 조병철

---

## 💻 Development Environment

node : v18.16.1

react : v17.0.2 

react-qr-reader :  v3.0.0-beta-1

react-zxing : v2.0.0

react-router-dom : v6.15.0


---



## [](#file-path)📺File Path

+---src
<br>| App.css
<br> | App.jsx
<br>| index.css
<br>| index.js
<br>| service-worker.js
<br>| serviceWorkerRegistration.js
<br>|
<br>+---components
<br>| Building.jsx
<br>| HouseCard.jsx
<br>| HouseInfo.jsx
<br>| HouseTodoList.jsx
<br>| MyButton.jsx
<br>| MyInput.jsx
<br>| Notification.jsx
<br>| QRrecognition.jsx
<br>| SectionDetail.jsx
<br>| SerialNumberRecognition.jsx
<br>| TodoAddSection.jsx
<br>| TodoListItem.jsx
<br>| TodoListMain.jsx
<br>| TodoSectionItem.jsx
<br>|
<br>+---pages
<br>| Camera.jsx
<br>| Connection.jsx
<br>| ConnectionResult.jsx
<br>| Error.jsx
<br>| Home.jsx
<br>| HouseDetail.jsx
<br>| HouseList.jsx
<br>| HouseResult.jsx
<br>| Login.jsx
<br>| Search.jsx
<br>| SearchDetail.jsx
<br>|
<br>+---test
<br>| CircularProgressBar.jsx
<br>|
<br>---utils
<br>AuthHttp.js
<br>ParseAddress.js
<br>WebSocket.js

---

## [](#architecture-diagram)🧬Architecture Diagram

![ex_screenshot](./image/arcitecture.png)
  

---

⚙View

![ex_screenshot](./image/메인.png)![ex_screenshot](./image/로그인.PNG)

사용자 로그인

![ex_screenshot](./image/검색.PNG)![ex_screenshot](./image/검색상세.PNG)

사용자 할당 업무 조회

![ex_screenshot](./image/통신-QR인증.png)![ex_screenshot](./image/통신-시리얼번호.png)

터틀봇 통신 방식 QR / 시리얼번호

![ex_screenshot](./image/기기 연결 성공.PNG)![ex_screenshot](./image/기기 연결 성공-2.PNG)

기기 연결 통신 확인 후 버튼 활성화 및 다음 단계 수행 가능

![ex_screenshot](./image/리스트 상태.png)![ex_screenshot](./image/진행중인작업상세.png)

통신이 완료된 항목 및 상세조회

![ex_screenshot](./image/진행중인작업상세-결함발견.png)![ex_screenshot](./image/진행중인작업상세-사용자 작업 추가4.png)

기기 현황 및 사용자 작업 목록 추가

![ex_screenshot](./image/최종결과.png)

작업 완료 후 사용자/기기 결함 및 체크리스트 확인

----

## 🌁 Role

- 조병철
  - 모바일 서비스 제공 UI/UX 제작
  - 언어친숙도를 높이고자 라이브러리 사용 최소화
  - 토큰 기반 autherized axios 통신
  - 소켓 통신을 통해 진행 상황 실시간 정보 출력
  - PWA를 통해 모바일 서비스 제공
  - 컨텍스트 활용 등 불필요한 구간에서 데이터 호출, 전달 감소
  - 컴포넌트 분할
