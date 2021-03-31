function decompressRLElist(nums)  {
    let n = nums.length;
    let arr = [];
    for(let i = 0;i<n;i+=2) {
        for(let j=0;j<nums[i];j++) {
            arr.push(nums[i+1])
        }
    }
}

// [1,2,3,4]
// [2,4,4,4]