import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import ProtectedRoutes from './components/ProtectedRoutes';


const App = () => {

  return (
    <HashRouter>
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>} />

      <Route element={<ProtectedRoutes/>}>
      <Route path='/profile' element={<Profile/>} />
      </Route>
      
    </Routes>
    </>
    </HashRouter>
  );
};

export default App;
