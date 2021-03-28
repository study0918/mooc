function convert(obj) {
    return Array.from({length:12}).map((item,index)=> obj[index]||null).slice(1)
}

var obj = {1:222,2:123,5:888}