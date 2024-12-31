import axios from "axios";

export const ADDTOCART = "ADDTOCART";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

export const FETCH_PRODUCT_REQ = "FETCH_PRODUCT_REQ";
export const ERROR = "ERROR";

export const FETCH_PRODUCT_REQUEST = "FETCH_PRODUCT_REQUEST";
export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";
export const FETCH_PRODUCT_FAILURE = "FETCH_PRODUCT_FAILURE";

export const AUTHENTICATION = "AUTHENTICATION";

export const FETCH_CART_PRODUCT = "FETCH_CART_PRODUCT";
export const FETCH_CART_PRODUCT_SUCCESS = "FETCH_CART_PRODUCT_SUCCESS";
export const FETCH_CART_PRODUCT_FAILURE = "FETCH_CART_PRODUCT_FAILURE";

export const PLACE_ORDER_SUCCESS = "PLACE_ORDER_SUCCESS";
export const PLACE_ORDER_FAILURE = "PLACE_ORDER_FAILURE";

export const ON_LOADING = "ON_LOADING";

export const placeOrder = () => async (placeorder) => {
  const user = JSON.parse(localStorage.getItem("loginuser"));
  try {
    //  await dispatch(placeOrder(user._id))
    const response = await axios.get(`http://localhost:4000/placeorder`, {
      withCredentials: true,
    });
    let order = response.data.order;
    console.log(order);
    if (order && order.id) {
      console.log("order");
      var options = {
        key: "rzp_test_Y6bp2GPcZ0fkWD", // Enter the Key ID generated from the Dashboard
        amount: order.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: user.name, //your business name
        description: "Test Transaction",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler:async (response)=> {
          try {
            let order_detail = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };
            await (await axios.post(`http://localhost:4000/verify/${user._id}`,order_detail))
            alert("order has been placed")
            placeorder({
              type: PLACE_ORDER_SUCCESS,
              payload: { messege:"order has been placed"},
            });
          } catch (error) {
            console.log(error)
            alert(error)
          }
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          name: user.name, //your customer's name
          email: user.email,
          contact: user.phone, //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      let rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
    
  } catch (error) {
    console.log(error);
    placeorder({
      type: PLACE_ORDER_FAILURE,
      payload: { messege: "error.response.data.messege" },
    });
  }
};

export const fetchProducts = () => async (fun) => {
  fun({ type: ON_LOADING });
  try {
    const res = await (await axios.get("http://localhost:4000/products")).data;

    //   console.log("action hello",res.products)
    fun({ type: FETCH_PRODUCT_REQ, payload: { pro: res.products } });
  } catch (err) {
    setInterval(this, 2000);
    console.log("hello");
  }
};

export const increment = (value) => async (addcart) => {
  addcart({ type: ON_LOADING });
  try {
    const res = await axios.post(`http://localhost:4000/addtocart/`, value, {
      withCredentials: true,
    });

    addcart({
      type: INCREMENT,
      payload: { pro: value, messege: res.data.messege },
    });
  } catch (err) {
    addcart({ type: AUTHENTICATION, payload: { messege: "login first" } });
  }
};

export const decrement = (value) => async (removecart) => {
  removecart({ type: ON_LOADING });
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user._id);
    console.log("myid ", value);
    if (user) {
      const res = await axios.post(
        `http://localhost:4000/removefromcart/${user._id}`,
        value,
        { withCredentials: true }
      );

      removecart({
        type: DECREMENT,
        // payload: { messege: "removed from cart", pro: res.data.product },
        payload: {
          messege: res.data.messege,
          pro: res.data.product.cartProduct,
        },
      });
    } else {
      removecart({ type: AUTHENTICATION, payload: { messege: "login first" } });
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchIndividualProduct = (id) => async (dispatch) => {
  dispatch({ type: ON_LOADING });
  try {
    const res = await axios.get(`http://localhost:4000/getProductById/${id}`);
    dispatch({
      type: FETCH_PRODUCT_SUCCESS,
      payload: { pro: res.data.product },
    });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCT_FAILURE });
  }
};

export const fetchCartProduct = () => async (dispatch) => {
  dispatch({ type: ON_LOADING });
  try {
    // console.log(id)
    const res = await axios.get(`http://localhost:4000/getCartProducts/`, {
      withCredentials: true,
    });
    // console.log("your cart",res.data.product[0].cartProduct)
    dispatch({
      type: FETCH_CART_PRODUCT_SUCCESS,
      payload: {
        messege: res.data.messege,
        product: res.data.product[0].cartProduct,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCH_CART_PRODUCT_FAILURE,
      payload: { messege: "error" },
    });
  }
};
