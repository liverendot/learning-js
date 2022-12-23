"use strict"

//构造函数模式
function constructorMode()
{
    function Person(name,age,job)
    {
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = function(){
            console.log(this.name);
        };
    }

    let person1 = new Person("Nicholas",29,"Software Engineer");
    let person2 = new Person("Greg",27,"Doctor");

    console.log(person1.constructor);
    console.log(Person);
}
//constructorMode();

//构造函数也是函数
function constructorFn()
{
    function Person(name,age,job)
    {
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = function(){
            console.log(this.name);
        };
    }

    Person("Greg",27,"Doctor"); //像普通函数一样调用(非严格模式下)
    window.sayName(); //this被赋值为Local对象

    //甚至可以在另一个对象的作用域中调用
    let o=new Object();
    Person.call(o,"Kristen",25,"Nurse");
    o.sayName();
}
//constructorFn();

//原型模式
function prototypeMode()
{
    function Person(){}
    Person.prototype.name="Nicholas";
    Person.prototype.age=29;
    Person.prototype.job="Software Engineer";
    Person.prototype.sayName=function()
    {
        console.log(this.name);
    };

    //不同实例可以共享原型中的属性和方法
    let person1 = new Person();
    person1.sayName();
    let person2 = new Person();
    person2.sayName();
    console.log(person1.sayName == person2.sayName);
}
//prototypeMode();

//理解原型
function prototypeMode2()
{
    function Person(){}
    console.log(typeof Person.prototype);
    console.log(Person.prototype);

    //构造函数的prototype属性引用原型对象，
    //原型对象中有一个constructor属性，
    //这个属性又引用了构造函数
    console.log(Person.prototype.constructor === Person);

    //原型对象中还有一个[[Prototype]]属性，
    //可以通过__proto__访问，
    //这个属性引用自从其基类继承的原型对象
    //constructor是新增的一个属性
    console.log(Person.prototype.__proto__);

    let person1 = new Person();
    let person2 = new Person();

    /**
     * 构造函数、原型对象和实例是3个完全不同的对象
     */
    console.log(person1!==Person);
    console.log(person1 !== Person.prototype);
    console.log(Person.prototype !== Person);

    console.log(person1.prototype);
    /**
     * 实例通过__proto__链接到构造函数的原型对象
     */
    console.log(person1.__proto__ === Person.prototype);

    /**
     * 同一个构造函数创建的两个实例共享同一个原型对象
     */
    console.log(person1.__proto__ === person2.__proto__);

    console.log(Object.prototype.isPrototypeOf(Person.prototype));
    console.log(Object.getPrototypeOf(Person.prototype) == Object.prototype);
    Person.prototype.name = "Nicholas";
    console.log(Object.prototype.isPrototypeOf(Person.prototype));
    console.log(Object.getPrototypeOf(Person.prototype) == Object.prototype);
    console.log(Object.prototype.name);
    console.log(Person.prototype.name);

    let biped = { numLegs:2 };
    let person = { name: "Matt" };
    Object.setPrototypeOf(person,biped);
    console.log(`person.__proto__.name: ${person.__proto__.name}`);
    console.log(`person.__proto__.numLegs: ${person.__proto__.numLegs}`);
    //console.log(person.__proto__);
    //console.log(Object.getPrototypeOf(person));

}
//prototypeMode2();

//in操作符
function inOperator()
{
    function Person(){}
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 29;
    Person.prototype.job = "Software Engineer";
    Person.prototype.sayName = function(){
        console.log(this.name);
    };

    let person1 = new Person();
    let person2 = new Person();

    console.log(person1.hasOwnProperty("name")); //false
    console.log("name" in person1); //true

    person1.name = "Greg";
    console.log(person1.name);
    console.log(person1.hasOwnProperty("name")); //true
    console.log("name" in person1) //true
}
//inOperator();

//枚举属性
function enumerateProperties()
{
    function Person(){}
    Person.prototype.name = "Nicholas";
    Person.prototype.age = 29;
    Person.prototype.job = "Software Engineer";
    Person.prototype.sayName = function(){
        console.log(this.name);
    };

    let p1 = new Person();
    p1.name = "Rob";
    p1.age = 31;
    console.log("Object.keys():\n");
    let keys = Object.keys(p1);
    console.log(keys);
    console.log("for-in:\n");
    for(let property in p1)
    {
        console.log(property);
    }

    /**
     * 符号
     */
    let k1=Symbol("k1");
    let k2=Symbol("k2");
    let o = {
        [k1]:"k1",
        [k2]:"k2",
        name :"Nicholas",
        age : 31
    };
    console.log("getOwnPropertySymbols():");
    console.log(Object.getOwnPropertySymbols(o));
    console.log("for-in:");
    //for-in不能枚举符号
    for(let key in o)
    {
        console.log(key);
    }
}
//enumerateProperties();
 
//原型链
function prototypeChain()
{
    function SuperType()
    {
        this.property = true;
    }

    SuperType.prototype.getSuperValue = function(){
        return this.property;
    };

    function SubType()
    {
        this.subproperty = false;
    }

    SubType.prototype = new SuperType();

    SubType.prototype.getSubValue = function()
    {
        return this.subproperty;
    };

    let instance = new SubType();
    console.log(instance.getSuperValue());
}
prototypeChain();