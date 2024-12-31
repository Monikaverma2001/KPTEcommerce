// import { ISERROR, ISLOADING, ISSUCESS } from "../Action/StatusAction";

// const initialStatus = {
//   status: {
//     title: "",
//     isload: "",
//     issucess: "",
//     iserror: "",
//   },
// };

// export const StatusReducer = (state = initialStatus, Action) => {
//   switch (Action.type) {
//     case ISLOADING:
//       return {...state,
//         status: {
//           title: "loading",
//           isload: true,
//           issucess: "",
//           iserror: "",
//         }
//       };
//     case ISSUCESS:
//       return {...state,
//         status: {
//           title: "success",
//           isload: false,
//           issucess: "successfully add to cart",
//           iserror: "",
//         }
//       };

//     case ISERROR:
//       return {...state,
//         status: {
//           title: "error occured",
//           isload: false,
//           issucess: false,
//           iserror: "there is an error",
//         }
//       }
//     default :
//         return state;
//   }
// };
