import { useLoaderData } from "react-router-dom";
import { getMenu } from "../helpers/data";
import MenuItem from "../components/MenuItem.jsx";

/*eslint-disable*/
export async function loader(){
    const menu=await getMenu();
    return  menu;
}

export default function Menu(){
 
 const menu=useLoaderData();
    
 console.log(menu);
 
    return (
        <ul className="bg-slate-300">
        {menu.data.map((e)=>{
        return <MenuItem key={e.id} id={e.id} name={e.name} price={e.unitPrice}  img={e.imageUrl} ingredients={e.ingredients} soldOut={e.soldOut}/>
        })}
        </ul>
    )
}