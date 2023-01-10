function sleep(ms)
{
    let start = Date.now();
    let end = start+ms;
    while(true)
    {
        if(Date.now()>end)
        {
            return;
        }
    }
}

function AsyncStart()
{
    async function foo()
    {
        console.log(1);
        //setTimeout(console.log,500,"异步?")
        let p = new Promise((resolve,reject)=>setTimeout(resolve,1000,"异步"));
        console.log(await p);
        return 3; 
    }
    //foo()的返回值会被Promise.resolve()包装为一个任务对象(Promise)
    foo().then(console.log);
    sleep(2000);
    console.log(2);

    //执行顺序
    //1
    //->两秒后
    //2
    //异步
    //3
}
//AsyncStart();

function Sleep()
{
    function sleep(delay)
    {
        return new Promise((resolve)=>setTimeout(resolve,delay));
    }

    async function foo()
    {
        const t0 = Date.now();
        console.log(t0);
        await sleep(1500);
        console.log(Date.now()-t0);
    }

    foo();
}
//Sleep();

function ParallelExpedite()
{
    function randomDelay(id)
    {
        const delay = Math.random()*1000;
        return new Promise((resolve)=>setTimeout(()=>{
            console.log(`${id} delay ${delay}ms, finished`);
            resolve(id);
        },delay));
    }
    
    async function foo()
    {
        const t0 = Date.now();
        await randomDelay(0);
        await randomDelay(1);
        await randomDelay(2);
        await randomDelay(3);
        await randomDelay(4);
        console.log(`${Date.now()-t0}ms elapsed`);
    }
    //foo();

    async function foo2()
    {
        const t0 = Date.now();
        const promises = Array(5).fill(null).map((_,i)=>randomDelay(i));
        for(const p of promises)
        {
            console.log(`awaited ${await p}`);
        }

        console.log(`${Date.now()-t0}ms elapsed`);
    }
    foo2();
}
//ParallelExpedite();

function StackTrack()
{
    function fooPromiseExecutor(resolve,reject)
    {
        setTimeout(reject,1000,"bar");
    }

    function foo()
    {
        new Promise(fooPromiseExecutor);
    }

    foo();
}
StackTrack();