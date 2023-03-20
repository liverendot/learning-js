//工厂模式
function FactoryModel()
{
    function createPerson(name,age,job)
    {
        let o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;

        o.sayName = function(){
            console.log(this.name);
        };

        //工厂模式返回的对象都是Object的对象,
        //我们无法区分不同对象的类型
        return o;
    }

    let person1 = createPerson("Nicholas",29,"Software Engineer");
    let person2 = createPerson("Greg",27,"Doctor");

    console.log(`person1: ${person1.name}, ${person1.age}, ${person1.job}`);
    console.log(`person2: ${person2.name}, ${person2.age}, ${person2.job}`);;
}
//FactoryModel();

//构造函数模式
function ConstructorModel()
{
    function Person(name,age,job)
    {
        this.name = name;
        this.age = age;
        this.job = job;

        this.sayName=function(){
            console.log(this.name);
        };
    }

    let person1 = new Person("Nicholas",29,"Software Engineer");
    let person2 = new Person("Greg",27,"Doctor");

    person1.sayName();
    person2.sayName();
}
//ConstructorModel();

//谁是函数的调用者,详细解释见CreateObject.html文件
function WhoIsCaller()
{
    function Person()
    {
        console.log("this points to : ",this);
        this.name = "Jake";
        this.sayName = function(){
            console.log(this.name);
        };

        this.thisEquals = function(t){
            console.log(this===t);
        };
    }

    /* //new 在对象中创建了一个对象,并使用Person作为这个对象的类型名
    //然后这个对象调用了Person函数,并将自己作为this指针传入了函数
    //并将对象内部的[[Prootype]]特性赋值为Person的prototype属性
    //因此Person内的指针this指向这个新对象
    let person = new Person("Nicholas",29,"Software Engineer");
    person.sayName();
    person.thisEquals(person); //true

    let obj = new Object();
    //obj对象调用了Person函数
    //Person函数的this指向了obj对象
    Person.call(obj,"Kristen",25,"Nurse");
    obj.sayName();
    obj.thisEquals(obj); //true

    //没有人调用Person,默认由Global对象调用,
    //Global对象在html中即是window对象
    //因此此时Person中的this指向global对象
    //Person中的this.name,this.sayName中自然也就把属性添加给了
    //global对象
    Person();
    //window.name = "window";
    //window.sayName(); */

    console.log(Person instanceof Object);
}
WhoIsCaller();