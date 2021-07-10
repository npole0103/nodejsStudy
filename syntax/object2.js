//array, object

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