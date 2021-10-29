// npm run start:dev로 실행 시 process.env.REACT_APP_MODE = dev
const argMode = process.env.REACT_APP_MODE;
let baseurl;

// dev/prod 모드 설정
function getUrl() {
  if (argMode === "dev") {
    baseurl = "http://127.0.0.1";
  } else {
    baseurl = "http://3.36.36.62";
  }
  return baseurl;
}

getUrl();

module.exports = {
    URL: baseurl,
    // URL: "http://127.0.0.1:3001",
    PORT: 80,
    REQURL: "http://3.36.36.62",
    REQURLDEV: "http://127.0.0.1"
    // REQURL: "http://3.36.36.62:3001"
}