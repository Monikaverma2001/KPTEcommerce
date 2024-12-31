import axios from "axios";


export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const SIGN_SUCCESS = "SIGN_SUCCESS";
export const SIGN_FAILURE = "SIGN_FAILURE";

export const CONNECT = "CONNECT";

export const GENERATE_OTP = "GENERATE_OTP";
export const OTP_GENERATED = "OTP_GENERATED";
export const OTP_SUCCESS = "OTP_SUCCESS";
export const OTP_FAILURE = "OTP_FAILURE";

export const LOGIN_ADMIN_SUCCESS="LOGIN_ADMIN_SUCCESS"
export const LOGIN_ADMIN_FAILURE="LOGIN_ADMIN_FAILURE "


export const LOGOUT_SUCCESS="LOGOUT_SUCCESS";
export const LOADING="LOADING"



export const LogoutSuccess=()=>async (dispatch)=>{
  
  try {
    const res=await axios.get("http://localhost:4000/logout", { withCredentials: true });
    localStorage.clear()
    console.log(res);
    dispatch({type:LOGOUT_SUCCESS})
    
  } catch (error) {
    dispatch({type:LOGOUT_SUCCESS})
  }
}

export const getAdminUser=(userDetail)=>async(dispatch)=>{
  dispatch({type:LOADING})
  try {
    const res= await axios.post(`http://localhost:4000/adminLogin`,userDetail);
    console.log(res)
    dispatch({type:LOGIN_ADMIN_SUCCESS,payload:{messege:res.data.messege,admin:res.data.admin}})
    
  } catch (error) {
    console.log(error)
    dispatch({type:LOGIN_ADMIN_FAILURE})
  }
}

export const getUser = (userDetail) => async (fun) => {
  fun({ type: LOADING});
  try {
    
    console.log(userDetail);
    const res = await axios.post("http://localhost:4000/getuser", userDetail, { withCredentials: true });
    console.log("my messege", res);
    localStorage.clear();
    localStorage.setItem("user",JSON.stringify(res.data.user))
      fun({ type: LOGIN_SUCCESS, payload: { messege: res.data.messege,user:res.data.user } });
    // else 
    //   fun({ type: LOGIN_FAILURE, payload: { messege: res.data.messege } });
  } catch (err) {
    fun({ type: LOGIN_FAILURE, payload: { messege: err.response.data.messege } });
    console.log(err)
  }
};

export const createOtp = (userDetail) => async (dispatch) => {
  //dispatch({type:CONNECT})
  dispatch({ type:LOADING, payload: { messege: "" } });
  try {
    
    const res = await axios.post("http://localhost:4000/createotp", userDetail, { withCredentials: true });
    console.log(res);
    
    console.log("status otp ", res.status);
   
      
      return dispatch({
        type: OTP_SUCCESS,
        payload: { user: userDetail, messege: res.data.messege },
      });
    
  } catch (err) {
    return dispatch({ type: OTP_FAILURE, payload: { messege: err.response.data.messege } });
  }
};

export const setUser = (otp) => async (dispatch) => {
  let userDetail = JSON.parse(localStorage.getItem("signupuser"));
  userDetail = { ...userDetail, otp: otp };
  console.log("setting up", userDetail);
  dispatch({type:LOADING})
  //   dispatch({ type: GENERATE_OTP });
  try {
    const res = await axios.post("http://localhost:4000/setuser", userDetail);
     dispatch({
        type: SIGN_SUCCESS,
        payload: { user: userDetail, messege: res.data.messege },
      });
  
  
  } catch (err) {
    return dispatch({type: SIGN_FAILURE, payload: { messege: err.response.data.messege } });
  }
};
