import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useRequest from "../hooks/useRequest";
import { useNavigate } from "react-router-dom";
import SingIn from "../components/SingIn";
import axios from "axios";
import picture1 from "../pictures/picture1.jpg";

const Login = () => {
  const { handleSubmit, register, reset } = useForm();
  const { requestPost } = useRequest();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const sendForm = (body) => {
    const url = "http://localhost:3000/itsa/newuser";
    requestPost(url, body)
      .then(() => {
        const object = { email: body.email, password: body.password };
        const urlauth = "http://localhost:3000/itsa/auth";
        return axios.post(urlauth, object);
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/profile");
        reset({ firstName: "", lastName: "", email: "", password: "" });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <main className="containerLogin">
        <section className="containerImgL">
          <img src={picture1} alt="" />
        </section>
        <section className="containerForm ">
        <div className="containerReg">
        <h3 className="titleForm" style={{textAlign:"center"}}>{isOpen?"iniciar Sesion":"Registrarse"}</h3>
          <div className="containerRegister">
            {isOpen == true ? (
              false
            ) : (
              <form className="form" onSubmit={handleSubmit(sendForm)}>
                <div className="inputsDesigForm">
                <input
                  type="text"
                  {...register("firstName")}
                  autoComplete="none"
                  placeholder="nombre"
                  />
                <input
                  type="text"
                  {...register("lastName")}
                  autoComplete="none"
                  placeholder="apellido"
                  />
                  </div>
                <input
                  type="email"
                  {...register("email")}
                  autoComplete="none"
                  placeholder="email"
                />
                <input
                  type="password"
                  {...register("password")}
                  placeholder="contraseña"
                />
                <button style={{background:"#41BCAC",border:"none",color:"#fff" }}>Registrar</button>
                <button style={{background:"none",border:"none"}}   onClick={() => setIsOpen(!isOpen)} type="button">
                  ya tienes una cuenta ? <span style={{color:"#41BCAC"}}>Iniciar sesion </span> 
                </button>
              </form>
            )}
            {isOpen && <SingIn isOpen={isOpen} setIsOpen={setIsOpen} />}
          </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
