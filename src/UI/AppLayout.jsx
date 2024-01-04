import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Loader from "../components/Loader";
import Footer from "./Footer";

export default function AppLayout(){

    const {state}=useNavigation();
        console.log(state);
    return (<>
        <Header />
        {state==="loading"?<Loader/>:<Outlet />} 
        <Footer/>
        </>
    )
}