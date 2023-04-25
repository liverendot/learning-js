function atomics1()
{
    let sharedArrayBuffer = new SharedArrayBuffer(2);
    let typedArray = new Uint8Array(sharedArrayBuffer);
    console.log(typedArray);

    const index = 0;
    const increment = 5;
    Atomics.add(typedArray,index,increment);
    console.log(typedArray);
}
atomics1();

