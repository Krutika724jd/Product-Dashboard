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
  }
}
})
export const {addProduct,deleteProduct} = productsSlice.actions;
export default productsSlice.reducer;