import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router";
import { fetchIndividualProduct } from "../../Redux/Action/AddtocartAction";

export const AdminActionProduct = () => {
  const individualPro = useSelector((state) => state.individualproduct.product);
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(param.productId);
    dispatch(fetchIndividualProduct(param.id));
  }, [dispatch, param.id]);

  console.log(individualPro);
  return (
    <>
        <button
          onClick={() => navigate("/")}
          className=" ml-5 btn bg-slate-500 text-white rounded-md my-10 px-4 py-2"
        >
          Back
        </button>
      <center> 
        <h1>Hi Admin!</h1>
      </center>

      <Outlet />
    </>
  );
};
