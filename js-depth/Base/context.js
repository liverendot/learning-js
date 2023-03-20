let color = "blue";

function changeColor()
{
    console.log(arguments);
    console.log(arguments.callee);
    //console.log(location);
    if(color==="blue")
    {
        color="red";
    }
    else
    {
        color="blue";
    }
}
//changeColor();

function fn1()
{
    console.log(name);
    console.log(global);
    var name = "Jake";
}
fn1();