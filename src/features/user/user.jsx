import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAddress=createAsyncThunk(
    "user/fetchAddress",async function() {
      
        const data=await new Promise(function(resolve,reject){
       navigator.geolocation.getCurrentPosition(resolve,reject);
    });

    const position={
        latitude:data.coords.latitude,
        longitude:data.coords.longitude
    }
    const res=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${data.coords.latitude}&longitude=${data.coords.longitude}`)
    const address=await res.json();
    console.log("addresss=")
    console.log(address);
    const main=`${address?.locality},${address?.city} , ${address?.postcode} , ${address?.countryName}`;

    return {position,main};
}
)


const user=createSlice(
    {
        name:"user",
        initialState:{name:"",
        status: 'idle',
  position: {},
  address: '',
  error: '',    
    },
        reducers:{
           name(state,action){
            state.name=action.payload;
           }
        },
        extraReducers:(builder)=>
        builder
        .addCase(fetchAddress.pending,(state)=>{
            state.status="loading";
        })
        .addCase(fetchAddress.fulfilled,(state,action)=>{
            state.position = action.payload.position;
            state.address = action.payload.main;
            state.status = 'idle';
        })
        .addCase(fetchAddress.rejected,(state)=>{
            state.status = 'error';
            state.error ='There was a problem getting your address. Make sure to fill this field!';
        }
        )
    }
);

const {name}=user.actions;

export {name};
export default user.reducer;