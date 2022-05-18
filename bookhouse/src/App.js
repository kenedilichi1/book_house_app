import './App.css';
import React from 'react';
import {BrowserRouter,Route, Redirect, Routes,} from "react-router-dom";
import Home from './components/home';
import SignIn from './components/authorization/sign_in';
import AboutUs from './components/aboutus';
import SignUp from './components/authorization/signup';
import UserDashBoard from './components/user/dashboard';
import UserHome from './components/user/home';
import UserShelf from './components/user/shelf';
function App() {
  return (
    
    
    <BrowserRouter>
     
      <Routes>

        <Route path="/" element={<Home/>}/>
          
        <Route path="/aboutus" element={<AboutUs/>}/>
    
        <Route path="/signin" element={<SignIn/>}/>
        
        <Route path= "/signup" element={<SignUp/>}/>

        <Route path= "/dashboard/:username" element={<UserDashBoard/>} />
        
        <Route path= "/:username/home" element={<UserHome/>} />

        <Route path= "/:username/shelf" element = {<UserShelf/>} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
