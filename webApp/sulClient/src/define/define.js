// npm run start:dev로 실행 시 process.env.REACT_APP_MODE = dev
const argMode = process.env.REACT_APP_MODE;
let baseurl;

// dev/prod 모드 설정
function getUrl() {
  if (argMode === "dev") {
    baseurl = "http://localhost";
  } else {
    baseurl = "https://www.seeulater.site";
  }
  return baseurl;
}

getUrl();

module.exports = {
    URL: baseurl,
    // URL: "http://127.0.0.1",
    PORT: 80,
    VERSION: "1.0.4",
}