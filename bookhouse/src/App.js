import './App.css';
import React from 'react';
import {BrowserRouter,Route, Redirect, Routes,} from "react-router-dom";
import Home from './components/home';
import SignIn from './components/sign_in';
import AboutUs from './components/aboutus';
import SignUp from './components/signup';
import UserDashBoard from './components/dashboard';
function App() {
  return (
    
    
    <BrowserRouter>
     
      <Routes>

        <Route path="/" element={<Home/>}/>
          
        <Route path="/aboutus" element={<AboutUs/>}/>
    
        <Route path="/signin" element={<SignIn/>}/>
        
        <Route path= "/signup" element={<SignUp/>}/>

        <Route path= "/dashboard/:username" element={<UserDashBoard/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
