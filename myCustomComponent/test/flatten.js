
function flatten(arr) {
    let flattenArr = [];
    for(let i=0;i<arr.length;i++) {
     const item = arr[i];
     if(Array.isArray(item)) {
         flattenArr=flattenArr.concat(flattenArr(item))
     }else {
         if(flattenArr.indexOf(item)>-1) continue;
         flattenArr.push(item)
     }
    }
    return flattenArr.sort((a,b)=>a-b)
}