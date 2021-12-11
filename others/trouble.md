- [AWS] EC2에서 root 권한 사용하기

1. 다음 명령어를 실행하여 루트 사용자 권한을 가정합니다.
sudo su

2. root 사용자의 암호를 생성합니다.
passwd root 

3. 메시지가 표시되면 임시 루트 암호를 입력한 다음 다시 입력하여 확인합니다.

4. 작업을 완료한 후 다음 명령을 실행하여 루트 암호를 삭제합니다.
passwd –d root

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
