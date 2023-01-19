function message(message)
{
    //新建消息盒子节点
    let msgDiv = document.createElement("div");
    msgDiv.className = "msg";
    let textNode = document.createTextNode(`${message}`);
    msgDiv.appendChild(textNode);
    document.body.appendChild(msgDiv);
}
