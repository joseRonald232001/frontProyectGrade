import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SingIn = () => {
  const { handleSubmit, reset, register } = useForm();
  const navigate = useNavigate();

  const sendForm = async (data) => {
    try {
      const url = "http://localhost:3000/itsa/auth";
      const res = await axios.post(url, data);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");
      reset({ email: "", password: "" });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(sendForm)} className="form">
      <input
        type="email"
        {...register("email")}
        autoComplete="none"
        placeholder="correo electronico"
      />
      <input
        type="password"
        {...register("password")}
        autoComplete="none"
        placeholder="contraseña"
      />
      <button>iniciar sesión</button>
      <button type="button" onClick={() => navigate("/login")}>
        cancelar
      </button>
    </form>
  );
};

export default SingIn;
