import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  fetchIndividualProduct,
  increment,
} from "../../Redux/Action/AddtocartAction";
import { Toaster } from "sonner";

function IndividualProduct() {
  const individualPro = useSelector((state) => state.individualproduct.product);
  const param = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(param.productId);
    dispatch(fetchIndividualProduct(param.productId));
  }, [dispatch, param.productId]);

  // console.log(pro);
  // console.log(individualPro);
  return (
    <div className="mx-32 ">
      <Toaster position="bottom-right" richColors />
      <div className="w-full  relative group m-2 border-2">
        <div className="max-w-80 max-h-100 relative overflow-y-hidden m-11">
          <div className=" max-10 relative overflow-y-hidden mydiv text-black">
            {individualPro.brand}
          </div>
          <div className="max-10 relative overflow-y-hidden  mydiv text-black">
            {individualPro.category}
          </div>
          <div className="max-10 relative overflow-y-hidden  mydiv text-black">
            {individualPro.description}
          </div>
          <div className="max-10 relative overflow-y-hidden  mydiv text-black">
            {individualPro.discountPercentage}
          </div>
          <img
            src={individualPro.images?.[0]}
            alt="img"
            className="max-10 relative h-20 w-20 overflow-y-hidden overflow-x-hidden"
          />
          <div className="max-10 relative overflow-y-hidden  mydiv text-black">
            {individualPro.price}
          </div>
          <div className="max-10 relative overflow-y-hidden  mydiv text-black">
            {individualPro.rating}
          </div>
          <div className="max-10 relative overflow-y-hidden  mydiv text-black">
            {individualPro.stock}
          </div>
          <div className="mx-auto buttons-div">
            {" "}
            <button
              onClick={() => {
                dispatch(increment(individualPro));
              }}
              className="rounded  text-white bg-green-700 mx-auto h-8 w-36 "
            >
              + Add To Cart
            </button>
          </div>

          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default IndividualProduct;
