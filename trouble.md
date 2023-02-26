- AWS EC2 키 페어 설정
  - .pem키로 private 키를 생성하고 연결에 사용
    - conversions - import key를 한 후에 save private key
  - windows의 경우, puttygen을 사용해 .ppk 포맷으로 변환이 필요함
    - ~~mobaxterm을 사용해 ssh와 ftps를 함께 사용하고 싶을 때는 key - parameters for key files에서 파라미터를 버전 2로 설정하고 진행한다~~
    - mobaxterm을 최신버전으로 받고 .ppk 포맷 3버전으로 변환해서 사용한다.
- [AWS] EC2에서 root 권한 사용하기

1. 다음 명령어를 실행하여 루트 사용자 권한을 가정합니다.
sudo su

2. root 사용자의 암호를 생성합니다.
passwd root 

3. 메시지가 표시되면 임시 루트 암호를 입력한 다음 다시 입력하여 확인합니다.

4. 작업을 완료한 후 다음 명령을 실행하여 루트 암호를 삭제합니다.
passwd –d root

- 도메인 구입 후, 네임서버 연결
가비아에서 도메인 구매.
아마존 Router 53에서 내 ec2 아이피를 도메인 명으로 등록
가비아 내 도메인 관리에서, 네임서버에 아마존 네임서버 들을 등록

- react에서의 CSP

  - \sulClient\public\index.html에서

  ```html
  <meta http-equiv="Content-Security-Policy" content="img-src * 'self'">
  ```

- express helmet에서의 CSP

  - 내 호스트가 아닌 다른 url로부터 이미지 resource를 받아와 보여줘야 한다.("*" 옵션이 필요)

  ```javascript
  const helmet = require("helmet");
  app.use(helmet());
  app.use(
      helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
          "img-src": ["*", "'self'", "data:"],
        },
      })
    );
  ```
  
- letsencrypt 자동갱신 crontab으로 등록
  
  - 포트 redirect 해제
  
    ```shell
    sudo iptables -D PREROUTING -t nat -i -p tcp --dport 80 -j REDIRECT --to-port 3001

    ```
  
    
  
  ```shell
  sudo crontab -l
  sudo crontab -e
  # 2개월마다 1일에 인증서를 갱신하고 서버 재시작!
  0 0 1 */2 * /usr/bin/certbot renew --renew-hook="sudo pm2 restart seeulater"
  :wq
  sudo crontab -l
  view /var/log/syslog

  # 수동으로 갱신
  certbot certonly --standalone
  # 도메인 www.seeulater.kr 입력
  ```
  
- git ignore가 안먹을 때
  ```shell
  git rm -r --cached .
  ```
  
- 새 로컬 환경에서 git auth 얻기, 저장
```bash
git config --global user.name "{username}"
git config --global user.email "{email}"
git config --global credential.helper store
```
- git 명령어
```bash
# 리모트 확인
git remote -v

# 리모트 저장소 제거
git remote remove {origin}

# 리모트 추가
git remote add origin {https://github~~}

# 깃 브랜치 설정
git branch --set-upstream-to=origin/main main

# 깃 discards all
git checkout -- .

# 깃 강제 pull
git fetch --all
git reset --hard origin/main
git pull

# 깃 강제 push
git push -u origin main --force
```
---
리액트 초기값(상태)를 세팅할 때 - React Hook Lifecyle
useState()안에 직접 초기값을 세팅하면, 값이 렌더링의 초기에(Render phase) 세팅된다. 하지만 useEffect([]) 의 콜백함수 안에서 값을 세팅해 주면, 그 이후(Commit phase)에 값이 세팅된다.

Origin Host를 설정할 때, localhost와 127.0.0.1(loopback)는 다르다...

---
- get parameter 사용할 때, path와 query string 중 무슨 방법으로 파마리터를 전달할 것인가?
  - 자원의 위치를 표시할 경우, /(path) 방식을 사용
    - ex) urls/${user_id}
  - 리소스의 필터링, 정렬을 위한 파라미터인 경우
    - ex) urls?page=${page}&sort=${sort}
  - **어떤 방식으로 파라미터를 전달하던 결과는 똑같지만, 다양한 경우에서의 복잡성과 가독성을 고려하면 best practice 방식을 사용하는 것이 좋다.**
  - ex) urls/${user_id}/${directory}?page=2&sort=asc == user_id와 directory가 $$인 urls를 2 페이지의 오름차순으로 가져온 것.

---
크롬 확장프로그램 배포
배포 시 해야할 일
1. copy chromeExtention\'s files to chromeExtention_RELEASE
2. check this define
3. check manifest.json
---
node 에러
port 3000 aleady running
- 해결법
 - 다른 와이파이로 연결했다가 끊고 다시 인터넷 연결 후, 재실행
- npx kill-port 3000 &&
---
- footer가 directories div의 높이 때문에 바닥에서 떠 있어서 Main 컴포넌트의 최소 길이를 vh로 정해둠
- 버튼 클릭 이벤트 후, event.currentTarget.blur()로 엔터로 재실행하는것을 막아준다.
---
- AWS EC2에 docker 설치
  ```bash
  # yum 패키지 업데이트
  sudo yum update
  # docker 패키지 검색
  sudo yum search docker
  # docker 패키지 정보 확인
  sudo yum info docker
  # docker 패키지 설치
  sudo yum install docker
  # docker 서비스 등록
  sudo systemctl enable docker.service
  # docker 데몬 실행
  sudo systemctl start docker.service
  
  # 필요시 유저에게 사용권한 등록
  sudo usermod -a -G docker ec2-user
  id ec2-user
  # Reload a Linux user's group assignments to docker w/o logout
  newgrp docker
  
  # docker 버전 확인
  docker version
  
  # docker-compose 사용할 시, pip3을 통해 추가 설치
  # 미설치 시, pip3 설치
  sudo yum install python3-pip
  
  # docker-compose 설치
  sudo pip3 install docker-compose
  
  # docker-compose 버전 확인
  docker-compose version
  ```
