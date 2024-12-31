import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchCartProduct } from "../../Redux/Action/AddtocartAction";


function UserOrders() {
    const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.count.cart);
//   const [totalPayment, setTotalPayment] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || !user.email) {
      navigate("/");
    } else {
      dispatch(fetchCartProduct(user._id));
    //   const calculatedTotal = cart?.reduce((acc, item) => acc + item?.price, 0);
    //   setTotalPayment(calculatedTotal || 0);
    }
  }, [user, dispatch, navigate, cart]);

  return (
    <>
    <div>
        <h1>YOUR ORDERS</h1>
        <div>EMPTY</div>
    </div>
    </>
  )
}

export default UserOrders