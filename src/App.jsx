import {Routes, Route} from 'react-router-dom'

import PATHROUTES from "./helpers/PathRoutes";
import Landing from "./views/Landing/Landing";
import Home from './views/Home/Home';
import Footer from './components/Footer/Footer';
import CreateSuplement from './components/CreateSuplements/index';
import Login from './components/Login/index';
import Detail from './views/Detail/Detail';

import './App.css'

function App() {


  return (
    
      <div>
        <Routes>
          <Route path={PATHROUTES.LANDING} element={<Landing/>} />
          <Route path={PATHROUTES.HOME} element={<Home/>} />
          <Route path='/home/:id' element={<Detail/>}/>
          <Route path='createsuplements' element={<CreateSuplement/>}/>
          <Route path='login' element={<Login/>}/>
        </Routes>
        <Footer />
      </div>
  )
}

export default App