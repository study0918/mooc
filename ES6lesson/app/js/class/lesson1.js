// function test(){
//     let a=1;
//     console.log(a);
// }

// test();


// function test() {
//     for (let i = 1; i < 3; i++) {
//         console.log(i);//i只在该作用域下有效
//     }
//     console.log(i);//es6强制开启严格模式，i没有事先声明
// }

// test();


// function test(){
//     let a=1;
// }

// test();

function last(){
    const PI=3.1415926;//const声明的时候必须赋值
    const k={
        a:1
    };
    k.b=3;
    console.log(PI,k);
}

last();

