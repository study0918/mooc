import React, { useState,useEffect,useCallback } from 'react';

function useWinSize() {
    const [size,setSize] = useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    })

    const onResize = useCallback(()=>{
        setSize({
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        })
    },[])

    useEffect(()=>{
        window.addEventListener('resize',onResize,false);
        // 使用return返回只有组件销毁的时候才会被执行
        return ()=>{

        }
    },[])

    return size
}

function Example9() {
    const size = useWinSize()
    return (<div>
        页面Size:{size.width} * {size.height}
    </div>)
}

export default Example9;