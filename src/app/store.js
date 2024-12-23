import {configureStore} from "@reduxjs/toolkit"
import userSlice from "../sliceLogic/userAuth";
import productSlice from "../sliceLogic/ProductSlice";
import  cartSlice from "../sliceLogic/cartSlice";
import wishlistSlice  from "../sliceLogic/WishListSlice"
import addressSlice from "../sliceLogic/AddressSlice";
import CheckoutSlice from "../sliceLogic/CheckoutSlice";
import userAdminSlice from "../sliceLogic/UserSlice";
import AdminOrderSlice from "../sliceLogic/AdminOrderSlice";




const store=configureStore({
    reducer:{
        // userRed:userSlice,
        pro:productSlice,
        cartItems:cartSlice,
        wish:wishlistSlice,
        address:addressSlice,
        checkout:CheckoutSlice,
        adUser:userAdminSlice,
        adOrder:AdminOrderSlice,
    }
});


export default store;