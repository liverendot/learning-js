function forin()
{
    for(const propName in window)
    {
        console.log(propName);
    }
}
//forin();

function forof()
{
    for(const element of [1,2,3,4])
    {
        console.log(element);
    }

    for(const element in [2,4,6,8])
    {
        console.log(element);
    }
}
forof();