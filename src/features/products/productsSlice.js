import { createSlice } from "@reduxjs/toolkit";
import { items } from "../../api/products";
 const initialState={
 items:items || []
 }
export const productsSlice=createSlice({
 name:"products",
 initialState,
reducers:{
  addProduct:(state,action)=>{
    state.items.push(action.payload)
  },
  deleteProduct:(state,action)=>{
    state.items=state.items.filter(item=>item.id !== action.payload)
  },
  updateProduct:(state,action)=>{
    const idx=state.items.findIndex(p=>p.id === action.payload.id)
    if(idx != -1) state.items[idx]=action.payload
  },
}
})
export const {addProduct,deleteProduct,updateProduct} = productsSlice.actions;
export default productsSlice.reducer;