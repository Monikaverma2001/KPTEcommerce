import axios from "axios";

export const FETCH_USERS="FETCH_USERS"

export const DELETE_PRODUCT_SUCCESS="DELETE_PRODUCT_SUCCESS"
export const DELETE_PRODUCT_FAILURE="DELETE_PRODUCT_FAILURE"


export const FetchUsers=()=>async(dispatch)=>{
    try {
        const response=await axios.get("http://localhost:4000/allusers"); 
        console.log(response.data.user)
        dispatch({type:FETCH_USERS,payload:{users:response.data.user,messege:response.messege}})
       
    } catch (error) {
        console.log(error)
    }
}

export const Deleteproduct=(id)=>async(dispatch)=>{
    try {
        await axios.post(`http://localhost:4000/deleteproduct/${id}`)
        dispatch({type:DELETE_PRODUCT_SUCCESS})
    } catch (error) {
        console.log(error)
        dispatch({type:DELETE_PRODUCT_FAILURE})
    }

}