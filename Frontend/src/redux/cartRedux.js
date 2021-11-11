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

    // This log shows the quantity of the product. this is what we need to manipulate when add/subtract button is clicked
    //console.log(state.products[1].quantity, "<= product quantity");

    // New
    subtractProductQuantity: (state, action) => {
      // First we find the index of the product that was clicked and then use that to change it's quantity
      let productIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );

      // if product is more than 1 we can then subtract one.
      if (state.products[productIndex].quantity > 1) {
        state.products[productIndex].quantity -= 1;
        state.total -= action.payload.price;
      }
    },

    addProductQuantity: (state, action) => {
      // First we find the index of the product that was clicked and then use that to change it's quantity
      let productIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      // if product is more than 1 we can then subtract one.
      if (state.products[productIndex].quantity < 20) {
        state.products[productIndex].quantity += 1;
        state.total += action.payload.price;
      }
    },

    deleteProduct: (state, action) => {
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

export const {
  addProduct,
  subtractProductQuantity,
  addProductQuantity,
  deleteProduct,
  deleteAllProducts,
} = cartSlice.actions;
export default cartSlice.reducer;
