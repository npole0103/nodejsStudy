var http = require('http');
var fs = require('fs');
var url = require('url'); //url이라는 모듈을 사용할 것이다.

function templateHTML(title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
  </body>
  </html>
  `;
}

function templateList(filelist) {
  //글 목록
  var list = '<ul>';
  var i = 0;
  while (i < filelist.length) {
    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i += 1;
  }
  list += '</ul>';
  return list;
}

var app = http.createServer(function (request, response) { //서버 생성 익명 함수
  var _url = request.url; //url에 request.url
  var queryData = url.parse(_url, true).query; //url 모듈에서 쿼리데이터 추출
  var title = queryData.id;
  var pathname = url.parse(_url, true).pathname;
  //console.log(queryData.id); //쿼리데이터 출력
  //console.log(url.parse(_url, true));

  if (pathname === '/') { //루트 노드일 때
    if (title === undefined) { //id 값이 없다면

      fs.readdir('./data', (err, filelist) => {
        //본문 내용 읽기
        var title = 'Welcome';
        var description = 'Hello, Node.js';

        //글 목록
        var list = templateList(filelist);

        //리터럴 - 타이틀 본문 출력
        var template = templateHTML(title, list,
          `<h2>${title}</h2>
          <p>
            ${description}
          </p>`
        );

        response.writeHead(200);
        response.end(template); //쿼리 데이터 id값 가져옴.
      })

    }
    else //id 값이 있다면 
    {
      fs.readdir('./data', (err, filelist) => {

        fs.readFile(`data/${title}`, 'utf8', function (err, description) {
          //타이틀
          var title = queryData.id;
          //글 목록
          var list = templateList(filelist);
          //리터럴 - 타이틀 본문 출력
          var template = templateHTML(title, list,
            `<h2>${title}</h2>
          <p>
            ${description}
          </p>`
          );

          response.writeHead(200);
          response.end(template); //쿼리 데이터 id값 가져옴.
        });

      })
    }
  }
  else {
    response.writeHead(404);
    response.end('Not Found'); //쿼리 데이터 id값 가져옴.
  }

  //url 에 따라 바뀜, __dirname은 디렉토리 절대경로인듯?
  //fs.readfilesync라는 함수로 읽어서 response.end()에다가 위치 시킴.
});

app.listen(3000);