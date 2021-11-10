import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      let filteredProductsLength =
        state.products.filter((item) => item._id !== action.payload._id)
          .length + 1;

      let productsLength = state.products.length + 1;

      // Condition doesn't let an item get added again.
      if (productsLength === filteredProductsLength) {
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      }
    },

    // add reducer that makes item quantity go up 1

    // New
    // subtractProduct: (state, action) => {
    //   state.quantity -= 1;
    //   state.total -= action.payload.price * action.payload.quantity;
    // },

    deleteProduct: (state, action) => {
      console.log(action, "<= action");
      state.quantity -= 1;
      state.products = [
        ...state.products.filter((item) => item._id !== action.payload._id),
      ];
      state.total -= action.payload.price * action.payload.quantity;
    },

    deleteAllProducts: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export const { subtractProduct } = cartSlice.actions;
export const { deleteProduct, deleteAllProducts } = cartSlice.actions;
export default cartSlice.reducer;
