function test1()
{
    console.log(!null); //true
    console.log(!undefined); //true
    console.log(!NaN); //true
}
//test1();

function test2()
{
    console.log(navigator.userAgent);
    //修改用户代理
    navigator.__defineGetter__("userAgent",()=>"foobar");
    console.log(navigator.userAgent);
}
test2();