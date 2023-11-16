import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useRequest from "../hooks/useRequest";
import { useNavigate } from "react-router-dom";
import SingIn from "../components/SingIn";
import axios from "axios";

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
      THIS COMPONENT IS login
      {isOpen==true?false:(<form className="form" onSubmit={handleSubmit(sendForm)}>
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
        <button>registrar</button>
        <button onClick={()=>setIsOpen(!isOpen)} type="button">ya tienes una cuenta ? inicia sesion</button>
      </form>
      )
      }

      {isOpen && <SingIn isOpen={isOpen} setIsOpen={setIsOpen} />}

    </>
  );
};

export default Login;
