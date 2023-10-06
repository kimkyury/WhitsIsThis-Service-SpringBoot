# 🏰 이게MO징 (SSAFY 9기 부울경)

<br/>

<div align=center>
<br/>
  ![image](./contents/images/logo.png)
</div>

<div align="center">
  <h3>사전 검사를 통한 신축 건물 시공 결함 피해 예방 프로젝트 </h3>
</div>

<div align="right"><a href="https://youtu.be/FYSZos7apbQ">🎥 UCC 보러 가기</a></div>
<br/>

## ⌨️ Project Theme

- 기간: 2023.08.21 ~ 2023.10.06 **(7주)**
- 프로젝트 주제: **결함 탐지 Device**를 통한 신축 건물 시공 **결함 피해 예방** 서비스
- 팀 명: MO
- 서비스 명: 이게MO징

<br/>

## 🎯 Motivation

### 배경

2018~2023(현재)까지 **공동주택 하자 분쟁 조정신청 건수**는 **평균 4000건대** 이상으로, 이에 대한 해결책이 필요한 상황

### 기존 사전점검 시장

- 1평 당 10,000~ 15,000원의 비용
- 탐색 전문가 3명 기준 3시간의 점검 소요시간
- 사전점검 결과까지 2~3주의 총 기간 소요

### 이게MO징의 차별성

- **AI 탑재가 된 자율주행 Bot**을 통해, 직원의 업무를 보조하여 **바닥 흠집, 곰팡이 등 손상 결함을** 발견
- Application을 통해 **직원과의 점검내용을 교차 편집**
- Application으로 작성된 **결함 내역을 PDF파일로 자동 변환**하여 Web에서 조회가능

<br/>

## 👨‍👩‍👧‍👦 Outline of MO (주요 기능)

### 🔗 [Go! Embedded ReadMe](./embedded)

- Token 기반 기기 인증
- Web Socket구현
- 자율 주행 경로 생성 알고리즘 구현
- Grid/Cell 좌표 변환 및 데이터 이미지화
- SLAM 구현
- 흠집 정보 확인 및 이미지/흠집좌표 생성
- 지역 경로 생성

### 🔗 [Go! Backend ReadMe](./backend)

- Spring Security & JWT기반 회원 보안
- 문자 SMS & Redis & Session 기반 비회원 보안
- Gitlab, Jenkins, Nginx, Docker, AWS EC2를 활용한 Spring Boot, React CI/CD 구축
- IoT기기와 App 사이의 Socket통신 구현
- Toss를 통한 가상계좌 이체 서비스 구현
- Naver SMS API를 이용한 휴대폰 인증 구현
- AWS EC2, S3를 활용한 이미지/설정 파일 관리
- Swagger API 문서환경 구축

### 🔗 [Go! Frontend ReadMe](./frontend)

- Customer Web
- Employee Web
- Employee Application
- 직원페이지 제작
- 고객페이지 제작
- Pdf 업로드, 다운로드
- dnd, pdf 등 라이브러리 적용
- 로그인 로그아웃 최초가입 생성
- 모바일 서비스 제공 UI/UX 제작
- 언어친숙도를 높이고자 라이브러리 사용 최소화
- 토큰 기반 autherized axios 통신
- 소켓 통신을 통해 진행 상황 실시간 정보 출력
- PWA를 통해 모바일 서비스 제공
- 컨텍스트 활용 등 불필요한 구간에서 데이터 호출, 전달 감소
- 컴포넌트 분할

<br/>

## 👥 팀원 소개

<a name="developers"></a>

|   **Name**   |                 신성환                 |                 김규리                 |                 이동규                 |                 조병철                 |                 조은정                 |                 홍진환                 |
| :----------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: | :------------------------------------: |
| **Profile**  | ![image](./contents/images/신성환.png) | ![image](./contents/images/김규리.png) | ![image](./contents/images/이동규.png) | ![image](./contents/images/조병철.png) | ![image](./contents/images/조은정.png) | ![image](./contents/images/홍진환.png) |
| **Position** |         Embedded <br/> Leader          |                Backend                 |                Backend                 |        Frontend <br/> Embedded         |                Embedded                |                Frontend                |
|   **Git**    |  [GitHub](https://github.com/hw2ny1)   | [GitHub](https://github.com/kimkyury)  |  [GitHub](https://github.com/unit74)   |  [GitHub](https://github.com/bbang7)   | [GitHub](https://github.com/jeunjeong) | [GitHub](https://github.com/RED202301) |
