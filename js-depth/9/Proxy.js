
function ProxyDemo1()
{
    const target={
        id: "target"
    };
    
    const handler = {};
    
    const proxy = new Proxy(target,handler);
    
    console.log(target.id);
    console.log(proxy.id);


}
//ProxyDemo1();

function ProxyDemo2()
{
    const target = {
        foo:"bar"
    };

    const handler = {
        get(trapTarget,property,receiver)
        {
            console.log(trapTarget===target);
            console.log(property);
            console.log(receiver===proxy);
        }
    };

    const proxy = new Proxy(target,handler);
    proxy.foo;
}
//ProxyDemo2();

function ProxyDemo3()
{
    const target = {
        foo:"bar",
        baz:"qux"
    };

    const handler = {
        get(trapTarget,property,receiver)
        {
            let decoration = "";
            if(property==="foo")
            {
                decoration="!!!";
            }
            return Reflect.get(...arguments)+decoration;
        }
    };

    const proxy = new Proxy(target,handler);
    console.log(proxy.foo);
    console.log(target.foo);
    console.log(proxy.baz);
}
//ProxyDemo3();

function ProxyDemo4()
{
    const target = {};
    Object.defineProperty(target,"foo",{
        configurable:false,
        writable:false,
        value:"bar"
    });

    const handler = {
        get(){
            return "qux";
        }
    };

    const proxy = new Proxy(target,handler);
    console.log(proxy.foo); //TypeError property 'foo' is a read-only and non-configurable data
}
//ProxyDemo4();

//代理隐藏属性
function hiddenPropertiesByProxy()
{
    const hiddenProperties = ["foo","bar"]; //要隐藏的属性
    const targetObject = {
        foo:1,
        bar:2,
        baz:3
    };
    const proxy = new Proxy(targetObject,{
        get(target,property)
        {
            if(hiddenProperties.includes(property))
            {
                return undefined;
            }
            else
            {
                return Reflect.get(...arguments);
            }
        },
        has(target,property)
        {
            if(hiddenProperties.includes(property))
            {
                return false;
            }
            else
            {
                return Reflect.has(...arguments);
            }
        }
    });

    console.log(proxy.foo);
    console.log(proxy.bar);
    console.log(proxy.baz);

    console.log("foo" in proxy);
    console.log("bar" in proxy);
    console.log("baz" in proxy);
}
//hiddenPropertiesByProxy();

//可观察的对象
function Observable()
{
    const userList = [];

    class User
    {
        constructor(name)
        {
            this.name_ = name;
        }
    }

    const proxy = new Proxy(User,{
        construct(){
            const newUser = Reflect.construct(...arguments);
            userList.push(newUser);
            return newUser;
        }
    });

    new proxy("John");
    new proxy("Jacob");
    new proxy("Jingleheimerschmidt");

    console.log(userList);
}
Observable();