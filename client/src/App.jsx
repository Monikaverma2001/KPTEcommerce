
import { Provider, useSelector } from 'react-redux'
import './App.css'

import { Mystore } from './Redux/Store'
import ProductList from './Components/HomeProducts/ProductList'


function App() {
  const admin=useSelector((state)=>state.user.admin);
  const login=useSelector((state)=>state.user.admin);
  if(admin && admin.email)
  {
    return (
      <>
      <div>
        <Provider store={Mystore}>
          
          <ProductList/>
        
        </Provider>
          
        </div>
         
      </>
    )
  }
  else  if(login && login.email){
    return (<>
      <Provider store={Mystore}>
      <ProductList />
      </Provider>
    </>)
  }
 else
  return (
    <>
    <div>
      <Provider store={Mystore}>
      <ProductList />
      </Provider>
        
      </div>
       
    </>
  )
}

export default App
