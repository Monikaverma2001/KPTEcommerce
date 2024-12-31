import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createOtp, setUser } from "../../Redux/Action/UserAction";
// import { useNavigate } from "react-router";
import './otp.css'

export default function Otp() {
  const [counter,setCounter]=useState(20);
  const detail=JSON.parse(localStorage.getItem("signupuser"))
  // const navigate=useNavigate();
  console.log(detail)
  const resendOtp=()=>{
    dispatch(createOtp(detail));
    setCounter(20)
  }
  useEffect(()=>{
    const interval=setInterval(()=>{
      if(counter>0)
      {
        setCounter(counter-1)
      }
      
     },1000)
    return ()=>{clearInterval(interval)}
  },[counter])

    // const user=useSelector((state)=>state.user.user)
    const [otp,setOtp]=useState('')
    const dispatch=useDispatch()

    const otpMatcher=async(e)=>{
        e.preventDefault();
        
        try {
            
            dispatch(setUser(otp))
        } catch (error) {
            console.log(error)
        }

    }
    // setTimeout(()=>{
    //   navigate('/')
    // },60*60*10)
  return (
    <div className="mx-32  my-auto otp-div" >
      <h1 className="text-center pt-10">Vertify User</h1>
        <form action="" className="mx-auto text-center  w-full">
          <div>Enter a otp send to your email {detail?.email}</div>
        <label
              htmlFor="Otp"
              className="block mt-14 mb-2 text-sm font-medium text-red"
            >
              OTP:
            </label>
            <input
              value={otp}
              onChange={(e) => {
               setOtp(e.target.value);
              }}
              type="password"
              id="password"
              className=" text-black  rounded-lg border-2 block mx-auto p-2.5 otp-btn"
              required
            />{counter>0?(<div className="text-black">Resend OTP in 00:{counter}</div>):(<button className="text-white bg-blue-700 mt-7 mb-10  hover:bg-blue-800  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 me-32 mx-auto" onClick={resendOtp}>Resend OTP</button>)}
            
            <button type="submit"
               
                className="text-white bg-blue-700 mt-7 mb-10  hover:bg-blue-800  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5  mx-auto"
               onClick={otpMatcher}>Verify</button>
        </form>
    </div>
  )
}
