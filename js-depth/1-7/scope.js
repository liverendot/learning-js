function add(num1,num2)
{
    sum = num1+num2;
    return sum;
}

let result = add(10,20);
/*
 * add函数之行为sum变量能被函数外访问到
 * 因为如果变量未经声明就被初始化,那么
 * 它就会被自动添加到全局上下文(全局变量)
*/
console.log(sum);

console.log(name)
var name