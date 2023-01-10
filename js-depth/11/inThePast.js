
//异步返回值
function async_back()
{
    function double(value,callback) //callback是一个函数指针
    {
        //这句标明callback指向一个带有一个参数的函数
        setTimeout(()=>callback(value*2),1000)
    }

    //double函数的第二个参数,传入带有一个参数的lambda函数
    double(3,(x)=>console.log(`I was given: ${x}`));
}
//async_back();

//失败处理
function async_back_fail()
{
    function double(value,success,failure)
    {
        setTimeout(()=>{
            try
            {
                if(typeof value !== 'number')
                {
                    throw "Must provide number as first argument";
                }
                success(2*value);
            }
            catch(e)
            {
                failure(e);
            }
        },1000);
    }
    
    const successCallback = (x)=>console.log(`Success: ${x}`);
    const failureCallback = (e)=>console.log(`Failure: ${e}`);

    double(3,successCallback,failureCallback);
    double('b',successCallback,failureCallback);
}
//async_back_fail();

function Promise_()
{
    /**
     * Promise就是一个异步的任务对象
     * 可以传入一个执行器作为参数
     * 执行器是一个包含两个参数的函数指针
     * 执行器函数的两个参数也都是一个包含一个参数的函数指针
     * 第一个参数执行后立即将状态设置为fulfilled
     * 第二个参数执行后立即将状态设置为rejected
     * 状态只能被设置一次,后面再设置状态则默认忽略
     * 
     * 执行器函数在任务(期约)中立即执行
     */
    //在任务中执行a函数,状态自动设置为fulfilled
    let p1 = new Promise((a,b)=>a());
    setTimeout(console.log,0,p1);
    //在任务中执行b函数,状态自动设置为rejected, 并抛出异常
    let p2 = new Promise((a,b)=>b());
    setTimeout(console.log,0,p2);

    /**
     * 让执行器函数在任务中推迟执行
     * 使用setTimeout模拟一个耗时1000ms的函数
     */
    let p3 = new Promise((a,b)=>setTimeout(a,1000)); //在任务中延迟1秒执行a函数
    setTimeout(console.log,0,p3); //p3的状态 pending
    setTimeout(console.log,1001,p3); //p3的状态 fulfilled

}
//Promise_();

function Promise_resolve()
{
    let  a = function(value){};
    let p1 = new Promise((a,b) => a(3));
    setTimeout(console.log,0,p1); //Promise {<fulfilled>: 3}

    //相当于使用了Promise对象的执行器的第一个参数指向的函数
    let p2 = Promise.resolve(3);
    setTimeout(console.log,0,p2); //Promise {<fulfilled>: 3}
}
//Promise_resolve();

function Promise_reject()
{
    let p = Promise.reject(3)
    setTimeout(console.log,0,p);
    //只能通过then捕获reject抛出的异常,不能用try...catch
    p.then(null,(e)=>setTimeout(console.log,0,e));
}
//Promise_reject();

function Promise_then()
{
    let p1 = Promise.resolve("foo");
    //console.log(p1);
    //setTimeout(console.log,100,p1);
    let p2 = Promise.reject("Err");

    /*
    let p2 = p1.then();
    //console.log(p1);
    setTimeout(console.log,100,p2);

    let p3 = p2.then();
    //console.log(p3);
    setTimeout(console.log,100,p3);

    let p4 = p3.then(()=>"p4_value");
    //console.log(p4);
    setTimeout(console.log,100,p4);
    */

    /**
     * then需要连个函数指针作参数
     * 这两个函数分别在期约为resolve或reject状态后被调用
     * 这两个函数是回调函数,均需要一个参数,
     * resolve或reject后的值通过这个参数传递给回调函数
     * 如下
     */
    p1.then(console.log); //console.log是一个需要一个参数的函数
    p1.then((value)=>{console.log(value);}); //自定义lambda函数
    p2.then(null,console.log); //同上,reject后执行
    p2.then(null,(value)=>{console.log(value)});

    /**
     * then()函数不仅可以通过回调函数确定上一个期约的值
     * 也可以返回一个值,因为then()本身是返回一个新的期约对象
     * 他会将返回值包装进这个返回的期约对象
     * 如下
     */
    let p3 = Promise.resolve("p3");
    let p4 = p3.then((value)=>{
        console.log(`通过回调函数参数取得的期约p3的值${value}`);
        console.log("这个then()也会返回一个新的期约");
        console.log("并可以将一个返回值包装进这个返回的期约对象中");
        return "return in p4";
    })
    p4.then(console.log);
}
//Promise_then();

function Promise_catch()
{
    let p = Promise.reject(); //相当于返回了一个任务,一个状态为拒绝的任务
    let onRejected = function(e)
    {
        setTimeout(console.log,5,'rejected');
    };
    console.log(p);
    //p.then(null,onRejected); //then相当于任务的后续
    p.catch(onRejected); //== p.then(null,onRejected);

    let p1 = new Promise(()=>{}); //返回一个状态为pending(等待)的任务
    let p2 = p1.catch(); //同上
    //console.log(p1);
    //console.log(p2);
    setTimeout(console.log,0,p1); //0ms后执行console.log函数,参数为p1
    setTimeout(console.log,0,p2);

}
//Promise_catch();

function Promise_finally()
{
    let p1 = Promise.resolve();
    let p2 = Promise.reject();
    //console.log(p1);
    //console.log(p2);
    let onFinally = function(){
        setTimeout(console.log,0,"Finally!");
    }
    p1.finally(onFinally);
    p2.finally(onFinally);
}
//Promise_finally();

function non_reentrancy()
{
    let p = Promise.resolve();
    p.then(()=>console.log("onResolved handler"));
    console.log("Then() returns");
}
//non_reentrancy();

//期约执行顺序
function ExecuteSequence()
{
    let p1=Promise.resolve();
    let p2=Promise.reject();

    p1.then(()=>setTimeout(console.log,0,1));
    p1.then(()=>setTimeout(console.log,0,2));

    p2.then(null,()=>setTimeout(console.log,0,3));
    p2.then(null,()=>setTimeout(console.log,0,4));

    p2.catch(()=>setTimeout(console.log,0,5));
    p2.catch(()=>setTimeout(console.log,0,6));
}
//ExecuteSequence();

//期约连锁
function PromiseChain()
{
    let p1 = new Promise((resolve,reject)=>{
        console.log("p1 executor");
        setTimeout(resolve,1000);
    });

    //执行其他任务
    setTimeout(console.log,2200,"执行其他任务");

    let all = p1.then(()=>new Promise((resolve,reject)=>{
        console.log("p2 executor");
        setTimeout(resolve,1000);
    })).then(()=>new Promise((resolve,reject)=>{
        console.log("p3 executor");
        setTimeout(resolve,1000);
    })).then(()=>new Promise((resolve,reject)=>{
        console.log("p4 executor");
        setTimeout(resolve,1000);
    }));

    all.then(()=>{console.log("全部结束")});
}
//PromiseChain();

//不使用期约的执行链
function ExecuteChain()
{
    function delayedExecute(str,callback=null)
    {
        setTimeout(()=>{
            console.log(str);
            callback&&callback(); //if callback is not null, then execute callback()
        },1000)
    }

    setTimeout(() => {
        console.log("执行其他任务");
    }, 2200);

    delayedExecute("p1 callback",()=>{
        delayedExecute("p2 callback",()=>{
            delayedExecute("p3 callback",()=>{
                delayedExecute("p4 callback");
            });
        });
    });
}
//ExecuteChain();

//查看期约的状态
function PromiseState()
{
    let p1 = new Promise((resolve,reject)=>
    {
        setTimeout(resolve,2000);
    })

    console.log(p1);
}
//PromiseState();