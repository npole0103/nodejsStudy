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