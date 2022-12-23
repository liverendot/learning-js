
//方法 实例方法 原型方法 静态方法 
function ClassMethod()
{
    const symbolKey = Symbol("symbolKey");

    class Person
    {
        constructor()
        {
            this.name = new String("Jack");
            this.sayName = () => console.log(this.name);
            this.nicknames = ["Jake","J-Dog"];
            this.locate = () => console.log("instance",this); //实例方法
        }

        locate()
        {
            console.log("protorype",this); //原型方法
        }

        //类方法(这里以原型方法为例)等同于对象属性，甚至可以使用符号或计算的值作为方法名
        [symbolKey]()
        {
            console.log("invoked symbolKey");
        }

        ["computed"+"Key"]()
        {
            console.log("invoked computedKey");
        }

        //静态方法
        static locate()
        {
            console.log("class",this);
        }
    }

    let p = new Person();
    p.locate();
    Person.prototype.locate();
    p[symbolKey](); //没找到实例方法，则寻找原型方法
    Person.prototype.computedKey();
    Person.locate();
}
//ClassMethod();


//实例工厂类模拟 ， static
function ClassFactory()
{
    class Person
    {
        constructor(age)
        {
            this.age_ = age;
        }

        sayAge()
        {
            console.log(this.age_);
        }

        static create()
        {
            return new Person(Math.floor(Math.random()*100));
        }
    }

    console.log(Person.create());
    let p = new Person(28);
    p.sayAge();
    Person.prototype.sayAge()
}
//ClassFactory();

//继承的静态方法
function StaticMethod()
{
    class Vehicle
    {
        static identify()
        {
            console.log("vehicle");
        }
    }

    class Bus extends Vehicle
    {
        static identify()
        {
            super.identify();
            console.log("bus");
        }
    }

    Bus.identify();
};
StaticMethod();
