- [AWS] EC2에서 root 권한 사용하기

1. 다음 명령어를 실행하여 루트 사용자 권한을 가정합니다.
sudo su

2. root 사용자의 암호를 생성합니다.
passwd root 

3. 메시지가 표시되면 임시 루트 암호를 입력한 다음 다시 입력하여 확인합니다.

4. 작업을 완료한 후 다음 명령을 실행하여 루트 암호를 삭제합니다.
passwd –d root

- 

  - \sulClient\public\index.html에서

  ```html
  <meta http-equiv="Content-Security-Policy" content="img-src * 'self'">
  ```

  