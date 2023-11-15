import React from "react";
import { useForm } from "react-hook-form";
import useRequest from "../hooks/useRequest";
import { useNavigate } from "react-router-dom";
import SingIn from "../components/SingIn";

const Login = () => {
  const { handleSubmit, register, reset } = useForm();

  const { requestPost } = useRequest();
  const navigate = useNavigate();

  const sendForm = (body) => {
    const url = "http://localhost:3000/itsa/newuser";

    requestPost(url, body);
    navigate("/profile");
    reset({ firstName: "", lastName: "", email: "", password: "" });
  };

  return (
    <>
      THIS COMPONENT IS login
      <form className="form" onSubmit={handleSubmit(sendForm)}>
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
        {/*<input type="text" {...register("email")} />*/}
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
        <button type="button">ya tienes una cuenta ?</button>
      </form>

      <SingIn/>

    </>
  );
};

export default Login;
