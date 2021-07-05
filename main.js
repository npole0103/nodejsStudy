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