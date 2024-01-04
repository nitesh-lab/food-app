import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { reset } from "../features/cart";

function Cart() {

  const fakeCart=useSelector(s=>s.cart.item);  
  
  const price=useSelector(s=>s.cart.item.reduce((prev,curr)=>{ 
    return prev+curr.unitPrice;
  },0));

  const dispatch=useDispatch();
  
  const cart = fakeCart;

  const total=useSelector(s=>s.cart.item.reduce((prev,curr)=>prev+=curr.quantity,0));

  console.log("total="+total);

  const name=useSelector(s=>s.user.name);

  function handleClear(){
    dispatch(reset());
  }

  return (
    <div className="px-4 py-3">
      <Link to="/menu">&larr; Back to menu</Link>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {name}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        {fakeCart.length!==0 &&<Link to="new" className= " text-white bg-yellow-500 rounded-lg p-[10px] mr-[10px] sm:mr-[20px]">
          Order now :{price}$
        </Link>}
       
        {fakeCart.length!==0 && <button className="text-white bg-yellow-500 rounded-lg p-[10px]" onClick={handleClear}>Clear cart</button>}
      
      </div>
    </div>
  );
}

export default Cart;
