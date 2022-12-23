let a=6;
let b=9;

function simpleTag(strings, aValExpression, bValExpression, sumExpression)
{
    console.log(strings);
    console.log(aValExpression);
    console.log(bValExpression);
    console.log(sumExpression);

    return `${aValExpression} ${strings[1]} ${bValExpression} ${strings[2]} ${sumExpression}`;
}

let untaggedResult = `${a} + ${b} = ${a+b}`;
let taggedResult = simpleTag`${a} + ${b} = ${a+b}`;

console.log(untaggedResult);
console.log(taggedResult);