"use strict"

let person = 
{
    name: "Nicholas",
    age: 29,
    job: "software engineer",

    sayname()
    {
        console.log(this.name);
    }
}

//console.log(person.name);
person.sayname();
person.name="Greg";
//console.log(person.name);
person.sayname();

//将person的name属性设置为不可写特性
Object.defineProperty(person,"name",{writable:false});
//person.name="Hello";
person.sayname();


//book对象

let book=
{
    _year:2017, //伪私有属性
    edition:1
}

Object.defineProperty(book,"year",{
    get(){return this._year},
    set(newValue)
    {
        if(newValue>2017)
        {
            this._year=newValue;
            this.edition+=newValue-2017;
        }
    }
});


/* let book={};
Object.defineProperties(
    book,
    {
        _year:
        {
            value:2017
        },

        edition:
        {
            value:1
        },

        year:
        {
            get(){return this._year;},
            set(newValue)
            {
                if(newValue>2017)
                {
                    this._year=newValue; //_year是只读的(writable:false)
                    this.edition+=newValue-2017;
                }
            }
        }
    }
) */

console.log(book._year);
book.year=2018;
console.log(book._year);
console.log(book.year);
console.log(book.edition);


//合并对象
let dest = {};
let result = Object.assign(dest,{a:"foo"},{b:"bar"});
console.log(result);

dest={
    set a(val)
    {
        console.log(`Invoked dest setter with param ${val}`);
    }
}
let src={
    get a()
    {
        console.log(`Invoked src getter`);
        return "foo";
    }
}
Object.assign(dest,src);
console.log(dest);

//方法的定义
function Method()
{
    let person = 
    {
        //person的sayname方法，需引用一个匿名函数表达式
        /* sayname: function(name)
        {
            console.log(`My name is ${name}`);
        } */

        //简写方法名
        sayname(name)
        {
            console.log(`My name is ${name}`);
        }
    }

    person.sayname("Matt");
}
Method();

//对象解构
function destructure()
{
    let person = {
        name: "matt",
        age: 27
    }

    /* let personName = person.name;
    let personAge = person.age;
    console.log(personName);
    console.log(personAge); */

    //使用解构语法
    /* let {name:personName, age:personAge} = person;
    console.log(personName);
    console.log(personAge); */
    //或
    let {name,age}=person;
    console.log(name);
    console.log(age);

    //解构给事先声明的变量
    /* let personName, personAge;
    ({name:personName, age:personAge} = person); //必须加括号
    console.log(personName,personAge); */
}
destructure();

//创建对象
function CreateObject()
{
    function Person(){}
    console.log(typeof Person.prototype);
    console.log(Person.prototype);
}
CreateObject();

//类
function Class()
{
    class Person
    {
        constructor(name)
        {
            console.log(arguments.length);
            this.name = name || null;
        }
    }

    let p1 = new Person;
    console.log(p1.name);

    let p3 = new Person("Jake");
    console.log(p3.name);
}
Class();

//原型方法
function InstanceMethod()
{
    class Person
    {
        locate()
        {
            console.log("prototypeMethod");
        }
    }

    let p = new Person();
    p.locate();
    Person.prototype.locate();
}
InstanceMethod();

//原型方法和实例方法
function InstanceAndPrototype()
{
    class Person
    {
        constructor()
        {
            this.locate=()=>console.log("instance"); //instance
        }

        locate()
        {
            console.log("prototype"); //prototype
        }
    }

    let p = new Person();
    p.locate(); //instance
    Person.prototype.locate(); //prototype
}
InstanceAndPrototype();