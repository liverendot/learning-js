const buf = new ArrayBuffer(4);
const view = new DataView(buf);

console.log(view.getInt8(0));
console.log(view.getInt8(1));
console.log(view.getInt16(0));

view.setUint32(0,0x9bbba4d7);
const highest = view.getUint8(0);
console.log(`h: ${highest} , binary: ${highest.toString(2)}`);
const high=view.getUint8(1);
console.log(`h: ${high} , binary: ${high.toString(2)}`);
const low = view.getUint8(2);
console.log(`l: ${low} , binary: ${low.toString(2)}`);
const lowest = view.getUint8(3);
console.log(`l: ${lowest} , binary: ${lowest.toString(2)}`);