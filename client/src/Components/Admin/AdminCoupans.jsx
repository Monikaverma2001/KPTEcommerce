import { useNavigate } from 'react-router'
import './Admin.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

function AdminCoupans() {
  const navigate=useNavigate()
  const user=useSelector((state)=>state.user.admin)
   useEffect(()=>{
    if(!user || !user.email)
    {
      navigate('/login')
    }
   },[])
  return (
    <div>AdminCoupans</div>
  )
}

export default AdminCoupans