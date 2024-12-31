import { toast } from "sonner";
import {
  AUTHENTICATION,
  DECREMENT,
  ERROR,
 FETCH_CART_PRODUCT,
 FETCH_CART_PRODUCT_FAILURE,
 FETCH_CART_PRODUCT_SUCCESS,
 FETCH_PRODUCT_FAILURE,
 // DECREMENT,
  FETCH_PRODUCT_REQ, FETCH_PRODUCT_SUCCESS, INCREMENT, ON_LOADING, PLACE_ORDER_FAILURE, PLACE_ORDER_SUCCESS,
} from "../Action/AddtocartAction";

const products = {
  count: [],
  cart:[],
  CartStatus:false,
  iserror:'',
  isSucess:'',
  isloading:false,
  product:{},
  order:''
  
};

export const CartReducer = (state = products, action) => {
  switch (action.type) {
    case ON_LOADING:
      return {...state,isloading:true};

    case PLACE_ORDER_SUCCESS:
      toast.success("order placed successfully")
      console.log(action.payload.order)
      return {...state}

    case PLACE_ORDER_FAILURE:
      toast.success("error")
      return {...state}

    case FETCH_PRODUCT_REQ:
        // console.log("hi ,",action.payload)
        
      return { ...state, count:action.payload.pro,isloading:false};


    case FETCH_CART_PRODUCT:
      return state

    case FETCH_CART_PRODUCT_SUCCESS:
      //  toast.success(action.payload.messege)
      return {...state,cart:action.payload.product,isloading:false};

    case FETCH_CART_PRODUCT_FAILURE:
      toast.error("not fetching cart")
      return {...state,isloading:false}

    case INCREMENT:
    toast.success("Succes")
      return { ...state, cart: [...state.cart,action.payload.pro],CartStatus:true,isloading:false };

    case DECREMENT:
      toast.success("removed from cart")
      return {...state,cart:action.payload.pro,isloading:false}

    case ERROR:
      toast.error("fail")
      return { ...state, cart: state.cart,CartStatus:false,isloading:false };

    // case DECREMENT:
    //   return state;
    case AUTHENTICATION:
      toast.error("login first")
      return {...state,isloading:false};

    default:
      return state;
  }
};

export const IndividulaProductReducer=(state=products,action)=>{
  switch(action.type)
  {
    case FETCH_PRODUCT_REQ:
      return {...state};
      
    case FETCH_PRODUCT_SUCCESS:
      return {...state,product:action.payload.pro};

    case FETCH_PRODUCT_FAILURE:
      return {...state};
    default:
      return {...state};
  }
  

}