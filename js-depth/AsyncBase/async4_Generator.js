function demo1()
{
    const fs = require("fs");

    const readFile = function(fileName){
        return new Promise(function(resolve,reject){
            fs.readFile(fileName,function(error,data){
                if(error) return reject(error);
                resolve(data);
            });
        });
    };

    const gen = function* (){
        const f1 = yield readFile("numbers.txt");
        const f2 = yield readFile("hello.txt");
        console.log(f1.toString());
        console.log(f2.toString());
    };

    let g = gen();
    let f1 = g.next();
    //console.log(f1);
    f1.value.then((value,err)=>{console.log(value);});
    /* console.log(g.next(0));
    console.log(g.next(1));
    console.log(g.next(2)); */
}
//demo1();

function demo2()
{
    function timeout(ms)
    {
        return new Promise((resolve)=>{setTimeout(resolve,ms);});
    }

    async function asyncPrint(value,ms)
    {
        await timeout(ms);
        console.log(value);
    }

    asyncPrint("Hello wold",50);
}
//demo2();

//3 语法
function demo3()
{
    /**
     * async函数返回一个 Promise 对象。
     * async函数内部return语句返回的值，会成为then方法回调函数的参数
     */
    async function f()
    {
        return "Hello JavaScript";
    }
    f().then(v=>console.log(v));
}
//demo3();

function demo4()
{
    function idMaker()
    {
        let index = 0;
        return {
            next:function(){
                return {
                    value: new Promise(resolve=>setTimeout(()=>resolve(index++),1000)),
                    done: false
                };
            }
        };
    }

    id = idMaker();
    id.next().value.then(o=>console.log(o));
    id.next().value.then(o=>console.log(o));
}
//demo4();

function demo5()
{
    test = [
        new Promise(res=>setTimeout(res,1000,1)),
        new Promise(res=>setTimeout(res,1000,2)),
        new Promise(res=>setTimeout(res,1000,3)),
        new Promise(res=>setTimeout(res,1000,4)),
        new Promise(res=>setTimeout(res,1000,5))
    ];

    for await(const v of test)
    {
        console.log(v);
    }
}
demo5();