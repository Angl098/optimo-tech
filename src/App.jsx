import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import CreateSuplement from './components/CreateSuplements/index';
import Login from './components/Login/index';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
<Routes>
<Route path='createsuplements' element={<CreateSuplement/>}/>
<Route path='login' element={<Login/>}/>
</Routes>
    </>
  )
}

export default App
