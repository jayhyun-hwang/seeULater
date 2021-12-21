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
  ```shell
  sudo crontab -l
  sudo crontab -e
  # 2개월마다 1일에 인증서를 갱신하고 서버 재시작!
  0 0 1 */2 * /usr/bin/certbot renew --renew-hook="sudo pm2 restart seeulater"
  :wq
  sudo crontab -l
  view /var/log/syslog
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

---
리액트 초기값(상태)를 세팅할 때 - React Hook Lifecyle
useState()안에 직접 초기값을 세팅하면, 값이 렌더링의 초기에(Render phase) 세팅된다. 하지만 useEffect([]) 의 콜백함수 안에서 값을 세팅해 주면, 그 이후(Commit phase)에 값이 세팅된다.

Origin Host를 설정할 때, localhost와 127.0.0.1(loopback)는 다르다...