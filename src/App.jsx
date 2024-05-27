import {Routes, Route} from 'react-router-dom'

import PATHROUTES from "./helpers/PathRoutes";
import Landing from "./views/Landing/Landing";
import Home from './views/Home/Home';
import Footer from './components/Footer/Footer';
import CreateSuplement from './components/CreateSuplements/index';
import Detail from './views/Detail/Detail';
import RegisterUser from './components/RegisterUser';
import Login from './views/Login/index';
import NavBar from './components/NavBarLanding/NavBarLanding';


import './App.css'
import UpdateSuplement from './components/UpdateSuplement';
import Dashboard from './components/Dashboard/Dashboard';

function App() {


  return (
    
      <div>
        {/* <NavBar />  */}
      <Routes>
        <Route path={PATHROUTES.LANDING} element={<Landing/>} />
        <Route path={PATHROUTES.HOME} element={<Home/>} />

        <Route path='/dashboard/*' element={<Dashboard/>}/>

        <Route path='login' element={<Login/>}/>
        <Route path='/home/:id' element={<Detail/>}/>
        {/* <Route path={PATHROUTES.DETAIL} element={<Detail/>}/> */}
        <Route path='registeruser' element={<RegisterUser/>}/>
      </Routes>
        <Footer />
      </div>
  )
}

export default App