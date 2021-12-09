TIL
---

- Content Security Policy
  - **Content Security Policy** ([CSP](https://developer.mozilla.org/en-US/docs/Glossary/CSP)) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross Site Scripting ([XSS](https://developer.mozilla.org/en-US/docs/Glossary/XSS)) and data injection attacks. These attacks are used for everything from data theft to site defacement to distribution of malware.
  - html 파일의 content source를 규정하는 보안 정책.(어떤 웹 리소스만 허용할지를 정의해놓은 보안 정책)
  - html의 head의 meta에서 정의한다.
  - react-app과 express helmet에서 정책 규정을 지원한다.
  - > 나의 프로젝트 같은 경우, 사용자들이 추가한 페이지의 대표 이미지 url을 소스로 이미지를 보여주는데, 이 과정에서 서버 자신('self') 이외의 img-src 자원 허용이 필요하다. 따라서 `img-src * ` 속성이 필요한데, 나는 페이지를 CSR로 렌더링하고 있어서 react에서 정책을 허용하고 빌드한 후, express helmet에서 또 설정을 허용해줘야 했다.
    >
