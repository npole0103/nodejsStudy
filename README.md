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


---
