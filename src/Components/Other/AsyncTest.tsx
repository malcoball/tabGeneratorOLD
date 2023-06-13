import { useState } from "react";

export const AsyncTest = ()=>{
    const [value,setValue] = useState(-1);
    const [limit] = useState(5);
    const [play,setPlay] = useState(true);

    const btnClick = ()=>{
        recursion();
    }

    const recursion = ()=>{
        let outValue = value;
        const loop = async (valueIn:number)=>{
            const result = await increase(valueIn);
            // console.log(result);
            if (result.repeat === true){
                console.log("play : ",play);
                console.log("go again pls : ",result);
                loop(result.value);
                setValue(result.value);
            } else {
                console.log("donezo");
            }
            
        }
        loop(outValue)
    }
    const increase = (valueIn:number):Promise<{repeat:boolean,value:number}>=>{
        return new Promise (result =>{
            window.setTimeout(()=>{
                let valueOut = valueIn + 1;
                if (valueOut < 5){
                    return result({repeat:true,value:valueOut})
            } else {
                    return result({repeat:false,value:valueOut})
                }
            }, 500);
        })
    }
    return (
        <>
            <button id="asyncTestBtn" onClick={btnClick}>{value}</button>
            <button id="asyncTestBtn" onClick={()=>{setPlay(!play)}}>{play === true ? "play please" : "ok, don't"}</button>
        </>
    )
}