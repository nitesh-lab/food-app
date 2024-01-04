import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

function Footer() {
    
    const total=useSelector(s=>s.cart.item.reduce((prev,curr)=>{
        if (curr.quantity) {
            return prev + curr.quantity; // Accumulate quantities
          } else {
            return prev; // If quantity is falsy, skip addition
          }
    
    },0));
    const price=useSelector(s=>s.cart.item.reduce((prev,curr)=>prev+=curr.unitPrice*curr.quantity,0));
    
    if(!total){
        return null;
    }
    return (
       <footer className="bg-slate-700 flex justify-around items-center text-white h-[8vh]">
        <div>
        <p>{total} pizzas {price}</p>
        </div>
        <Link to="/cart">
        Open Cart
        </Link>
       </footer>
    )
}

export default Footer
