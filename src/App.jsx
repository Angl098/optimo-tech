import {Routes, Route} from 'react-router-dom'

import PATHROUTES from "./helpers/PathRoutes";
import Landing from "./views/Landing/Landing";
import Home from './views/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import CreateSuplement from './components/CreateSuplements/index';
import Login from './components/Login/index';
import Detail from './views/Detail/Detail';
import RegisterUser from './components/RegisterUser';

function App() {


  return (
    
      <div>
        <NavBar />
      <Routes>
        <Route path={PATHROUTES.LANDING} element={<Landing/>} />
        <Route path={PATHROUTES.HOME} element={<Home/>} />
        <Route path='createsuplements' element={<CreateSuplement/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path={PATHROUTES.DETAIL} element={<Detail/>}/>
        <Route path='registeruser' element={<RegisterUser/>}/>
      </Routes>
        <Footer />
      </div>
  )
}

export default App
