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
