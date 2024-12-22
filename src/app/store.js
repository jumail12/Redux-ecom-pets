import {configureStore} from "@reduxjs/toolkit"
import userSlice from "../sliceLogic/userAuth";
import productSlice from "../sliceLogic/ProductSlice";
import  cartSlice from "../sliceLogic/cartSlice";
import orderSlice from "../sliceLogic/Payment";
import wishlistSlice  from "../sliceLogic/WishListSlice"
import addressSlice from "../sliceLogic/AddressSlice";
import CheckoutSlice from "../sliceLogic/CheckoutSlice";




const store=configureStore({
    reducer:{
        userRed:userSlice,
        pro:productSlice,
        cartItems:cartSlice,
        ord:orderSlice,
        wish:wishlistSlice,
        address:addressSlice,
        checkout:CheckoutSlice,
    }
});


export default store;