import atc from "/addToCart.png";
import logo from "/vite.svg";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LogoutSuccess } from "../../Redux/Action/UserAction";
import { fetchCartProduct } from "../../Redux/Action/AddtocartAction";

function Navbar() {
  const navigation = useNavigate();
  let cartLength = useSelector((state) => state.count.cart);
  // console.log("selector",cartLength)
  
  const login = useSelector((state) => state.user.user);
  const admin = useSelector((state) => state.user.admin);
  const dispatch = useDispatch();

  

  // const [cart,setCart]=useState(cartLength);

  const logout=async()=>{
    try {
      await dispatch(LogoutSuccess())
      console.log("logout",login.email)
  console.log("logut",admin.email)
      
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(() => {
   
    if(login && login.email)
    {
     dispatch(fetchCartProduct())
    
    }
  }, [login,admin,dispatch,navigation]);

  const RedirectRegister = () => {
   
    navigation("/login");
  };

  const showCartProduct=()=>{
    if(login && login.email)
    {
      
      // console.log(user_id)
      const result=dispatch(fetchCartProduct())
      if(result)
      navigation("/mycart")
    }
    else{
      console.log("login first")
    }
  }


  // console.log(login)
  if (login && login.email) {
    
    return (
      <>
        <div>
          <nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a
                href="https://flowbite.com/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src={logo} className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  KPT
                </span>
              </a>
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <div className="text-white">{cartLength?.length}</div>
                <div>
                  {" "}
                  <img
                    onClick={showCartProduct}
                    className="h-16 w-16 rounded-full me-5"
                    height={50}
                    src={atc}
                    alt="Cart Items"
                  />
                </div>

                <button
                  type="button"
                  className=" text-white  focus:outline-none font-medium rounded-full text-sm px-10 py-2 text-center"
                >
                  <img
                    className="h-8 w-8 rounded-full "
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt
                  />
                  <button
                    className=" "
                    type="button"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </button>
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-sticky"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </div>
              <div
                className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                id="navbar-sticky"
              >
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <Link
                      className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      to="/"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      to="/"
                    >
                      Product
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      to="/"
                    >
                      Favourite
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      to="/"
                    >
                      Your Orders
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
  } 
  else if (admin && admin.email) {
    return (
      <>
        <div>
          <nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a
                href="https://flowbite.com/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src={logo} className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  KPT
                </span>
              </a>
              <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button
                  type="button"
                  className=" text-white  focus:outline-none font-medium rounded-full text-sm px-10 py-2 text-center"
                >
                  <img
                    className="h-8 w-8 rounded-full "
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt
                  />
                  <button
                    className=" "
                    type="button"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </button>
             
                <button
                  data-collapse-toggle="navbar-sticky"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-sticky"
                  aria-expanded="false"
                >
                 
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </button>
              </div>
              <div
                className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                id="navbar-sticky"
              >
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <Link
                      className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      to="/adminDashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      to="/"
                    >
                      Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      to="/adminUser"
                    >
                    + Add Product
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      to="/adminUser"
                    >
                      User
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      to="/"
                    >
                      Coupans
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      to="/"
                    >
                      Orders
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </>
    );
  } else
    return (
      <>
        <nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="https://flowbite.com/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8" alt="Flowbite Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                KPT
              </span>
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
             
              <div>
                {" "}
                <img
                  onClick={() => console.log("cart button clicked")}
                  className="h-16 w-16 rounded-full me-5"
                  height={50}
                  src={atc}
                  alt="Cart Items"
                />
              </div>

              <button
                type="button"
                className=" text-white  focus:outline-none font-medium rounded-full text-sm px-10 py-2 text-center"
              >
                <img
                  className="h-8 w-8 rounded-full "
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt
                />
                <button className=" " type="button" onClick={RedirectRegister}>
                  Login/Register
                </button>
              </button>
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    to="/"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    to="/"
                  >
                    Service
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    to="/"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
}

export default Navbar;
