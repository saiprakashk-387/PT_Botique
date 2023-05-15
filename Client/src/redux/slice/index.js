import { createSlice } from "@reduxjs/toolkit";

const sampleSlice = createSlice({
  name: "sample",
  initialState: {
    ///auth//
    createAccount:{},
    userLogin:{},
    ///user///
    userEditProfile:{},
    userUpdateProfile:{},
    product: {},
    placeOrder:{},
    Orderlist:{},
    cancelOrder:{},
    ///admin///
    addProduct: {},
    users:{},
    cart:{},
    cartList:{},
    updateCart:{},
    error: false,
    isLoading:true,
    ///state//
  },
  ///reducer
  reducers: {
    ///auth///
    CreateUserAccountAction: (state, { payload }) => {
      state.createAccount = payload;
      state.isLoading = false;
    },
    UserLoginAction: (state, { payload }) => {
      state.userLogin = payload;
      state.isLoading = false;
    },
    ///user///
    UserEditProfileAction: (state, { payload }) => {
      state.userEditProfile = payload;
      state.isLoading = false;
    },
    UserUpdateProfileAction: (state, { payload }) => {
      state.userUpdateProfile = payload;
      state.isLoading = false;
    },
    productAction: (state, { payload }) => {
      state.product = payload;
      state.isLoading = false;
    },
  PlaceOrderAction: (state, { payload }) => {
      state.placeOrder = payload;
      state.isLoading = false;
    },
  AllOrderListAction: (state, { payload }) => {
      state.Orderlist = payload;
      state.isLoading = false;
    },
  cancelOrderItemAction: (state, { payload }) => {
      state.cancelOrder = payload;
      state.isLoading = false;
    },
    ///admin///
    addProductAction: (state, { payload }) => {
      state.addProduct = payload;
      state.isLoading = false;
    },
    usersAction: (state, { payload }) => {
      state.users = payload;
      state.isLoading = false;
    },
    cartAction: (state, { payload }) => {
      state.cart = payload;
      state.isLoading = false;
    },
    cartListAction: (state, { payload }) => {
      state.cartList = payload;
      state.loading = false;
    },
    updateCartAction: (state, { payload }) => {
      state.updateCart = payload;
      state.loading = false;
    },
    ///action
  },
});

export const {
  CreateUserAccountAction,
  UserLoginAction,
  UserEditProfileAction,
  UserUpdateProfileAction,
  productAction,
  PlaceOrderAction,
  AllOrderListAction,
  cancelOrderItemAction,
  addProductAction,
 usersAction,
 cartAction,
 cartListAction,
 updateCartAction,
} = sampleSlice.actions;

export const createUserAccountSelector = (state) => state.sample;
export const userLoginSelector = (state) => state.sample;
export const userEditProfileSelector = (state) => state.sample;
export const userUpdateProfileSelector = (state) => state.sample;
export const productSelector = (state) => state.sample;
export const placeOrderSelector = (state) => state.sample;
export const allOrderListSelector = (state) => state.sample;
export const cancelOrderSelector = (state) => state.sample;
export const addproductSelector = (state) => state.sample;
export const userSelector = (state) => state.sample;
export const cartSelector = (state) => state.sample;
export const cartListSelector = (state) => state.sample;
export const updateCartSelector = (state) => state.sample;
///assign state to selector


//export reducer
const sampleReducer = sampleSlice.reducer;
export default sampleReducer;
