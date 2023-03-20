//获取迭代器
function getIterator()
{
    let arr=["foo","bar"];
    //使用内置符号Symbol.iterator属性获取迭代器
    let iter = arr[Symbol.iterator](); //返回一个迭代器对象
    console.log(iter);
    /* console.log(iter.next());
    console.log(iter.next());
    console.log(iter.next()); */

    //while
    /* let result=iter.next();
    while(!result.done)
    {
        console.log(result.value);
        result = iter.next();
    } */

    //do while
    let result=null;
    do
    {
        result = iter.next();
        if(result.value)
        {
            console.log(result.value);
        }
    }while(!result.done);

}
//getIterator();

//自定义迭代器与可迭代对象
function MyIterator()
{
    class Counter
    {
        constructor(limit)
        {
            this.count=1;
            this.limit=limit;
        }

        //实现Iterator接口的next()方法
        next()
        {
            if(this.count<=this.limit)
            {
                return {done:false,value:this.count++};
            }
            else
            {
                return {done:true,value:undefined}
            }
        }

        //实现Iterable接口的[Symbol.iterator]()方法,返回实现了Iterator接口的迭代器对象
        //this(此对象)实现了Iterator接口的next()方法,本身就是一个迭代器
        //所以[Symbol.iterator]()方法返回自身,也就是自引用的,这和
        //生成器原理十分相似
        [Symbol.iterator]()
        {
            return this;
        }
    }

    let counter = new Counter(3);

    for(let i of counter)
    {
        console.log(i);
    }
    
    //不能再次被迭代,因为返回是对象,对象是有状态的
    /*与c#的区别
        在c#中迭代器之所以能再次迭代,因为c#要求迭代器有一个Reset()方法
        用来还原迭代器的状态, foreach语句在迭代完成后自动调用了这个
        方法,还原了迭代器最初的状态
    */
    for(let i of counter)
    {
        console.log(i);
    }
}
MyIterator();

function MyIterator2()
{
    class Counter
    {
        constructor(limit)
        {
            this.limit = limit;
        }

        //实现Iterable接口, 返回一个实现了Iterator接口的迭代器对象
        //为for of 语句提供支持
        [Symbol.iterator]()
        {
            let count=1, limit=this.limit; //每次被迭代时都重置状态
            
            //返回实现Iterator接口的迭代器对象
            return {
                //属性1
                //实现Iterable接口
                next()
                {
                    if(count<=limit)
                    {
                        return {done:false,value:count++};
                    }
                    else
                    {
                        return {done:true,value:undefined};
                    }
                },

                //属性2
                //可选的return()方法,这个方法会在迭代器被提前停止迭代时调用
                return()
                {
                    console.log("Exiting early");
                    return {done:true};
                }
            }
        }
    }

    let counter = new Counter(3);
    //console.log(counter[Symbol.iterator]);
    //console.log(counter[Symbol.iterator]().next());
    
    for(let i of counter){console.log(i);}
    for(let i of counter){console.log(i);}

    let counter1 = new Counter(5);
    for(let i of counter1)
    {
        if(i>2)
        {
            break; //提前终止迭代
        }
        console.log(i);
    }
}
//MyIterator2();