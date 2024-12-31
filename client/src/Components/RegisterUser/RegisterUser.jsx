import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOtp } from "../../Redux/Action/UserAction";
import { Toaster } from "sonner";
import Otp from "./Otp";
// import Otp from "./Otp";

function RegisterUser() {
  const otp = useSelector((state) => state.user.otp);
  console.log("iam otp", otp);
  const [otpStatus,setOtpStatus]=useState(otp);
 

  const dispatch = useDispatch();
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const register = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(createOtp(detail));
      setOtpStatus(otp)
      // console.log(value)
    } catch (errr) {
      setOtpStatus(otp)
      console.log(errr);
    }
  };

  useEffect(() => {
    setOtpStatus(otp)
  
  }, [otp]);
  if (otpStatus) {
    return (<Otp  />);
  } else {
    return (
      <>
        <Toaster position="bottom-right" richColors />
        <div className="mt-24 mb-5 text-black">
          <h1 className=" font-bold text-5xl text-center">KPT</h1>

          <form className="max-w-sm mx-auto border-2 p-5 mt-4 text-black ">
            <h1 className="text-3xl mb-5">Sign Up</h1>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-black"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) => {
                  setDetail({ ...detail, name: e.target.value });
                }}
                value={detail.name}
                className=" text-black rounded-lg border-2 block w-full p-2.5 "
                placeholder="John"
                required
              />
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => {
                  setDetail({ ...detail, email: e.target.value });
                }}
                value={detail.email}
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
                value={detail.password}
                onChange={(e) => {
                  setDetail({ ...detail, password: e.target.value });
                }}
                type="password"
                id="password"
                className=" text-black rounded-lg border-2 block w-full p-2.5 "
                placeholder="09!*AZaz"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-black"
              >
                Your Phone
              </label>
              <input
                value={detail.phone}
                onChange={(e) => {
                  setDetail({
                    ...detail,
                    phone: e.target.value,
                  });
                }}
                type="number"
                id="phone"
                className=" text-black rounded-lg border-2 block w-full p-2.5 "
                placeholder="1234567890"
                required
              />
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  defaultValue
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
                <span> {"   "}I am not a robot</span>
              </div>
            </div>
           
            <button
              type="submit"
              onClick={register}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>

          <div className="text-center">
            <button>
              <Link to={"/login"}>Have Account?</Link>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default RegisterUser;
