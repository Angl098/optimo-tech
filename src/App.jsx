import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PATHROUTES from "./helpers/PathRoutes";
import Landing from "./views/Landing/Landing";
import Home from './views/Home/Home';
import Footer from './components/Footer/Footer';
import CreateSuplement from './components/CreateSuplements/index';
import Detail from './views/Detail/Detail';
import RegisterUser from './components/RegisterUser';
import Login from './views/Login/index';
import Orders from './components/Ordenes/Ordenes'
import OrderSupplements from './components/Ordenes/OrdenSuplemento';
import { injectCartData, setUser} from './Redux/actions'


import './App.css'
import Dashboard from './components/Dashboard/Dashboard';
import NavBar from './components/NavBar/NavBar';
import { useState } from 'react';

import UserPerfil from './components/userPerfil/userPerfil.jsx';

function App() {
  const [search, setSearch] = useState('');
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate=useNavigate()
  function handleSearch(search) {
    setSearch(search);
    navigate("/home")
  }
/* 
  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if(user) dispatch(injectUser(JSON.parse(user)))
  },[]) */

  useEffect(() => {
    const productsInCart = window.localStorage.getItem('cart')
    if(productsInCart){
      if(productsInCart){
        dispatch(injectCartData(JSON.parse(productsInCart)))
      }
    }
  },[dispatch])

  return (

    <div>
      <NavBar handleSearch={handleSearch} search={search} setSearch={setSearch} />
      <Routes>
        <Route path={PATHROUTES.LANDING} element={<Landing />} />
        <Route path={PATHROUTES.HOME} element={<Home  search={search}/>} />

        <Route path='/dashboard/*' element={<Dashboard />} />

        <Route path='login' element={<Login />} />
        <Route path='/home/:id' element={<Detail />} />
        {/* <Route path={PATHROUTES.DETAIL} element={<Detail/>}/> */}
        <Route path='registeruser' element={<RegisterUser />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order-supplements" element={<OrderSupplements/>} />
        <Route path="/userperfil" element={<UserPerfil user={user=>user}/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;