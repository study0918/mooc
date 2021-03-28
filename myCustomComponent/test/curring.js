function curringAdd() {
    console.log('arguments',arguments)
    let args =[].slice.call(arguments,0)
    function add() {
        args=[...args,[].slice.call(arguments,0)]
        return add
    }
    
    add.toString=function() {
        return args.reduce((t,a)=>t+a,0)
    }
    return add
}

curringAdd(1)(2)(3)
