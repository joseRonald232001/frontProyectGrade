import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const navigate= useNavigate();  

  const [user,setUser]=useState({});
  useEffect(()=>{

    const token =localStorage.getItem("token")
    const url = "http://localhost:3000/itsa/me";
    axios.get(url,{headers:{Authorization:`Bearer ${token}`}})
    .then((res)=>setUser(res.data))
  },[])  

  const handleLogout = () => {
    localStorage.setItem("token", "");
    navigate('/')
  };

    return (

        <div><h2>bienvenido  {user.firstName}</h2>

      <button onClick={handleLogout} >cerrar sesion</button>
        </div>
    );
};

export default Profile;