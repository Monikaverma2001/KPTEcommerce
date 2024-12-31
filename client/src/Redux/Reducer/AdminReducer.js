import { toast } from "sonner"
import { DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_SUCCESS, FETCH_USERS } from "../Action/AdminAction"

export const adminaccess={
    users:[],
    messege:""
}



export const AdminReducer=(state=adminaccess,action)=>{
    switch(action.type)
    {
        case FETCH_USERS:
            return {...state,users:action.payload.users,messege:action.payload.messege}

        case DELETE_PRODUCT_SUCCESS:
            toast.success("Product deleted refresh it")
            return state

        case DELETE_PRODUCT_FAILURE:
            toast.error("product donot deleted")
            return state

            
        default:
            return state
    }
}