import { toast } from "sonner";
import {
  LOADING,
  LOGIN_ADMIN_FAILURE,
  LOGIN_ADMIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  OTP_FAILURE,
  OTP_GENERATED,
  OTP_SUCCESS,
  SIGN_FAILURE,
  SIGN_SUCCESS,
} from "../Action/UserAction";


const user = {
  user: JSON.parse(localStorage.getItem("loginuser")) || {} ,
  token: null,
  messege: "",
  otp: localStorage.getItem("otp")|| false,
  signup:false,
  islogin:false,
  admin:JSON.parse(localStorage.getItem("admin")) || {},
  loading:false
  
};

export const userReducer = (state = user, action) => {
  switch (action.type) {
    case LOADING:
      return {...state,loading:true}

    case LOGIN_ADMIN_SUCCESS:
      localStorage.clear()
      localStorage.setItem("admin",JSON.stringify(action.payload.admin))
      toast.success("successfully login ")
      return {...state,admin:action.payload.admin,loading:false}

    case LOGIN_ADMIN_FAILURE:
      toast.error("login fail")
      return {...state,loading:false}



    case LOGOUT_SUCCESS:
      toast.success("logout success");
      localStorage.clear();
      return {...state,islogin:false,user:{},admin:{},loading:false,cart:{},token:null};


    case LOGIN_SUCCESS:
      
      localStorage.setItem("loginuser",JSON.stringify(action.payload.user))
      console.log(action.payload.messege)
      toast.success(action.payload.messege);
      return { ...state, messege:action.payload.messege,islogin:true,user:action.payload.user,loading:false };

    case LOGIN_FAILURE:
      console.log(action.payload.messege)
      toast.error(action.payload.messege);
      return { ...state, messege:action.payload.messege,loading:false };



    case OTP_GENERATED:
      return state;
    case OTP_SUCCESS:
      localStorage.setItem("signupuser", JSON.stringify(action.payload.user));
      localStorage.setItem("otp",true)
      console.log("OTP SUCCESS", action.payload.messege);
      toast.success(action.payload.messege);
      return { ...state, otp: true,messege:action.payload.messege,loading:false};
    case OTP_FAILURE:
      toast.error(action.payload.messege);
      return { ...state, messege:action.payload.messege,loading:false };




    case SIGN_SUCCESS:
      console.log("SIGN SUCCESS", action.payload.messege);
      toast.success(action.payload.messege);
      return { ...state, otp: true,signup:true ,messege:action.payload.messege ,loading:false};
    case SIGN_FAILURE:
      console.log("fail ", action.payload.messege);
      toast.error(action.payload.messege);
      return { ...state, messege:action.payload.messege ,loading:false};

    default:
      return state;
  }
};
