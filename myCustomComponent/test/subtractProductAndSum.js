function subtractProductAndSum(n) {
    n = String(n);
    let product = Number(n[0]);
    let sum = Number(n[0]);
    for(let i=1;i<n.length;i++) {
        product*=Number(n[i]);
        sum+=Number(n[i]);
    }
    return product - sum;
}