import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { getAdminUser } from "../../Redux/Action/UserAction";

function LoginAdmin(){
    const login=useSelector((state)=>state.user.admin)
    const navigate=useNavigate();
    const [detail,setDetail]=useState({
      email:'',
      password:''
    })
    // console.log(detail)
    const dispatch=useDispatch();
    const loginuser=async(e)=>{
      e.preventDefault()
      try{
        dispatch(getAdminUser(detail));
      }
      catch(err)
      {
        console.log(err)
      }
    } 
    useEffect(()=>{},[])
    if(login===true)
    {
      // console.log("hello ",login)
     navigate('/')
    }
    else
    // console.log("login ",login) 
    return (
  
      <>
    
       <Toaster position="bottom-right" richColors />
        <div className="mt-32 mb-5 text-black">
          <form className="max-w-sm mx-auto border-2 p-5 mt-4 text-black ">
          <h1 className="text-3xl mb-5">ADMIN LOGIN</h1>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black"
              >
                Your email
              </label>
              <input
              value={detail.email}
                type="email"
                id="email"
                onChange={(e)=>setDetail({...detail,email:e.target.value})}
                className=" text-black rounded-lg border-2 block w-full p-2.5 "
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-black"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e)=>setDetail({...detail,password:e.target.value})}
                value={detail.password}
                className=" text-black rounded-lg border-2 block w-full p-2.5 "
                placeholder="09!*AZaz"
                required
              />
            </div>
            
            <button onClick={loginuser} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
  
          <div className="text-center">
            <button><Link to={'/register'}>Create Account?</Link></button>
          </div>
        </div>
      </>
    );
}
export default LoginAdmin;