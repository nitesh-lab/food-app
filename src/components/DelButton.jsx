import { useDispatch } from "react-redux";
import { del } from "../features/cart";

/*eslint-disable*/
 function DelButton({pizzaId,setState=null,setCheck=null}) {

    const dispatch=useDispatch();

    function handleClick(id){
        console.log("deleting="+id);
        dispatch(del(id));
        (setState!==null &&  setState(s=>!s));
      (setCheck!==null && setCheck(s=>!s))
      }
  
    return (
        <button onClick={()=>handleClick(pizzaId)} className="text-white bg-yellow-500 rounded-full p-[10px]">Delete</button>
    )
}

export default DelButton;
