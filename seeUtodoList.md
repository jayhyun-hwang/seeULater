# Major(step)

- 계정기능, 쿠키값으로 사용자 식별 (jwt 사용), chrome extension에서 프록시 사용
  - 로그인 상태 시 로그인 페이지 접근 불가
  - 알파벳 52 + 숫자 10 == 62, 12자
  - 해시, 양방향, DB에 id로 저장
- react에서 url, port를 context로 global변수화
- aws https 로드밸런서 사용
- **로그, ~~모니터링~~ 제작**
- 도커 컨테이너 화(dockerfile 빌드)
- db 커넥션 풀 추가
- **유닛테스트 작성**
- **깃 푸시 시 유닛테스트 실행하고, static 웹 spa폴더 새로고침(제거 및 새로빌드 후 이동)해서 푸시 - git flow**
- **로그 생성 및 수정하기**
- **caching preview information to localstorage**
- 크롬 확장기능을 통해 저장했을 때, 소켓으로 페이지 새로고침하기. (websocket 사용)
- 파이어베이스 계정기능
- 파일 디렉토리기능 구현, div 추가
- 그룹 만들어 공동관리 가능
- 간단한 메모 팝업 후 제출, UrlList에서도 메모 조회 가능
- ~~aws에 저장소 올려놓기~~
- ~~개발모드 branch, define, command 만들기~~
  - ~~chrome extension~~
  - ~~client~~
  - ~~node server~~
- ~~**watchdog 서버**~~
- ~~url, title, icon 모두 저장. 보여주기~~
- ~~React 컴포넌트 구조 정리하기~~ / 노드 서버 추가
- ~~로고 악어로 바꾸기~~
- ~~store url permanently~~
- ~~make url list - page~~
- ~~make a managing page~~
  - CRUD urls, **read 상태 업데이트 관리 남음**, memo 기능
  - enable to make tree directory(category folder structure)
- ~~when click extension icon, show managing menu~~
  - move to a managing page
  - Store this url (when the page blocked using right click)

# minor
- url 리스트 15개만 보여주기, 더 보기 기능 만들어서 추가 select
- 클릭 시 새 탭으로 여는 이벤트 수정. div 이벤트 제거. img, title 클릭 이벤트 추가
- when stored, popup at right bottom of the page(tab) - instead alert
- 포트 변수화, url 변수화
  - ~~node server~~
  - **react - context 사용** - 표현식 자바스크립트 함수화
- UrlList에 index 추가, 총 count도 받아오기
- ~~title, url에 특수문자(emoji - 4byte, utf8mb4) 사용 가능하게 하기~~
- ~~got response 로직 수정. 메세지 보내기~~
- ~~메인로고에 악어 넣기, 메인으로 이동~~
- ~~저장하기 단축키 설정, Ctrl + Shift + S~~
- ~~리스트 스택으로(order by regdate desc)~~
- ~~로그인 시 새로고침~~
- ~~아이콘 이미지 꽉 채우기~~
- ~~no image 이미지~~
- ~~UrlList에 regist at 추가~~

# later

- http2로 포팅
- NestJS로 포팅 + Typescript
- gRPC 사용