import { useNavigate } from 'react-router'
import './Admin.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { FetchUsers } from '../../Redux/Action/AdminAction'
import logo from "/delete.jpg";

function AdminUsers() {
  const navigate=useNavigate()
  const admin=useSelector((state)=>state.user.admin)
  const number_of_users=useSelector((state)=>state.admin.users)
  const dispatch=useDispatch();
 
   useEffect(()=>{
    if(!admin || !admin.email)
    {
      navigate('/login')
    }
    else{
      dispatch(FetchUsers());
     console.log(number_of_users)
    }
   },[])
  return (
    <div>
      <h1 className='text-center mt-5'>Users</h1>
     <div className='my-5 w-full mx-auto text-black  '>
        {number_of_users?.map((item,index)=>
        <>
        <div className='my-5  px-32 bg-slate-100 mx-32 py-8 each-row'> 
        <div><span className='text-blue-400'>SNo. </span><span>{index+1}</span></div>
        <div><span className='text-blue-400'>UserId  </span><span>{item?._id}</span></div>
        <div><span className='text-blue-400'>Name </span><span>{item?.name}</span></div>
        <div><span className='text-blue-400'>Email </span><span>{item?.email}</span></div>
        <div><span className='text-blue-400'>Phone </span><span>{item?.phone}</span></div>
        <div className='dlt-btn '><div><img height={20} width={20} src={logo} alt="" /></div></div>
        </div>
        
        </>
        )}
       </div>
     
    </div>
  )
}

export default AdminUsers