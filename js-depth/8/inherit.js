"use strict"

function Inherit_Base()
{
    class Vehicle
    {
        constructor()
        {
            this.hasEngine =true;
        }

        identifyPrototype(id)
        {
            console.log(id,this);
        }

        static identifyClass(id)
        {
            console.log(id,this);
        }
    }

    class Bus extends Vehicle
    {
        constructor()
        {
            super();
            console.log(this instanceof Vehicle);
            console.log(this);
        }

        static identifyClass(id)
        {
            super.identifyClass(id,this);
        }
    }

    let b = new Bus();
    Bus.identifyClass("bus");
}
//Inherit_Base();

//模拟抽象基类
function AbstractBase()
{
    class Vehicle
    {
        constructor()
        {
            //console.log(new.target);
            if(new.target === Vehicle)
            {
                throw new Error("Vihicle cannot be directly instantiated");
            }

            if(!this.foo)
            {
                throw new Error(this+" Inheriting class must define foo()");
            }
        }
    }

    class Bus extends Vehicle 
    {
        foo(){}
    }

    class Van extends Vehicle
    {
        constructor()
        {
            super();
            this.foo="foo";
        }
    }

    new Bus();
    //new Vehicle();
    //new Van();
}
AbstractBase();


//如果派生类显式定义了构造器，
//则要么必须在其中调用super(),
//要么必须在其中返回一个对象
function Something()
{
    class Vehicle{}
    
    class Car extends Vehicle{}

    class Bus extends Vehicle
    {
        constructor()
        {
            super();
        }
    }

    class Van extends Vehicle
    {
        constructor()
        {
            return {};
        }
    }

    console.log(new Car());
    console.log(new Bus());
    console.log(new Van());
}
//Something();