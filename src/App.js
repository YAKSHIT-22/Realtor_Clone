import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgetPassword from './pages/ForgetPassword';



function App() {
  return (
    <>
    <Router>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/offers' element={<Offers/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/forget-password' element={<ForgetPassword/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
