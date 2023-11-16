import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRequest from '../hooks/useRequest';

const Profile = () => {

  const navigate= useNavigate(); 

  const {requestGet,data:valueGas}=useRequest(); 

  const [user,setUser]=useState({});

  useEffect(()=>{
    const token =localStorage.getItem("token")
    const url = "http://localhost:3000/itsa/me";
    axios.get(url,{headers:{Authorization:`Bearer ${token}`}})
    .then((res)=>setUser(res.data));
  },[])

  useEffect(()=>{
    const url=`http://localhost:3000/itsa/sensor/6`
    requestGet(url)
  },[])

  const handleLogout = () => {
    localStorage.setItem("token", "");
    navigate('/')
  };

    return (

        <div><h2>bienvenido  {user.firstName}</h2>
      <button onClick={handleLogout} >cerrar sesion</button>

      <h2>
        sensor de gas {valueGas.value}
        
      </h2>


        </div>
    );
};

export default Profile;