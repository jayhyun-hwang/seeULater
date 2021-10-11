# 1. chrome extension dev 모드

- /chromeExtension_dev 폴더를 크롬 확장프로그램 관리에서 업로드한다.
- seeulater_dev 프로그램을 사용해 개발, 테스트한다.

# 2. 백엔드 서버 dev 모드(nodeServer)

- 코드 작업 후 다음 명령어로 실행

  ```powershell
  node . dev
  ```

  - baseurl과 database를  localhost로 접근하는 명령어

# 3. client(react-app) dev 모드(sulClient)

- 리액트 앱 dev모드로 실행

  ```powershell
  npm run start:dev
  ```

  - set \"REACT_APP_MODE=dev\" && react-scripts start
  - REACT_APP_MODE=dev로 설정 후 실행.

# 또는 runDevMode.bat 배치파일 실행



