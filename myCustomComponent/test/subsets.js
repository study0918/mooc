function subsets(nums) {
    let res = [[]];
    for (let i = 0; i < nums.length; i++) {
        let len = res.length;
        for (let j = 0; j < len; j++) {
            res.push([...res[j], nums[i]]);
        }
    }
    console.log('res',res)
    return res;
}

// [1,2,3]
// https://blog.csdn.net/qq_37167086/article/details/107161381

// https://blog.csdn.net/xqhys/article/details/105736902

// https://blog.csdn.net/sinat_37168842/article/details/107531002