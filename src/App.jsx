import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Home from "./UI/Home";
import Menu from "./pages/menu";
import AppLayout from "./UI/AppLayout";
import { loader } from "./pages/menu";
import { loader as user } from "./components/User";
import Cart from "./components/Cart";
import CreateOrder, { action } from "./pages/CreateOrder";

import User from "./components/User";

export default function App(){

 const route=createBrowserRouter([
  {
    path:"/",
    element:<AppLayout />,
    children:[{
      path:"/",
      element:<Home />
    },
    {
      path:"/menu",
      element:<Menu/>,
      loader: loader,
    },
    {
      path:"/cart",
      element:<Cart/>
    },
    {
      path:"/cart/new",
      element:<CreateOrder />,
      action: action,
    },
    {
      path:"/cart/:id",
      element:<User/>,
      loader:user,
    }
  ]
  }
 ]
 );

  return (<RouterProvider router={route}/>)
}