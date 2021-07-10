# nodejsStudy
nodejs Study

---

## Chap 1

### Node.js 등장 배경
JavaScript에 익숙한 개발자들이 새로운 컴퓨터 언어를 배우지 않고도 웹 페이지를 자동으로 생성하는 서버쪽 어플리케이션을 만들 수 있게 하고 싶어져서.

nodejs는 자바스크립트를 이용해서 자바스크립트가 아닌 컴퓨터 자체를 제어함.

Web Application

---

## Chap 2

### 수업의 목적

---

## Chap 3

### node.js 설치

javascript로 Node.js 런타임 실행

**.js 파일 실행시 터미널에서 `node 파일명.js` 입력**

---

## Chap 4

### 공부방법

1. JavaScript 문법 숙지

2. Node.js runtime

3. Node.js Application

---

## Chap 5

### Node.js로 웹서버 만들기

Node.js 는 내장 웹서버가 존재

``` javascript
var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){ //서버 생성 익명 함수
    var url = request.url; //url에 request.url
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){ //에러일 시
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url)); //url 에 따라 바뀜, __dirname은 디렉토리 절대경로인듯?
    //fs.readfilesync라는 함수로 읽어서 response.end()에다가 위치 시킴.
 
});
app.listen(3000);

```

---

## Chap 6

### Number Data Type & String Type

``` js
console.log(1+1);
console.log('1' + '1');
console.log('Hello World!'.length);
```

## Chap 7

### Variable

`var a = 30;`
`var name = 'npole'`

## Chap 8

### Template literal

내장된 표현식을 허용하는 문자열 리터럴

리터럴 : 정보를 표현하는 방법
(개행과 넣을 필요 없음, 변수 +로 표시 x)

``` js
//리터럴
var name = 'npole'
var letter = `asdasdasdasdasdasd

${name} wdawdamskmdklam asdmlwmald`;
console.log(letter);
```

## Chap 9

### URL의 이해

http://opentutorials.org:3000/main?id=HTML&page=12

http : protocol

opentutorials : host(domain)

3000 : port

main : path 컴퓨터 안에 어떤 파일인지 가르킴

id=HTML&page=12 : query string

---

## Chap 10

### URL을 통해서 입력된 값 사용하기

``` js
var http = require('http');
var fs = require('fs');
var url = require('url'); //url이라는 모듈을 사용할 것이다.

var app = http.createServer(function(request,response){ //서버 생성 익명 함수
    var _url = request.url; //url에 request.url
    var queryData = url.parse(_url, true).query; //url 모듈에서 쿼리데이터 추출
    //console.log(queryData.id); //쿼리데이터 출력
    if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){ //에러일 시
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    response.end(queryData.id); //쿼리 데이터 id값 가져옴.
    //url 에 따라 바뀜, __dirname은 디렉토리 절대경로인듯?
    //fs.readfilesync라는 함수로 읽어서 response.end()에다가 위치 시킴.
 
});
app.listen(3000);

```

---

## Chap 11

### 동적인 웹페이지 만들기

queryData 활용
``` js
var url = require('url'); //url이라는 모듈을 사용할 것이다.
var queryData = url.parse(_url, true).query; //url 모듈에서 쿼리데이터 추출
```

## Chap 12

### Node.js의 파일 읽기 기능
C R U D

파일을 어떻게 Node.js로 읽을까?

``` js
var fs = require('fs');

fs.readFile('nodejs/sample.txt', 'utf8', function(err, data){
    console.log(data);
});
```
---

## Chap 13

### 파일을 이용해 본문 구현

``` js
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

```

---

## Chap 14

### Boolean

아는 내용이라 생략

---

## Chap 15

### JavaScript 비교 연산자

아는 내용이라 생략

---

## Chap 16 

### 제어문

아는 내용이라 생략

---

## Chap 17

### 조건문

아는 내용이라 생략

---

## Chap 18

###  Node.js 콘솔에서의 입력값

`var args = process.argv;` : 콘솔에서 실행할 때 인자값 저장.

`args`는 배열 형식으로 가져오는데
- 0번 인덱스는 Node.js 런타임 위치
- 1번 인덱스는 실행파일 절대 경로
- 2번 인덱스는 인자로 들어온 값
- 3번부터 인덱스 값 차곡차곡 쌓임

---

## Chap 19

### APP 제작 - Not Found 구현

`var pathname = url.parse(_url, true).pathname;` : 현재 pathname을 가져옴.

루트 디렉토리('/')에서 id 값은 undefined이므로 조건문으로 undefined 일때의 title 값 지정해주기

---

## Chap 20

### JS 반복문

``` js
while(true)
  console.log('C1');

var i = 0;
while(i < 5)
{
  console.log(i);
  i += 1;
}

```

---

## Chap 21

### JS 배열

``` js
var arr = ['a', 'b', 'c', 'd'];
console.log(arr[0]);
console.log(arr);
console.log(arr.length);

arr.push('e'); // append
console.log(arr);

```

---

## Chap 22

### JS 배열과 반복문

``` js

var number = [1, 400, 12 , 34];
var i = 0;
var total = 0;
while(i < number.length)
{
  total += number[i];
  i += 1;
}

console.log(`total : ${total}`);

```

---

## Chap 23

### Node.js에서 파일 목록 알아내기

반복문으로 파일의 갯수만큼 읽기.

``` js
var testFolder = './data';
var fs = require('fs');

fs.readdir(testFolder, (err, files) => {
    /*
    files.forEach(file => {
        console.log(file);
    });
    */
    console.log(files);
})
```

---

## Chap 24

### 글목록 출력하기

```js
        //글 목록
        var list = '<ul>';
        var i = 0;
        while (i < filelist.length) {
          list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i += 1;
        }
        list += '</ul>';

```

---

## Chap 25

### JS 함수 기본 문법

아는 내용이라 넘어감.

### 함수의 입력

`console.log(Math.round(1.6));` //반올림 해주는 함수

`sum(2, 4);`

### 함수의 출력

`return a + b;`

---

##  Chap 26

### 함수를 이용해서 정리 정돈하기

중복되는 코드 함수로 묶어주기.

---

## Chap 27

### 수업의 정상

.

---

## Chap 28

### Synchronous & asynchronous

동기적인 처리 : 서버에서 요청을 보냈을 때 응답이 돌아와야 다음 동작을 수행할 수 있다. 즉 A 작업이 모두 진행 될때까지 B작업은 대기해야한다.

비동기적인 처리 : 반대로 요청을 보냈을 때 응답 상태와 상관없이 다음 동작을 수행 할 수 있다. 즉 A 작업이 시작하면 동시에 B작업이 실행된다. A 작업은 결과값이 나오는대로 출력된다.

### 동기와 비동기

**callback 유무의 차이?**

`fs.readFile(path[, option], callback)`

`fs.readFileSync(path[, option])`

``` js
//readFile : 비동기적 처리 방식
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', (err, result) => { //비동기적 방식 nodejs가 파일이 읽는 작업이 끝나면 내부에 있는 익명 함수를 실행시킨다.
    console.log(result);
});
console.log('C');
```
#### Node.js의 성능을 끌어올리려면 반드시 비동기적인 방식으로 처리를 해야한다.

### JS - Callback

callback : callback 함수 자리에 들어온 람다식은 본 함수가 실행이 다 끝난 후에 처리된다는 것을 의미함.

``` js
var a = () =>
{
    console.log('A');
}

a();

function slowfunc(callback)
{
    callback();
}

slowfunc(a);

```
**자바스크립트에서는 함수가 곧 값이다**

---

## Chap 29

### Node.js의 패키지 매니저와 PM2

Package Mannager : 패키지를 관리해주는 프로그램.

NPM : Node Package Manager

PM2 : `npm install pm2 -g`

PM2 실행하는 법 : `pm2 start 0000.js`

PM2 Monit : `pm2 monit`

PM2 LIST : `pm2 list`

PM2 STOP : `pm2 start 'LIST 목록 name'`

PM2 실행중 코드 수정 감시 모드 : `pm2 start main.js --watch`  
(만약 문제가 있어서 실행이 안된다면 `pm2 log`로 확인하자)

---

## Chap 30

### HTML - form

form 태그에 감싸서 전송

GET 방식 / POST 방식

사용자 입력 데이터는 전부 의심하기

---

## Chap 31

### App 제작 - 글생성 UI 만들기
``` html
<form action="http://localhost:3000/process_create" method="POST">
    <p>
        <input type="text" name="title">
    </p>
    <p>
        <textarea name="description"></textarea>
    </p>
    <p>
        <input type="submit">
    </p>
</form>
```

---

## Chap 32

### App 제작 - POST 방식으로 전송된 데이터 받기

`var app = http.createServer(function (request, response) { //서버 생성 익명 함수`

request : 요청할 때 웹브라우저가 보낸 정보.

response : 응답할 때 우리가 웹브라우저에 보낼 정보.

``` js
    var body = '';

    request.on('data', function (data) {
        body += data;

        // Too much POST data, kill the connection!
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6)
            request.connection.destroy();
    });

    request.on('end', function () {
        var post = qs.parse(body);
        // use post['blah'], etc.
    });
```
**body로 받은 데이터를 parse 함수를 사용하여 post 정보 추출**
``` js
    request.on('end', () => {
      var post = qs.parse(body); //수신된 body 정보를 parse 함수를 사용해서 post 정보 추출
      var title = post.title;
      var description = post.description;
    });
```

---

## Chap 33

### 파일 생성과 리다이렉션

파일쓰기

``` js
      fs.writeFile(`data/${title}`, description, 'utf8', (err) => 
      {
        response.writeHead(200);
        response.end('success'); //파일 저장 성공
      })
```

리다이렉션
``` js
      fs.writeFile(`data/${title}`, description, 'utf8', (err) => 
      {
        response.writeHead(302,{Location: `/?id=${title}`}); //302는 페이지 리다이렉션임
        response.end('success'); //파일 저장 성공
      })
```

---

## Chap 34

### 글수정 - 수정 링크 생성

`<a href="/update?id=${title}">Update</a>`

---

## Chap 35

### 글수정 - 수정할 정보 전송

``` html
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
```

---

## Chap 36

### 글수정 - 파일명 변경, 내용저장

``` js
      fs.rename(`data/${id}`, `data/${title}`, (err)=>{ //oldPath, newPath, callback
        fs.writeFile(`data/${title}`, description, 'utf8', (err) =>  //파일 변경된 이후이기 때문에 title 값 가능
        {
          response.writeHead(302,{Location: `/?id=${title}`}); //302는 페이지 리다이렉션임
          response.end('success'); //파일 저장 성공
        })
      });
```

---

## Chap 37

### 글삭제 - 삭제버튼 구현

삭제 버튼을 링크로 구현하면 대단히 잘못된 것임.

링크는 클릭했을 때 이동하는데, 누군가에게 해당 주소를 보낼 수도 있기 때문에.

Get 방식으로 Delete를 구현하면 안됨. Form으로 구현.

``` html
          <form action="delete_process" method="post">
              <input type="hidden" name="id" value=${title}>
              <input type="submit" value="delete">
          </form>
```

---

## Chap 38

### 글삭제 - 기능 완성

``` js
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

      fs.unlink(`data/${id}`, (err) => {
        response.writeHead(302, {Location: `/`}); //리다이렉션 302
        response.end(); //쿼리 데이터 id값 가져옴.
      });
    });
  }
```

---

## Chap 39

### 객체의 형식

Object VS Array

Obejct : 순서가 없는 정보 저장

Array : 순서에 따라서

---

## Chap 40

### 객체의 반복

``` js
var members = ['hi', 'bye', 'hello'];

var i = 0;
for(var i = 0; i < members.length ; i++)
{
    console.log(members[i]);
}

var roles = {
    'programmer' : 'hi',
    'designer' : 'bye',
    'manager' : 'hello'
}

//둘은 동일함.
console.log(roles.designer);
console.log(roles['designer']);

var i = 0;
for(var name in roles)
    console.log(name, "=> ",roles[name]); //name은 key값, roles[name]은 value 값
```

---

## Chap 41

### 객체 값으로서의 함수

OOP : 객체지향 프로그래밍

JS에서 함수는 값의 형태를 띈다.

배열의 원소로써 함수가 존재할 수 있다.

``` js
var f = function()
{
    console.log(1);
    console.log(2);
}

var a = [f, f]; //배열에 함수

a[0]();
a[1]();

var o = { //오브젝트에 함수
    func:f
}

o.func();

```

---

## Chap 42

### 객체-데이터와 처리 방법을 담는 그릇으로써 객체

``` js
var v1 = 'v1';
var v2 = 'v2';

var o = {
    v1:'v1',
    v2:'v2',
    f1:() => {console.log(this.v1);},
    f2:() => {console.log(this.v2);}
}

o.f1();
o.f2();

```

---

## Chap 43

### App 제작 - 템플릿 기능 정리정돈하기

``` js
var template = { //템플릿 객체 생성
  html:(title, list, body, control) => {
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
      ${control}
      ${body}
    </body>
    </html>
    `;
  },

  list: (filelist) => {
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
}
```

---

## Chap 44

### 모듈의 형식

`module.exports = M;` 객체 M을 모듈화 한다.

`var M = require('./mPart.js');` mPart.js에 있는 모듈을 사용하겠다.

---

## Chap 45

### 모듈의 활용

main.js 내 template 모듈화

---

## Chap 46

### 입력정보에 대한 보안

URL 파라미터에 `../password.js` 입력하면 패스워드 정보가 화면에 출력될 수가 있음.

Node.js에는 path라는 모듈이 존재

``` js
var path = require('path');

//경로 인자 값을 걸러줌
path.parse("../password.js").base; //출력값은 password.js


var filteredId = path.parse(queryData.id).base;

```

---

## Chap 47

### 출력정보에 대한 보안

XSS : 크로스 사이트 스크립팅

**sanitize-html**

`npm init`

`npm install -S sanitize-html`

`package.json` 파일에선 현재 어플리케이션이 의존하고 있는 소프트웨어를 알려줌.

``` js
          //xss 방어용 Sanitize 모듈 사용
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description);
```

스크립트 태그를 삭제해버림.

`allowedTags:['h1']` 옵션으로 특정 태그를 허용할 수 있음.

`var sanitizedDescription = sanitizeHtml(description, { allowedTags:['h1'], allowedTags:['h2'] });`

---

## Chap 48

### API와 CreateServer

`fs.readFile()` 이런 것들을 API라고 함.

[NodeJs 모듈](https://nodejs.org/dist/latest-v14.x/docs/api/)

`http.createServer([requestListener])`

---

## Etc..

자바스크립트는 웹 브라우저를 프로그래밍적으로 제어하기 위해 고안된 언어이다.

데이터베이스, 프레임워크, 모듈, API 

Node.js AWESOME 검색

---