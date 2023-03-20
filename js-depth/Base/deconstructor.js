function deconstructor()
{
    let personName,personAge;

    let person = {
        name : "Matt",
        age:27
    };

    //如果结构到已经定义的变量需要()符号包含解构表达式
    ({name:personName,age:personAge} = person);

    console.log(personName,personAge);
}
//deconstructor();

function nestedDeconstructor()
{
    let person = {
        job:{
            title:"Software engineer"
        }
    };
    //let personCopy = {}; //Error job属性未定义
    let personCopy = {job:{}};

    ({job:{title:personCopy.job.title}}=person);
    console.log(personCopy.job.title);
}
//nestedDeconstructor();

function ArgumentDeconstructor()
{
    let person = {
        name:"Matt",
        age:27
    };

    let human = {
        name:"jack",
        age:20
    };

    function printPerson(foo,{name,age}=person,bar)
    {
        console.log(arguments);
        console.log(name,age);
    }
    printPerson("1st",human,"2nd");

    function printPerson2(foo,{name:personName,age:personAge}=person,bar)
    {
        console.log(arguments);
        console.log(personName,personAge);
    }
    printPerson2("1st",human,"2st");
}
ArgumentDeconstructor();
