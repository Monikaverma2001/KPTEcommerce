import { useEffect, useState } from "react";
import { fetchIndividualProduct } from "../../Redux/Action/AddtocartAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

export const EditProduct=()=>{
    const individualPro = useSelector((state) => state.individualproduct.product);
    const param = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
      // console.log(param.productId);
      dispatch(fetchIndividualProduct(param.id));
      setProduct({...individualPro})
    }, [dispatch, individualPro, param.id]);

    const [product, setProduct] = useState({...individualPro});
  
    const changeProduct = (e, key) => {
      e.preventDefault();
      setProduct({ ...product, [key]: e.target.value });
    };
    return (<>
        <div >
        <form>
          <div className="mb-5 mx-auto" style={{maxWidth:"700px"}}>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-black"
            >
              Description
            </label>
            <input
              value={product.description}
              type="email"
              id="email"
              onChange={(e) => changeProduct(e, "description")}
              className=" text-black rounded-lg border-2 block w-full p-2.5 "
              required
            />
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-black"
            >
              Price
            </label>
            <input
              value={product.price}
              type="email"
              id="email"
              onChange={(e) => changeProduct(e, "price")}
              className=" text-black rounded-lg border-2 block w-full p-2.5 "
              required
            />
            <center><button onClick={()=>console.log("here call api to edit product")} className="btn bg-slate-500 text-white rounded-md my-10 px-4 py-2">Made change</button></center>
          </div>
        </form>
      </div>
    </>)
}