/*eslint-disable*/

import { useDispatch, useSelector } from "react-redux";
import { add, addItem, del, removeItem } from "../features/cart";
import { useState } from "react";

function MenuItem({name,price,img,ingredients,soldOut,id}) {

    const dispatch=useDispatch();

    const [check,setCheck]=useState(false);
    const [addcart,setAdd]=useState(false);

    const quantity=useSelector((s)=>{

        if(s.cart.item.length==0){
            return 0;
        }
        const quantity=s.cart.item.find((e)=>e.pizzaId===id);
        return quantity?quantity.quantity:0;
    })

   
    function handleClick(id){        
       
        const newobj={
            pizzaId:id,
            name,
            quantity:1,
            unitPrice:price,
            totalPrice:price*1,
        }
        setCheck(true);
        setAdd(true);
        dispatch(add(newobj));

    }

    function handleClick2(id){
        
        dispatch(del(id));
         setAdd(s=>!s);
        setCheck(s=>!s);
      }

    function handleAdd(id){ 
        if(check){
        dispatch(addItem(id));
        }
    }

    function handleDel(id){
         if(check){   
        dispatch(removeItem(id));
         }
    }

    return (
    <>
    
<li className="grid grid-rows-[1fr_1fr] grid-cols-[1fr_2fr_1fr] bg-white my-[10px] sm:my-[18px] w-[90vw] mx-auto">
    <img className="grid col-start-1 col-end-2 row-start-1 row-end-3 w-[100px] sm:w-[150px]"  src={img} alt="nope"></img>
    <p className={`mt-[15px]  ml-[15px] sm:mt-[10px] sm:ml-[10px] text-sm sm:text-[20px] text-black font-semibold uppercase ${soldOut && "text-slate-400"}`}>{name}</p>
    <div className="col-start-3 col-end-4 row-start-1 row-end-2 flex gap-[5px] sm:gap-[15px]  items-center">
    <p className="text-sm sm:text-[20px] text-black  uppercase font-bold">{price}</p>
    
{!soldOut ? (!addcart ?<button className=" mr-[20px] sm:mr-[30px] bg-yellow-500 hover:bg-yellow-300 rounded-lg p-[10px] sm:p-[10px] text-sm sm:text-xl text-white" onClick={()=>handleClick(id)}>Add</button>: <button onClick={()=>handleClick2(id)} className="text-white bg-yellow-500 rounded-full p-[10px]">Delete</button>):null}
   
    {!soldOut && <button className="bg-yellow-400 
    text-white rounded-lg  p-[5px] sm:p-[10px]" onClick={()=>handleAdd(id)}>+</button>}
    {!soldOut && <div className="grid  col-start-3 col-end-4 row-start-1 row-end-2">
        <p>{quantity}</p>
    </div>}
    {!soldOut && <button className="bg-yellow-400 text-white rounded-lg  p-[5px] sm:p-[10px]" onClick={()=>handleDel(id)}>-</button>}
     
    </div>
    
    <div className="row-start-2 row-end-3 col-start-2 col-end-4 sm:col-end-3   flex   flex-wrap sm:flex-row gap-[2px] sm:gap-[10px] ">
        <p className="m-[2px] sm:m-[5px] text-sm sm:text-xl font-semibold">Ingredients:</p>
        {ingredients.map((e)=>{
            return <p  key={Math.random()} className="m-[2px] text-sm sm:text-xl font-semibold sm:my-[5px] mx-[5px]">{e}</p>
        })
        }
    </div>
    
    </li>
</> )

}

export default MenuItem
