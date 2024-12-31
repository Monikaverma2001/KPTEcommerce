import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartEmpty from "/emptyCart.png";
import "./CardProduct.css";
import {
  decrement,
  fetchCartProduct,
  placeOrder,
} from "../../Redux/Action/AddtocartAction";
import "./CardProduct.css";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

function CardProduct() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.count.cart);

  const [totalPayment, setTotalPayment] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || !user.email) {
      navigate("/");
    } else {
      dispatch(fetchCartProduct(user._id));
      const calculatedTotal = cart?.reduce((acc, item) => acc + item?.price, 0);
      setTotalPayment(calculatedTotal || 0);
    }
  }, [dispatch, cart, user, navigate]);

  const PlaceOrder = () => {
    dispatch(placeOrder(user._id));
  };
  if (cart.length > 0)
    return (
      <>
        <Toaster position="bottom-right" richColors />
        <div className="bg-gray-100 h-screen py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  {cart?.map((individualPro) => (
                    <>
                     
                        <thead>
                          <tr>
                            <th className="text-left font-semibold">Product</th>
                            <th className="text-left font-semibold">Price</th>
                            <th className="text-left font-semibold">
                              Quantity
                            </th>
                            <th className="text-left font-semibold">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-4">
                              <div className="flex items-center">
                                <img
                                  className="h-16 w-16 mr-4"
                                  src={individualPro.images?.[0]}
                                  alt="Product image"
                                />
                                <span className="font-semibold">
                                  {individualPro.category}
                                </span>
                              </div>
                            </td>
                            <td className="py-4">{individualPro.price}</td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <button className="border rounded-md py-2 px-4 mr-2">
                                  -
                                </button>
                                <span className="text-center w-8">1</span>
                                <button className="border rounded-md py-2 px-4 ml-2">
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="py-4">
                              {" "}
                              <button
                                onClick={() =>
                                  dispatch(decrement(individualPro))
                                }
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                              >
                                REMOVE
                              </button>
                            </td>
                          </tr>

                          {/* More product rows */}
                        </tbody>
                      
                    </>
                  ))}
                  </table>
                </div>
              </div>
              <div className="md:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Summary</h2>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>Rs.19.99</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Taxes</span>
                    <span>Rs.1.99</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>Rs.0.00</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">Rs.{totalPayment+1.99+19.99}</span>
                  </div>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                    onClick={PlaceOrder}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </>
    );
  else {
    return (
      <>
        <div className="cart-empty mx-auto mt-7">
          <center>
            {" "}
            <img src={cartEmpty} alt="cart is empty" width="30%" />
            <strong className=" text-2xl">Your cart is empty</strong>
            <div className="cart-empty-messege py-2">
              Looks like you have not added anything to your cart. Go ahead &
              explore top categories
            </div>
            <div>
              <button className=" bg-black text-xl font-bold text-white  py-2 px-6 rounded">
                Shop now
              </button>
            </div>
          </center>
        </div>
      </>
    );
  }
}

export default CardProduct;

{
  /* <div class="bg-gray-100 h-screen py-8">
    <div class="container mx-auto px-4">
        <h1 class="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div class="flex flex-col md:flex-row gap-4">
            <div class="md:w-3/4">
                <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                    <table class="w-full">
                      {cart?.map((individualPro) => (
                        <>
                        <thead>
                            <tr>
                                <th class="text-left font-semibold">Product</th>
                                <th class="text-left font-semibold">Price</th>
                                <th class="text-left font-semibold">Quantity</th>
                                <th class="text-left font-semibold">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="py-4">
                                    <div class="flex items-center">
                                        <img class="h-16 w-16 mr-4" src="https://via.placeholder.com/150" alt="Product image">
                                        <span class="font-semibold">Product name</span>
                                    </div>
                                </td>
                                <td class="py-4">$19.99</td>
                                <td class="py-4">
                                    <div class="flex items-center">
                                        <button class="border rounded-md py-2 px-4 mr-2">-</button>
                                        <span class="text-center w-8">1</span>
                                        <button class="border rounded-md py-2 px-4 ml-2">+</button>
                                    </div>
                                </td>
                                <td class="py-4">$19.99</td>
                            </tr>
                            <tr>
                            <button
                      onClick={() => dispatch(decrement(individualPro))}
                      className="btn bg-green-500 border-2 px-4 py-1 mt-4"
                    >
                      REMOVE
                    </button>
                            </tr>
                            <!-- More product rows -->
                        </tbody></>
                      )}
                        
                    </table>
                </div>
            </div>
            <div class="md:w-1/4">
                <div class="bg-white rounded-lg shadow-md p-6">
                    <h2 class="text-lg font-semibold mb-4">Summary</h2>
                    <div class="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>$19.99</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span>Taxes</span>
                        <span>$1.99</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>$0.00</span>
                    </div>
                    <hr class="my-2">
                    <div class="flex justify-between mb-2">
                        <span class="font-semibold">Total</span>
                        <span class="font-semibold">$21.98</span>
                    </div>
                    <button class="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full" onClick={PlaceOrder}>Checkout</button>
                </div>
            </div>
        </div>
    </div>
</div> */
}
