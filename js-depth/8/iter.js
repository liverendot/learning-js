//用生成器创建迭代器方法
function IteratorMethod()
{
    class Person
    {
        constructor()
        {
            this.nicknames=["Jack","Jake","J-Dog"];
        }

        info()
        {
            console.log(`nicknames.entries : ${this.nicknames.entries()}`);
        }

        //在原型上定义生成器
        *createNicknameIterator()
        {
            yield "jack";
            yield "Jake";
            yield "J-dog";
        }

        //在类上定义生成器
        static *createJobIterator()
        {
            yield "Butcher";
            yield "Baker";
            yield "Candlestick maker";
        }

        //用原型的生成器创建类默认的迭代器
        /* *[Symbol.iterator]()
        {
            //这里的*表示迭代一个迭代器（课本197-198页)
            //然后依次yield给生成器 
            yield *this.createNicknameIterator();
        } */

        /* *[Symbol.iterator]()
        {
            //与上面用*迭代可迭代对象的语法完全相同
            for(let nickname of this.createNicknameIterator())
            {
                yield nickname;
            }
        } */

        //原理相同，迭代可迭代对象
        *[Symbol.iterator]()
        {
            yield * [1,2,3,4];
            //等价于
            /* for(const x of [1,2,3,4])
            {
                yield x;
            } */
        }

        /* *[Symbol.iterator]()
        {
            yield *this.nicknames.entries();
        } */

        /* *[Symbol.iterator]()
        {
            for(let nickname of this.nicknames.entries())
            {
                yield nickname;
            }
        } */

        /* [Symbol.iterator]()
        {
            return this.createNicknameIterator();
        } */
    }
    
    /* let jobIter = Person.createJobIterator(); //静态方法
    console.log(jobIter.next().value);
    console.log(jobIter.next().value);
    console.log(jobIter.next().value); */

    let p = new Person();
    p.info();
    for(let name of p)
    {
        console.log(name);
    }
}
IteratorMethod();

//迭代器演示
function IteratorDemo()
{
    let arr=["foo","bar"];
    console.log(arr[Symbol.iterator]);
    let iter = arr[Symbol.iterator]();
    console.log(iter);
    console.log(iter.next());
    console.log(iter.next());
    console.log(iter.next());

    class Foo
    {
        [Symbol.iterator]()
        {
            return {
                next(){
                    return {done:false, value:'foo'};
                }
            }
        }
    }

    let f = new Foo();
    console.log(f[Symbol.iterator]);
    console.log(f[Symbol.iterator]());
}
//IteratorDemo();

//自定义迭代器
function CustomIterator()
{
    class Counter
    {
        constructor(limit)
        {
            this.count=1;
            this.limit=limit;
        }

        next()
        {
            if(this.count<=this.limit)
            {
                return {done:false, value:this.count++};
            }
            else
            {
                return {done:true, value:undefined};
            }
        }
        
        [Symbol.iterator]()
        {
            return this;
        }
    }

    let counter = new Counter(3);

    console.log(counter[Symbol.iterator]());

    for(let i of counter)
    {
        console.log(i);
    }
}
//CustomIterator();


//生成器
function GeneratorFunction()
{
    function * generatorFn(){
        yield 1;
        yield 2;
        yield 3;
    }
    
    console.log(generatorFn());
}
//GeneratorFunction();

//生成器和迭代器
function IteratorAndGenerator()
{
    //迭代器
    str = "abcd";
    let str_iter = str[Symbol.iterator](); //取得字符串的迭代器
    console.log(str_iter.next());
    console.log(str_iter.next());
    console.log(str_iter.next());
    console.log(str_iter.next()); //{value: 'd', done: false}
    console.log(str_iter.next()); //{value: undefined, done: true}

    //用生成器创建自定义的迭代器
    function * generatorFn()
    {
        yield 1;
        yield 2;
        yield 3;
    }

    let g_iter = generatorFn();
    console.log(g_iter.next());
    console.log(g_iter.next());
    console.log(g_iter.next());
    console.log(g_iter.next());
}
//IteratorAndGenerator();