"use strict"

let dest = {};
let src = {};

Object.defineProperty(dest,"a",{
    set(val){
        console.log(`Invoked dest setter with param ${val}`);
    }
});

Object.defineProperty(src,"a",{
    get()
    {
        console.log(`Invoked src getter`);
        return "foo";
    }
});

Object.assign(dest,src);
console.log(dest);