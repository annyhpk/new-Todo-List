# TODO 2023

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

## :: 데모 페이지

DEMO: https://annyhpk.github.io/new-Todo-List

## :: 설치

npm을 사용하여 설치

```bash
npm install
```

프로젝트 실행

```bash
npm run dev
```

## :: 폴더 구조

```plaintext
├── src
│   ├── components          // 컴포넌트
│   │     ├── Form
│   │     ├── GlobalNavBar
│   │     ├── Input
│   │     ├── Loading
│   │     ├── PrivateRoute
│   │     ├── PublicRoute
│   │     ├── TextArea
│   │     └── Todo
│   ├── constants
│   ├── contexts
│   │     └── Auth
│   ├── hooks
│   │     ├── mutations
│   │     └── queries
│   ├── pages
│   │     ├── LoginPage
│   │     ├── MainPage
│   │     ├── SignUpPage
│   │     └── TodoPage
│   ├── service
│   │     ├── Todo
│   │     └── User
│   ├── utils
│   │
│   ├── App.jsx
│   ├── main.tsx
│   └── reset.ts
```

# 구현 목록

## Login / SignUp 부분

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
  - [x] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
- 이메일과 비밀번호의 유효성을 확인합니다
  - [x] 이메일 조건 : 최소 `@`, `.` 포함
  - [x] 비밀번호 조건 : 8자 이상 입력
  - [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
- 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
  - [x] 응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
  - [x] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
  - [x] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

## Todo List 부분

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
  - [ ] 목록 / 상세 영역으로 나누어 구현해주세요
  - [x] Todo 목록을 볼 수 있습니다.
  - [x] Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
  - [x] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있니다.
  - [x] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
- 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
  - [x] 새로고침을 했을 때 현재 상태가 유지되어야 합니다.
  - [ ] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
- 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요

  - [x] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

## 기타

- Typescript를 사용하여 구현해주세요.
  - [x] strict 옵션을 적용하기.
  - [x] 보다 좁은 타입으로 정의하기.
- React-Query를 적용하여 구현해주세요.
  - [x] 관심사에 따라 코드를 분리해주세요.
