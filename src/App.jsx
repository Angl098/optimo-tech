import { Routes, Route, useNavigate } from 'react-router-dom'

import PATHROUTES from "./helpers/PathRoutes";
import Landing from "./views/Landing/Landing";
import Home from './views/Home/Home';
import Footer from './components/Footer/Footer';
import CreateSuplement from './components/CreateSuplements/index';
import Detail from './views/Detail/Detail';
import RegisterUser from './components/RegisterUser';
import Login from './views/Login/index';
import Orders from './components/Ordenes/Ordenes'


import './App.css'
import Dashboard from './components/Dashboard/Dashboard';
import NavBar from './components/NavBar/NavBar';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCategorias } from './Redux/actions';

function App() {
  const dispatch=useDispatch()
  dispatch(getCategorias())
  const [search, setSearch] = useState('');
  const navigate=useNavigate()
  function handleSearch(search) {
    setSearch(search);
    navigate("/home")
  }
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
      </Routes>
      <Footer />
    </div>
  )
}

export default App