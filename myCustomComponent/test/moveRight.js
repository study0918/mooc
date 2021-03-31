function moveRight(arr, n) {
  const movedArr = [];
  const l = arr.length;
  for (let i = 0; i < l; i++) {
    movedArr[i] = arr[Math.abs(-n % l)];
  }
  return movedArr;
}
