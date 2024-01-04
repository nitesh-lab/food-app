import {useDispatch, useSelector} from "react-redux";
import {  name } from "../features/user/user";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

function Home() {

    const [inp,setInp]=useState("");
    const user=useSelector(s=>s.user.name);    
    const dispatch=useDispatch();
    const nav=useNavigate();

    function handleClick(){
        dispatch(name(inp));
        nav("/menu");
    }

    return (
        <div className="mx-auto w-[99vw] h-[100vh]">        
            <div className="bg-green-500  h-[100%] flex-col gap-[10px] sm:gap-[40px] flex items-center ">
            <h1 className="text-center pt-[20px] sm:pt-[100px] sm:mt-[20px] sm:font-bold  text-sm sm:text-xl">Best Pizza Out of Oven.</h1>
            { !user ? <input value={inp} onChange={(e)=>setInp(e.target.value)} className="p-[5px] mb-[10px] sm:mb-[20px] sm:p-[10px] text-black  rounded-lg" type="text" placeholder="enter name"/> : <button className="rounded-full bg-yellow-500 font-semibold text-sm sm:text-lg text-black p-[10px] sm:p-[15px]" onClick={()=>nav("/menu")} >continue ordering...</button>}
            {inp!=="" && <button onClick={handleClick}  className="rounded-full bg-yellow-500 text-sm sm:text-lg text-black p-[10px] sm:p-[15px]">Start Ordering</button>}
           
            </div>
            
        </div>
       )
}

export default Home;
