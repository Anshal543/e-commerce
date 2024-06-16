import React, { useEffect } from 'react'
import MainPage from './pages/MainPage'

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import SingleProduct from './pages/SingleProduct'
import NotFound from './pages/Notfound'
import Footer from './components/layout/Footer'
import CartPage from './pages/CartPage'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOutPage from './pages/CheckOutPage'
import LoginPage from './pages/LoginPage'
import axios from 'axios'
import { login } from './features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import ProtectedRoutes from './pages/ProtectedRoutes'
import SignUp from './pages/SignUp'
import { fetchPosts } from './features/post/postSlice'
import UserOrders from './pages/UserOrders'
import UserProfile from './pages/UserProfile'
import AdminProductListPage from './pages/admin/AdminProductListPage'
import AdminProductForm from './pages/admin/AdminProductForm'
import AdminProductDetailPage from './pages/admin/AdminProductDetailPage'
import ProtectedAdmin from './ProtectedAdmin'
axios.defaults.withCredentials=true 
function App() {
const dispatch=useDispatch()
useEffect(()=>{
  const getData=async()=>{
    
    const data = await axios.get(`${import.meta.env.VITE_BACKEND}/auth/user`)
    if(data.status==200){
      dispatch(login(data?.data))   
    }
  }
  getData()
},[])
const userInfo = useSelector((state) => state.auth?.userInfo);

useEffect(() => {
  if (userInfo) {
    dispatch(fetchPosts()); // Fetch cart items when userInfo is available
  }
}, [ userInfo]);


  return (
    <div>

    <BrowserRouter>
    <ToastContainer />
    <Navbar/>
  

      <Routes>
      <Route path='/' element={<MainPage />}/>
      <Route path='/product/:id' element={<SingleProduct />}/>
      <Route
        path="cart"
        element={
          <ProtectedRoutes>
            <CartPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="checkout"
        element={
          <ProtectedRoutes>
            <CheckOutPage />
          </ProtectedRoutes>
        } />
      <Route path='/sign-in' element={<LoginPage />}/>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/orders" element={<UserOrders />} />
      <Route path="/profile" element={<UserProfile/>} />

      <Route path="/admin" element={<AdminProductListPage />}/>
      <Route path="/admin/product-form/edit/:id" element={<AdminProductForm />}/>


      <Route path="/admin/product/:id" element={<AdminProductDetailPage />}/>
         {/* <Route 
          path="/admin" 
          element={
            <ProtectedAdmin>
              <AdminProductListPage />
            </ProtectedAdmin>
          } 
        /> */}

      <Route path='/*' element={<NotFound/>} />
      </Routes>
    

  
      <Footer/>
    </BrowserRouter>

    </div>
  )
}

export default App