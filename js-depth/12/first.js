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

function Promise_()
{
    let start = new Date(Date.now());

    //setTimeout的等待时间是和主线任务同时运行(异步)的
    let p1 = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            sleep(2000);
            let stop = new Date(Date.now());
            console.log(`in promise : ${stop-start}`);
        },2000);
        //console.log("in promise");
        resolve("p1");
    });

    //2 执行异步任务
    //3 看异步任务是否完成,输出结果
    p1.then(console.log);

    //1 先执行主线任务 (3s)
    console.log("Main......");
    sleep(1000);
    //这里也是主线任务
    let stop = new Date(Date.now());
    console.log(`Main: ${stop-start}`);
}
//Promise_();

function IntervalNumber()
{
    let num = 0, intervalId = null;
    let max = 10;

    let incrementNumber = function(){
        num++;
        console.log(new Date(Date.now()));
        if(num==max)
        {
            clearInterval(intervalId);
            console.log("Done");
        }
    }
    intervalId = setInterval(incrementNumber,500);

    //如果主线程有任务在执行
    console.log("主线程正在执行5s");
    sleep(5000);
}
//IntervalNumber();

function SetTimeoutNumber()
{
    let num=0;
    let max=10;

    let incrementnumber = function()
    {
        num++;

        if(num<max)
        {
            console.log(new Date(Date.now()));
            setTimeout(incrementnumber,200);
        }
        else
        {
            console.log("done");
        }  
    }

    incrementnumber();
}
//SetTimeoutNumber();

function bom_location()
{
    console.log("hash: ",location.hash);
    console.log("host: ",location.host);
    console.log("hostname: ",location.hostname);
    console.log("href: ",location.href);
    console.log("pathname: ",location.pathname);
    console.log("port: ",location.port);
    console.log("protocal: ",location.protocol);
    console.log("search: ",location.search);
    console.log("username: ",location.username);
    console.log("password: ",location.password);
    console.log("origin: ",location.origin);
}
bom_location();