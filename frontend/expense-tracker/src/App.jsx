//import { useState } from 'react'
import './App.css'
import {Route,Routes,Router,Navigate} from "react-router-dom"
import Login from './pages/auth/login'
import SignUp from './pages/auth/SignUp'
import Home from './pages/dashboard/home'
import Expense from './pages/dashboard/Expense'
import Income from './pages/dashboard/Income'

export default function App() {
return (
  <div>
       
         <Routes>
            <Route path='/' element={<Root/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/expense' element={<Expense/>}/>
            <Route path='/income' element={<Income/>}/>
   </Routes>
    

  </div>
)
}

const Root=()=>{
  //check if the token is recieved or not
  const isAuthoRized = localStorage.getItem('Token');

  //check if the token is present then go to home and if not then go to login
  return isAuthoRized ? (
    <Navigate to="/home" />
  ) : (
    <Navigate to="/login" />
  )
}

  
