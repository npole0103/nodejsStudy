var http = require('http');
var fs = require('fs');
var url = require('url'); //url이라는 모듈을 사용할 것이다.

var app = http.createServer(function (request, response) { //서버 생성 익명 함수
  var _url = request.url; //url에 request.url
  var queryData = url.parse(_url, true).query; //url 모듈에서 쿼리데이터 추출
  var title = queryData.id;
  //console.log(queryData.id); //쿼리데이터 출력
  if (_url == '/') {
    title = 'Welcome';
  }
  if (_url == '/favicon.ico') { //에러일 시
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200);

  //본문 내용 읽기
  fs.readFile(`data/${title}`, 'utf8', function (err, description) {
    //리터럴
    var template = `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <ol>
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=JavaScript">JavaScript</a></li>
      </ol>
      <h2>${title}</h2>
      <p>
        ${description}
      </p>
    </body>
    </html>
    `;
    response.end(template); //쿼리 데이터 id값 가져옴.
  });

  //url 에 따라 바뀜, __dirname은 디렉토리 절대경로인듯?
  //fs.readfilesync라는 함수로 읽어서 response.end()에다가 위치 시킴.
});
app.listen(3000);