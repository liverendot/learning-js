
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
{}
async_back_fail();