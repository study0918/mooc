function takeLongTime() {
  return new Promise(resolve => {
    setTimeout(() => resolve('long time_value'), 3000)
  })
}

async function test() {
  const v = await takeLongTime();
  console.log(v)
}

test()