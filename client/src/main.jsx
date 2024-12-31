import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Mystore } from "./Redux/Store/index.js";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterUser from "./Components/RegisterUser/RegisterUser.jsx";
import LoginUser from "./Components/LoginUser/LoginUser.jsx";
import IndividualProduct from "./Components/IndividualProduct/IndividualProduct.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import CardProduct from "./Components/UserComponent/CardProduct.jsx";
import LoginAdmin from "./Components/LoginUser/LoginAdmin.jsx";
import AdminDashboard from "./Components/Admin/AdminDashboard.jsx";
import AdminProducts from "./Components/Admin/AdminProducts.jsx";
import AdminUsers from "./Components/Admin/AdminUsers.jsx";
import AdminCoupans from "./Components/Admin/AdminCoupans.jsx";
import { AdminActionProduct } from "./Components/Admin/AdminActionProduct.jsx";
import { EditProduct } from "./Components/Admin/EditProducts.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Mystore}>
    
      <BrowserRouter>
      
      <Navbar/> 
        <Routes>

          <Route path="/" element={<App />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/productDetail/:productId" element={<IndividualProduct />} />
          <Route path="/mycart" element={<CardProduct />} />
          <Route path="/adminLogin" element={<LoginAdmin />}/>
          <Route path="/adminDashboard" element={<AdminDashboard/>}/>
          <Route path="adminProduct" element={<AdminProducts />} />
          <Route path="/adminUser" element={<AdminUsers/>} />
          <Route path="adminCoupans" element={<AdminCoupans/> } />
          <Route path="/admin" element={<AdminActionProduct/>}>
            <Route path="edit/:id" element={<EditProduct/>} />
          </Route>
          

        </Routes>
      
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
