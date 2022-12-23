let obj = new Object("some text");
console.log(typeof obj);
console.log(obj instanceof String);

let value = new Object(25);
console.log(typeof value);
console.log(value instanceof Number);

let value2 = new Number(25);
console.log(typeof value2);
console.log(value2 instanceof Number);