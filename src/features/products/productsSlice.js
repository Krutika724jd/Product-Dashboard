// import { createSlice } from "@reduxjs/toolkit";
// import { products } from "../../api/products";
//  const initialState={
//  products:products || []
//  }
// export const productsSlice=createSlice({
//  name:"products",
//  initialState,
// reducers:{
//   addProduct:(state,action)=>{
//     state.products.push(action.payload)
//   },
//   deleteProduct:(state,action)=>{
//     state.products=state.products.filter(item=>item.id !== action.payload)
//   },
//   updateProduct:(state,action)=>{
//     const idx=state.products.findIndex(p=>p.id === action.payload.id)
//     if(idx != -1) state.products[idx]=action.payload
//   },
// }
// })
// export const {addProduct,deleteProduct,updateProduct} = productsSlice.actions;
// export default productsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api"; // your axios instance
// createAsyncthunk is helper functon in rtk that handles async operations like apicalls
// it dispacyhes lifecycle action(pending, fullfilled, rejected)
// Fetch all products from API
// Redux Thunk = middleware
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const res = await API.get("/products", {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  return res.data;
});

// Add product
export const addProduct = createAsyncThunk("products/add", async (productData) => {
  const res = await API.post("/products", productData);
  return res.data;
});

// Update product
export const updateProduct = createAsyncThunk("products/update", async ({ id, data }) => {
  const res = await API.put(`/products/${id}`, data);
  return res.data;
});

// Delete product
export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await API.delete(`/products/${id}`);
  return id;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => { state.loading = false; state.error = "Failed to fetch"; })

      // Add
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.products[index] = action.payload;
      })

      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p._id !== action.payload);
      });
  },
});

export default productSlice.reducer;