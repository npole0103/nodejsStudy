var fs = require('fs');

//readFileSync : 동기적 처리 방식
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');


//readFile : 비동기적 처리 방식
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', (err, result) => { //비동기적 방식 nodejs가 파일이 읽는 작업이 끝나면 내부에 있는 익명 함수를 실행시킨다.
    console.log(result);
});
console.log('C');
