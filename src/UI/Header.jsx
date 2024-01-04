import {  useSelector } from "react-redux"
import Text from "../helpers/text"
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
    
    const name=useSelector(s=>s.user.name);

    


    const [id,setId]=useState("");
   
    return (
        <div className="h-[10vh] bg-yellow-500 row-start-1 row-end-2 flex gap-2 justify-between items-center">
        <div className="ml-[20px] ">
           <Link to="/" className="text-sm sm:text-[20px] text-white font-semibold uppercase">Nitesh Pizza Co.</Link>
        </div>
        <div>
            <Text>Pizza Menu</Text>
        </div>
        <div className="mr-[20px]">

          <input value={id}  onChange={(e)=>setId(e.target.value)}   className="rounded-full  p-[2px] sm:p-[10px] " type="text" placeholder="Enter Order ID"></input>
        </div>

       <p className="hidden sm:block" >Hello,{name}</p>
        </div>
      
    )
}

export default Header
