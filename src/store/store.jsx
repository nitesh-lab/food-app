
import {configureStore} from "@reduxjs/toolkit";

import user from "../features/user/user";
import cart from "../features/cart";

const store=configureStore({
    reducer:{
        user:user,
        cart:cart
    }
})

export default store;