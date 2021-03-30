function convert(obj) {
    return Array.from({length:12}).map((item,index)=> obj[index]||null).slice(1)
}

var obj = {1:222,2:123,5:888}

function transferStr(str) {
    let convertStr="";
    for(let i=0;i<str.length;i++) {
        const code = str.charCodeAt(i);
        if(code>=97) {
            convertStr +=String.fromCharCode(code - 32);
        } else {
            convertStr +=String.fromCharCode(code + 32);
        }
        return convertStr;
    }
}