function test()
{
    console.log("barfoobaz".split("foo"));
    console.log(["bar","baz","third"].join(" qux "));
}
//test();


function SymbolInObject()
{
    let s1=Symbol("foo");
    let s2=Symbol("bar");

    let o = 
    {
        [s1] : "foo val",
        [s2] : "bar val",
        baz : "baz val",
        qux : "qux val"
    };

    console.log("Object.getOwnPropertySymbols:")
    console.log(Object.getOwnPropertySymbols(o));
    console.log("Object.getOwnPropertyNames:")
    console.log(Object.getOwnPropertyNames(o));
    console.log("Object.getOwnPropertyDescriptors:")
    console.log(Object.getOwnPropertyDescriptors(o));
    console.log("Reflect.ownKeys:")
    console.log(Reflect.ownKeys(o));
}
//SymbolInObject();


///Symbol.asyncIterator
class Emitter
{
    constructor(max)
    {
        this.max=max;
        this.asyncIdx=0;
    }

    async *[Symbol.asyncIterator]()
    {
        while(this.asyncIdx<this.max)
        {
            yield new Promise(
                (resolve) => resolve(this.asyncIdx++)
            );
        }
    }
}

async function asyncCount()
{
    let emitter = new Emitter(5);
    for await(const x of emitter)
    {
        console.log(x);
    }
}
//asyncCount();


///Symbol.hasInstance
function instanceof_()
{
    class Bar{}
    class Baz extends Bar
    {
        static [Symbol.hasInstance]()
        {
            return false;
        }
    }

    let b = new Baz();
    console.log(Bar[Symbol.hasInstance](b));
    console.log(b instanceof Bar);
    console.log(Baz[Symbol.hasInstance](b));
    console.log(b instanceof Baz);
}
//instanceof_();


///Symbol.iterator
function iterator_count()
{
    class EmitterIterator
    {
        constructor(max)
        {
            this.max = max;
            this.idx = 0;
        }

        *[Symbol.iterator]()
        {
            while(this.idx<this.max)
            {
                yield this.idx++;
            }
        }
    }

    let emitter = new EmitterIterator(5);
    for(const x of emitter)
    {
        console.log(x);
    }
}
//iterator_count();


///Symbol.toPrimitive
function toPrimitive_()
{
    class Foo{}
    let foo = new Foo();    
    console.log(3+foo);
    console.log(3-foo);
    console.log(String(foo));

    class Bar
    {
        constructor()
        {
            this[Symbol.toPrimitive] = function(hint)
            {
                switch(hint)
                {
                    case "number":
                        return 3;
                    case "string":
                        return "string bar";
                    case "default":
                    default:
                        return "default bar";
                }
            }
        }
    }

    let bar = new Bar();
    console.log(3+bar);
    console.log(3-bar);
    console.log(String(bar));
}
//toPrimitive_();

function operators()
{
    let age=29;
    let anotherAge = age-- + 2
    console.log(age);
    console.log(anotherAge);
}
operators();