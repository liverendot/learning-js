
function fn_lambda()
{
    let value = {};
    let setName = (x) => x.name="matt";
    setName(value);
    console.log(value.name);
}
//fn_lambda();

function fn_arguments()
{
    function howManyArgs()
    {
        console.log(arguments.length);
    }

    howManyArgs("string",45);
    howManyArgs();
    howManyArgs(12);

    console.log("2"==2);
    console.log("2"===2);
}
//fn_arguments();

function fn_this()
{
    window.color = "red";
    let o = {
        color:"blue"
    };

    function sayColor()
    {
        console.log(this.color);
    }

    sayColor();

    o.sayColor = sayColor;
    o.sayColor();


    function Queen()
    {
        this.royaltyName = "Elizabeth";
        console.log(this);

        setTimeout(function(){console.log(this);console.log(this.royaltyName);},1000);
    }
    //Queen();
    new Queen();
}
//fn_this();

function fn_apply()
{
    window.color = "red";
    let o = {
        color:"blue"
    };

    function sayColor()
    {
       console.log(this.color);
    }

    sayColor();
    sayColor.call(this);
    sayColor.call(window);
    sayColor.call(o);
}
//fn_apply();

function fn_recursion()
{
    let factorial = function f(num){
        if(num<=1)
        {
            return 1;
        }
        else
        {
            return num*f(num-1);
        }
    };

    let anotherFactorial = factorial;
    factorial = null;
    console.log(anotherFactorial(4));
}
//fn_recursion();

function fn_closure_this()
{
    //console.log(this); //如果使用严格模式"use strict" 则this为undefined
    window.identity = "The Window";

    let object = {
        identity:"My Object",
        getIdentityFunc()
        {
            console.log(this.identity);
            /* return function(){
                return this.identity;
            }; */
            let that = this;
            return function(){
                return that.identity;
            }
        },

        getIdentify : function(){
            return this.identity;
        }
    };

    //console.log(object.getIdentityFunc()());
    console.log(object.getIdentify());
    console.log((object.getIdentify = object.getIdentify)());
}
//fn_closure_this();

//立即调用
function fn_iife()
{
    let iife = function(){
        let name = "name";
        console.log(name);
        return `name:${"matt"}`;
    }();
    
    console.log(iife);
}
fn_iife();

function fn_private()
{
    function MyObject()
    {
        let privateVariable = 10;

        function privateFunction()
        {
            return false;
        }

        this.publicMethod = function()
        {
            privateVariable++;
            return privateFunction();
        };

        this.publicFunction = privateFunction;
    }

    let myObject = new MyObject();
    console.log(myObject.privateVariable);
    console.log(myObject.publicMethod());
    console.log(myObject.publicFunction());

    function Person(name)
    {
        let age=0;

        this.getName = function(){
            return name;
        };

        this.setName = function(value){
            name = value;
        }

        this.getAge = function(){
            return age;
        };

        this.setAge = function(value){
            age = value;
        }
    }

    let person1 = new Person("nicholas");
    console.log(person1.name);
    console.log(person1.age);
    person1.age=33;
    console.log(person1.age);
    
}
//fn_private();

function fn_static()
{
    function Person(name)
    {
        this.getName = function()
        {
            return name;
        };

        this.setName = function(value)
        {
            name = value;
        };
    }

    //static
    /* (function(){
        let name = "";

        Person = function(value)
        {
            name = value;
        };

        Person.prototype.getName = function()
        {
            return name;
        };

        Person.prototype.setName = function(value)
        {
            name = value;
        };
    })(); */

    let person1 = new Person("Nicholas");
    console.log(person1.getName());
    person1.setName("Matt");
    console.log(person1.getName());

    let person2 = new Person("Michael");
    console.log(person1.getName());
    console.log(person2.getName());
}
//fn_static();