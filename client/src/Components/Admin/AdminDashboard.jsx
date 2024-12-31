import { useEffect } from 'react'
import './Admin.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
function AdminDashboard() {
  const navigate=useNavigate()
  const user=useSelector((state)=>state.user.admin)
   useEffect(()=>{
    if(!user || !user.email)
    {
      navigate('/login')
    }
   },[])
  return (
    <div className='admin-dashboard'>
        <h1>WELCOME ADMIN</h1>
        <div className='box-div'>
            <div className='boxes'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. A ab labore doloribus, necessitatibus nesciunt dolor accusantium nostrum, nisi ipsa est mollitia dicta, aliquam sapiente optio odit. Eveniet dolorum voluptatibus reprehenderit?
            </div>
            <div className='boxes'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis deserunt nostrum eos asperiores consectetur velit sint nulla cumque natus soluta aspernatur mollitia perferendis impedit quisquam, corrupti dignissimos non tempora voluptas quod dolorum? Nobis unde deserunt a autem inventore tempora! Facere similique debitis, nemo laborum veniam ullam incidunt provident? Recusandae!</div>
            <div className='boxes'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta quidem illo magni odit, praesentium necessitatibus eaque, voluptatum molestias, minus vel quo? Quibusdam voluptates, autem corporis voluptate consequatur aut accusamus. Ut, ducimus autem iure ab magnam quod iste sit placeat quisquam accusamus expedita, sint voluptatibus explicabo corporis, sequi commodi voluptates debitis. Veniam omnis consequatur nemo, qui harum tempore quam maxime exercitationem!</div>
            <div className='boxes'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, doloremque?</div>
        </div>
    </div>
  )
}

export default AdminDashboard