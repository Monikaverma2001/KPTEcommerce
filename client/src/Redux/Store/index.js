import { configureStore } from "@reduxjs/toolkit";
import { CartReducer, IndividulaProductReducer } from "../Reducer/AddtoCartReducer";
import { userReducer } from "../Reducer/UserReducer";
import { AdminReducer } from "../Reducer/AdminReducer";



export const Mystore= configureStore({
    reducer:{
        count:CartReducer,
        user:userReducer,
        individualproduct: IndividulaProductReducer,
        admin:AdminReducer
        // status:StatusReducer
    }
})