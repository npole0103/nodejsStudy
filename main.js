var http = require('http');
var fs = require('fs');
var url = require('url'); //url이라는 모듈을 사용할 것이다.
var qs = require('querystring');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var template = require('./lib/template.js'); //템플릿 모듈 사용

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
        var list = template.list(filelist);

        //리터럴 - 타이틀 본문 출력
        var html = template.html(title, list,
          `<h2>${title}</h2>
          <p>
            ${description}
          </p>`
          ,
          `<a href="/create">Create</a>`
        );

        response.writeHead(200);
        response.end(html); //쿼리 데이터 id값 가져옴.
      })

    }
    else //id 값이 있다면 
    {
      fs.readdir('./data', (err, filelist) => {
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
          //타이틀
          var title = queryData.id;

          //xss 방어용 Sanitize 모듈 사용
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description);

          //글 목록
          var list = template.list(filelist);
          //리터럴 - 타이틀 본문 출력
          var html = template.html(title, list,
            `<h2>${sanitizedTitle}</h2>
          <p>
            ${sanitizedDescription}
          </p>`
          ,
          `
          <a href="/create">Create</a>

          <a href="/update?id=${sanitizedTitle}">Update</a>

          <form action="/delete_process" method="post">
              <input type="hidden" name="id" value=${sanitizedTitle}>
              <input type="submit" value="delete">
          </form>
          `
          );

          response.writeHead(200);
          response.end(html); //쿼리 데이터 id값 가져옴.
        });

      });
    }
  }
  else if (pathname === '/create') {
    fs.readdir('./data', (err, filelist) => {
      //본문 내용 읽기
      var title = 'WEB - Create';

      //글 목록
      var list = template.list(filelist);

      //리터럴 - 타이틀 본문 출력
      var html = template.html(title, list,
        `
        <form action="http://localhost:3000/create_process" method="POST">
        <p>
            <input type="text" name="title" placeholder="title">
        </p>
        <p>
            <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
            <input type="submit">
        </p>
        </form>
        `
        , ''
      );

      response.writeHead(200);
      response.end(html); //쿼리 데이터 id값 가져옴.
    })
  }
  else if (pathname === "/create_process") {
    var body = '';

    //웹브라우저가 POST 방식으로 데이터를 보낼 때 받는 것
    request.on('data', (data) => {
      body += data;
      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6)
        request.connection.destroy();
    });

    //end 콜백이 실행될 때는 정보 수신이 끝났다는 의미.
    request.on('end', () => {
      var post = qs.parse(body); //수신된 body 정보를 parse 함수를 사용해서 post 정보 추출
      var title = post.title;
      var description = post.description;

      fs.writeFile(`data/${title}`, description, 'utf8', (err) => 
      {
        response.writeHead(302,{Location: `/?id=${title}`}); //302는 페이지 리다이렉션임
        response.end('success'); //파일 저장 성공
      })
    });
  }
  else if(pathname === '/update')
  {
    fs.readdir('./data', (err, filelist) => {
      var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}}`, 'utf8', function (err, description) {
        //타이틀
        var title = queryData.id;

        //글 목록
        var list = template.list(filelist);
        //리터럴 - 타이틀 본문 출력
        var html = template.html(sanitizedTitle, list,
          `
          <form action="http://localhost:3000/update_process" method="POST">
          <input type="hidden" name="id" value="${title}">
          <p>
              <input type="text" name="title" placeholder="title" value="${title}">
          </p>
          <p>
              <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
              <input type="submit">
          </p>
          </form>
          `,
        `
        <a href="/create">Create</a>
        <a href="/update?id=${title}">Update</a>
        `
        );

        response.writeHead(200);
        response.end(html); //쿼리 데이터 id값 가져옴.
      });

    });
  }
  else if (pathname === '/update_process')
  {
    var body = '';

    //웹브라우저가 POST 방식으로 데이터를 보낼 때 받는 것
    request.on('data', (data) => {
      body += data;
      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6)
        request.connection.destroy();
    });

    //end 콜백이 실행될 때는 정보 수신이 끝났다는 의미.
    request.on('end', () => {
      var post = qs.parse(body); //수신된 body 정보를 parse 함수를 사용해서 post 정보 추출
      var id = post.id; //기존 타이틀
      var title = post.title; //변경된 타이틀 명
      var description = post.description;

      fs.rename(`data/${id}`, `data/${title}`, (err)=>{ //oldPath, newPath, callback
        fs.writeFile(`data/${title}`, description, 'utf8', (err) =>  //파일 변경된 이후이기 때문에 title 값 가능
        {
          response.writeHead(302,{Location: `/?id=${title}`}); //302는 페이지 리다이렉션임
          response.end('success'); //파일 저장 성공
        })
      });

    });
  }
  else if (pathname === '/delete_process')
  {
    var body = '';

    //웹브라우저가 POST 방식으로 데이터를 보낼 때 받는 것
    request.on('data', (data) => {
      body += data;
      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6)
        request.connection.destroy();
    });

    //end 콜백이 실행될 때는 정보 수신이 끝났다는 의미.
    request.on('end', () => {
      var post = qs.parse(body); //수신된 body 정보를 parse 함수를 사용해서 post 정보 추출
      var id = post.id; //기존 타이틀
      var filteredId = path.parse(queryData.id).base;

      fs.unlink(`data/${filteredId}`, (err) => {
        response.writeHead(302, {Location: `/`}); //리다이렉션 302
        response.end(); //쿼리 데이터 id값 가져옴.
      });
    });
  }
  else {
    response.writeHead(404);
    response.end('Not Found');
  }

  //url 에 따라 바뀜, __dirname은 디렉토리 절대경로인듯?
  //fs.readfilesync라는 함수로 읽어서 response.end()에다가 위치 시킴.
});

app.listen(3000);