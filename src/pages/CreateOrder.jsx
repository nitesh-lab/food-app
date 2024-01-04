/*eslint-disable*/
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom"
import store from "../store/store";
import { reset } from "../features/cart";
import { useState } from "react";
import { fetchAddress } from "../features/user/user";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
);

function CreateOrder() {
    
    const {state}=useNavigation();
    const data=useActionData();
    const dispatch=useDispatch();
    const [check,setCheck]=useState(false);
    const [address,setAddress]=useState("");
    const {address:data2,position}=useSelector(s=>s.user);
    const cart=JSON.stringify(useSelector(s=>s.cart.item));
        
    const price=useSelector(s=>s.cart.item.reduce((prev,curr)=>{
        return prev+curr.unitPrice
    },0));
    if(cart.length==0){
        return <p className="text-sm sm:text-xl text-center mt-[20%] font-semibold ">Order something First...</p>
    }

    function handleClick(e){
        e.preventDefault();
        const data=dispatch(fetchAddress());
        setAddress(data2);
    }

    return (
    <div className="bg-slate-300 h-[90vh]">
       
       <p className="font-semibold text-sm sm:text-xl pl-[10px] sm:pl-[30px]  pt-[10px] sm:pt-[30px]" >Ready to Order? Let &apos;s go!</p>
        
         <Form method="post">

         <div className="my-[10px] sm:my-[50px]  text-sm sm:text-xl font-semibold flex gap-[5px] sm:gap-[20px] justify-center">
        <label >First name</label>
        <input  name="customer" className="rounded-lg h-[30px] w-[50%] sm:h-[40px]" type="text" ></input>
        </div> 

        <div className=" my-[10px] sm:my-[50px]  text-sm sm:text-xl font-semibold flex gap-[5px] sm:gap-[20px] justify-center">
        <label>Phone number</label>
        <input name="phone" className="rounded-lg h-[30px] w-[50%]  sm:h-[40px]" type="text"></input>
        </div>

        <div className="my-[10px] sm:my-[50px]  text-sm sm:text-xl font-semibold flex gap-[5px] sm:gap-[20px] justify-center">
        <label>Address</label>
        <input value={address} onChange={(e)=>setAddress(e.target.value)} name="address" className="rounded-lg h-[30px] sm:h-[40px] w-[50%]" type="text"></input>
        <button onClick={(e)=>handleClick(e)} className="bg-yellow-500 rounded-lg p-[5px] sm:p-[15px]">GPS</button>
        </div>
        <input type="hidden" value={cart}  name="cart"/>
        <input type="hidden" value={`${position.latitude},${position.longitude}`} />
        <div className="my-[10px] sm:mt-[50px]   text-sm sm:text-xl font-semibold flex gap-[5px] sm:gap-[20px] justify-center">
        <input name="priority" className="  h-[30px] sm:h-[40px]  " type="checkbox" checked={check} onChange={()=>setCheck(s=>!s)} ></input>
        <label>Want to Tip for your Order Priority?</label>
        </div>
        
        <div className="flex justify-center">                                                                           
        <button  className="m-[30px] rounded-lg text-white bg-yellow-500 p-[10px] sm:p-[15px] ">{state==="submitting"?"Submitting":`ORDER NOW! ${check ?Math.floor
        (price+price*20/100):price}`}</button>
        </div>
         </Form>
        </div>
        )
}

export async function action({request}){
   
    const data2=await request.formData();
    const res=Object.fromEntries(data2);
   
    const obj={
        ...res,
        cart:JSON.parse(res.cart),
        priority:res.priority==='on',
    };

    console.log(obj);
    
    const err={};

    if(!isValidPhone(res.phone)){
        err.phone= 'Please give us your correct phone number. We might need it to contact you.';
    }

    console.log("came at 78");

    if(Object.keys(err).length>0){
        return err;
    }

    console.log("came");

   const res2=await fetch("https://react-fast-pizza-api.onrender.com/api/order",
   { method:"post",
    body:JSON.stringify(obj),
    headers:{"Content-type":"application/json"},
});
    
    
const {data}=await res2.json();

    store.dispatch(reset());    
    return  redirect(`/cart/${data.id}`);
    
} 

export default CreateOrder
