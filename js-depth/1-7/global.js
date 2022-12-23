var name = "name";
//console.log(Global.name)
console.log(Window.name);

let a1=[1,2,3,4];
let a3=[1,2,3,4];
let a2 = Array.from(a1)
console.log(a2);
a1[2]=6;
console.log(a1);
console.log(a2);
console.log(a1==a2);
console.log(a1==a3);
console.log(a1===a3);