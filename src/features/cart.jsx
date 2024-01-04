import { createSlice } from "@reduxjs/toolkit";

const cartslice=createSlice({
    name:"cart",
    initialState:{item:[]},
    reducers:{
        add(state, action) {
           return {item:[...state.item,action.payload]};
        },
        del(state,action){
          return {item:state.item.filter((e)=>e.pizzaId!=action.payload)};  
        },
        addItem(state,action){
      
           return {...state,item:state.item.map((e)=>{
            if(e.pizzaId===action.payload){
              return  {...e,quantity:e.quantity+1};
            }
            return e;
           })}
        },
        removeItem(state,action){
          
            return {...state,item:state.item.map((e)=>{
                if(e.pizzaId===action.payload && e.quantity>0){
                    return {...e,quantity:e.quantity-1};
                }
                return e;
            })}
        },
        reset(state){
            return {...state,item:[]};
        }
    }
})

const {add,del,addItem,removeItem,reset}=cartslice.actions;

export {add,del,addItem,removeItem,reset};

export default cartslice.reducer;