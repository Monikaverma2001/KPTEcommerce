import { useEffect } from "react";
import "./Product.css";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, increment } from "../../Redux/Action/AddtocartAction";
import { useNavigate } from "react-router";
import star from "/star.png";
import { Deleteproduct } from "../../Redux/Action/AdminAction";

function ProductList() {
  const product = useSelector((state) => state.count.count);
  const cartStatus = useSelector((state) => state.count.CartStatus);
  const admin = useSelector((state) => state.user.admin);
  //   const loading_status=useSelector((state)=>state.count.isloading);

  const navigate = useNavigate();
  //   console.log("i am cart status ", cartStatus)
  const dispatch = useDispatch();
  //   console.log("product ", product);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, navigate]);
  const showProduct = (e) => {
    navigate(`productDetail/${e}`);
  };

  const showStatus = () => {
    if (cartStatus) {
      // console.log(cartStatus)
    } else {
      // console.log(cartStatus)
    }
  };
  if (admin && admin.email) {
    return (
      <>
        <Toaster position="bottom-right" richColors />

        <h1 className="text-black text-4xl font-bold text-center product-head mb-5">
          PRODUCT LIST
        </h1>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4 p-11 ">
          {product?.map((e) => (
            <>
              <div className="w-full  group m-2 border-2 " key={e._id}>
                <div className="max-w-80 max-h-100 overflow-y-hidden m-11">
                  <img
                    src={e.images[0]}
                    alt="img"
                    className="max-10 relative h-32  overflow-y-hidden overflow-x-hidden my-5 mx-auto "
                  />

                  <div className=" max-10 relative overflow-y-hidden text-2xl font-bold mydiv text-black">
                    {e.brand}
                  </div>
                  <div className="max-10 relative overflow-y-hidden  text-lg font-normal  mydiv text-black">
                    {e.category}
                  </div>
                  <div className="max-10 relative overflow-y-hidden text-lg font-normal tracking-wide overflow-x-hidden h-20  mydiv text-black">
                    {e.description}
                  </div>
                  <div className="max-10 relative overflow-y-hidden  text-lg font-bold mydiv text-black">
                    {e.discountPercentage} %
                  </div>
                  <div className="max-10 relative text-lg font-normal overflow-y-hidden  mydiv text-black">
                    Rs.{e.price}
                  </div>
                  <div className="   text-base font-normal text-black ">
                    <div>Rating : {e.rating}</div>{" "}
                    <img src={star} alt="" height={10} width={10} />
                  </div>
                  <div className="max-10 relative overflow-y-hidden text-base font-normal mydiv text-black">
                    Stock : {e.stock}
                  </div>
                  <div className="mx-auto buttons-div mt-5">
                    {" "}
                    <button
                      onClick={() => navigate(`admin/edit/${e._id}`)}
                      className="rounded  text-white bg-green-700 mx-auto h-8 w-36 "
                    >
                      EDIT
                    </button>
                    <button
                      className="rounded  text-white bg-red-700 mx-auto h-8 w-36 "
                      onClick={() => dispatch(Deleteproduct(e._id))}
                    >
                      DELETE
                    </button>
                  </div>

                  <br></br>
                  <br></br>
                </div>
              </div>
            </>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="bottom-right" richColors />

      <h1 className="text-black text-4xl font-bold text-center product-head mb-5">
        PRODUCT LIST
      </h1>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-4 p-11 ">
        {product?.map((e) => (
          <>
            <div className="w-full  group m-2 border-2" key={e._id}>
              <div className="max-w-80 max-h-100 overflow-y-hidden m-11">
                <img
                  src={e.images[0]}
                  alt="img"
                  className="max-10 relative h-32  overflow-y-hidden overflow-x-hidden my-5 mx-auto "
                />

                <div className=" max-10 relative overflow-y-hidden text-2xl font-bold mydiv text-black">
                  {e.brand}
                </div>
                <div className="max-10 relative overflow-y-hidden  text-lg font-normal  mydiv text-black">
                  {e.category}
                </div>
                <div className="max-10 relative overflow-y-hidden text-lg font-normal tracking-wide overflow-x-hidden h-20  mydiv text-black">
                  {e.description}
                </div>
                <div className="max-10 relative overflow-y-hidden  text-lg font-bold mydiv text-black">
                  {e.discountPercentage} %
                </div>
                <div className="max-10 relative text-lg font-normal overflow-y-hidden  mydiv text-black">
                  Rs.{e.price}
                </div>
                <div className="   text-base font-normal text-black ">
                  <div>Rating : {e.rating}</div>{" "}
                  <img src={star} alt="" height={10} width={10} />
                </div>
                <div className="max-10 relative overflow-y-hidden text-base font-normal mydiv text-black">
                  Stock : {e.stock}
                </div>
                <div className="mx-auto buttons-div mt-5">
                  {" "}
                  <button
                    onClick={() => {
                      dispatch(increment(e));
                      return showStatus;
                    }}
                    className="rounded  text-white bg-green-700 mx-auto h-8 w-36 "
                  >
                    + Add To Cart
                  </button>
                  <button
                    onClick={() => showProduct(e._id)}
                    className="rounded  text-white bg-green-700 mx-auto h-8 w-36 "
                  >
                    + View Product
                  </button>
                </div>

                <br></br>
                <br></br>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default ProductList;

/*


const productSchema = new mongoose.Schema({

    product_name: {
        type: String,
        required: true,
        index: true
    },
    slug: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productscategories',
        required: true,
    },
    seller_id: {
        type: String,
    },
    product_type: {
        type: String,
        required: true
    },
    product_gallery: {
        type: Array,
        required: true
    },
    original_price: {
        type: Number,
    },
    sale_price: {
        type: Number,
        required: true
    },
    variations: [{
        attribute: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productsterms',
            required: true
        },
        terms: [
            {
                term: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'productsattributes',
                    required: true
                },
                sku: {
                    type: String,
                },
            }
        ]
    }],
    sku: {
        type: String,
    },
    quantity: {
        type: Number,
    },
}, { timestamps: true })

const productsAttributesSchema = new mongoose.Schema({
    attribute_name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true,
    }
}, { timestamps: true } )

const productsTermsSchema = new Schema({
    term_name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    price: {
        type: Number,
        required: false,
    },
    attribute_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    image: {
        type: String,
        required: false,
    },
    is_default: {
        type: Boolean,
        default: false
    },
})
*/
