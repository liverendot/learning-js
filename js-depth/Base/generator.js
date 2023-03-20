function WhatIsGenerator()
{
    function * generatorFn()
    {}

    //调用生成器,生成器返回Generator对象,
    //这个对象同时实现了Iterator接口和Iterable接口
    let generatorObject = generatorFn();
    console.log(generatorObject);
    console.log(generatorObject[Symbol.iterator]);
    console.log(generatorObject === generatorObject[Symbol.iterator]());

    //可以像迭代器一样使用生成器
    console.log(generatorObject.next());
}
//WhatIsGenerator();

function GeneratorAndIterator()
{
    /**
     * 生成器返回同时实现Iterable接口和Iterator接口的生成器对象
     * 1 实现了Iterator的next()方法,使得生成器对象像迭代器对象一样
     *      可被迭代
     * 2 实现了Iterable接口的[Symbol.iterator]()方法,这个方法返回
     *      一个迭代器,这个迭代器指向生成器自身,因为生成器自身实现了
     *      Iterator接口,自身就是可迭代的对象
     */
    function * generatorFn()
    {
        yield "foo";
        yield "bar";
    }
    let generatorObject = generatorFn();
    console.log(generatorObject); //Generator对象
    console.log(generatorObject[Symbol.iterator]()); //Generator对象
}
GeneratorAndIterator();

//生成器的返回值
function ValueOfGenerator()
{
    function * generatorFn()
    {
        console.log("foobar");
        return "foo";
        return "bar";
    }
    
    let generatorObject = generatorFn();
    console.log(generatorObject.next());
    console.log(generatorObject.next());
}
//ValueOfGenerator();

//使用yield实现输入输出
function YieldIO()
{
    function * generatorFn(initial)
    {
        console.log(initial);
    }

    let generatorObject = generatorFn("foo");
    console.log(generatorObject);
    console.log(generatorObject.next());
}
//YieldIO();