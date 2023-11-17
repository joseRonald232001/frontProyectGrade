import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../hooks/useRequest";
import Navbar from "../components/Navbar";
import Rectangle from "../pictures/Rectangle.png";
import moment from "moment";
import { useForm } from "react-hook-form";

const Profile = () => {
  const navigate = useNavigate();

  const { handleSubmit, register, reset } = useForm();
  const { requestGet, data, requestDelete, requestPost, requestPut } =
    useRequest();

  const [user, setUser] = useState({});
  const [sensorSelected, setSensorSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const url = "http://localhost:3000/itsa/me";
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data));
  }, []);

  useEffect(() => {
    const url = `http://localhost:3000/itsa/sensors`;
    requestGet(url);
  }, []);

  const refreshData = () => {
    const url = `http://localhost:3000/itsa/sensors`;
    requestGet(url);
  };

  const handleLogout = () => {
    localStorage.setItem("token", "");
    navigate("/");
  };

  const formatDate = (utcDate) => {
    return moment
      .utc(utcDate)
      .subtract(4, "hours")
      .format("YYYY-MM-DD HH:mm:ss");
  };

  const gas = {
    seguro: "Sin peligro evidente.",
    advertencia:
      "Se sugiere revisar y ventilar el área debido a niveles ligeramente elevados que podrían indicar la presencia de gas.",
    peligroBajo:
      "el nivel de gas aumento considerablemente, revisa y toma acciones  ante niveles moderadamente elevados que podrían representar un riesgo a largo plazo.",
    peligroModerado:
      "Se necesitan acciones inmediatas !! , presencia de gas altamanete concentrada!! ",
  };

  const getColorForGas = (gasValue) => {
    if (gasValue <= 50) {
      return "green"; // Verde para seguro
    } else if (gasValue > 50 && gasValue <= 100) {
      return "orange"; // Anaranjado para advertencia
    } else if (gasValue > 150 && gasValue <= 300) {
      return "orange"; // Anaranjado para peligro bajo
    } else {
      return "red"; // Rojo para peligro moderado
    }
  };

  const temp = {
    baja: "Temperatura baja, lo que puede afectar el rendimiento de algunos componentes.",
    fresca:
      "La temperatura es ideal para el funcionamineto de las computadoras",
    moderada:
      "Temperatura óptima para el rendimiento general de la mayoría de las computadoras.",
    calor:
      "Temperatura elevada, lo que puede afectar el rendimiento de algunos componentes",
    intenso:
      "Condiciones críticas que pueden poner en peligro la integridad de los componentes.",
  };
  const getColorForTemp = (gasValue) => {
    if (gasValue <= 50) {
      return "green"; // Verde para seguro
    } else if (gasValue > 50 && gasValue <= 100) {
      return "orange"; // Anaranjado para advertencia
    } else if (gasValue > 100 && gasValue <= 500) {
      return "red"; // Anaranjado para peligro bajo
    } else {
      return "red"; // Rojo para peligro moderado
    }
  };

  const humedad = {
    optimo: "Condiciones ideales para componentes electrónico",
    cuidado:
      "Niveles bajos pueden aumentar el riesgo de acumulación de estática.",
    peligro:
      "Niveles extremos que pueden causar daño significativo a los componentes.",
  };
  const getColorForHumedad = (gasValue) => {
    if (gasValue <= 50) {
      return "green"; // Verde para seguro
    } else if (gasValue > 50 && gasValue <= 100) {
      return "orange"; // Anaranjado para advertencia
    } else if (gasValue > 100 && gasValue <= 500) {
      return "red"; // Anaranjado para peligro bajo
    } else {
      return "red"; // Rojo para peligro moderado
    }
  };

  const renderGasMessage = (gasValue) => {
    if (gasValue <= 50) {
      return gas.seguro;
    } else if (gasValue > 50 && gasValue <= 100) {
      return gas.advertencia;
    } else if (gasValue > 100 && gasValue <= 500) {
      return gas.peligroBajo;
    } else {
      return gas.peligroModerado;
    }
  };

  const renderTempMessage = (tempValue) => {
    if (tempValue < 0) {
      return temp.baja;
    } else if (tempValue >= 0 && tempValue <= 10) {
      return temp.baja;
    } else if (tempValue > 10 && tempValue <= 20) {
      return temp.fresca;
    } else if (tempValue > 20 && tempValue <= 35) {
      return temp.moderada;
    } else if (tempValue > 35 && tempValue <= 45) {
      return temp.calor;
    } else {
      return temp.intenso;
    }
  };

  const renderHumedadMessage = (humedadValue) => {
    if (humedadValue >= 30 && humedadValue <= 50) {
      return humedad.optimo;
    } else if (humedadValue < 30) {
      return humedad.cuidado;
    } else {
      return humedad.peligro;
    }
  };

  const deleteSensor = async (id) => {
    const url = `http://localhost:3000/itsa/sensor/${id}`;
    await requestDelete(url);
    refreshData();
    alert("se borro exitosamente");
  };

  const createSensor = async (body) => {
    const url = `http://localhost:3000/itsa/newsensor`;
    await requestPost(url, body);
    refreshData();
    setIsOpen(!isOpen);
    alert("se creo exitosamente");
  };

  const updateSensor = async (body) => {
    const url = `http://localhost:3000/itsa/sensor/${sensorSelected.id}`;
    await requestPut(url, body);
    alert("Se actualizo de manera exitosa");
    setIsOpen(!isOpen);
    refreshData();
  };

  const selectSensor = async (sensor) => {
    setSensorSelected(sensor);
    reset(sensor);
    setIsOpen(!isOpen);
  };

  const clearData = () => {
    setIsOpen(!isOpen);
    setSensorSelected(null);
    reset({
      name: "",
      value: "",
      status: "",
      type: "",
    });
  };
  const convertMed = (value) => {
    return Number(value.toFixed(3));
  };

  const sendForm = (body) => {
    if (sensorSelected) {
      return updateSensor(body);
    } else {
      return createSensor(body);
    }
  };

  console.log(user);

  return (
    <>
      <section className="compProfile">
        <section className="containerHimg">
          <img src={Rectangle} alt="" />
        </section>
        <Navbar />

        <section className="contianerDatProfile">

          <div className="sectionProfile">


            <div className="profile">
            <h2>Tu espacio de trabajo {user.firstName}</h2>
            <div>
              <img
                src="	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzpAIprXCYrYC9zsTc6oJJdUPZXUrKCWgJ7g&usqp=CAU" alt=""/>
            </div>
            <label >nombre :</label>
            <p> {user.lastName} {user.firstName}</p>
            <label htmlFor="">email :</label>
            <p>{user.email}</p>
            </div>
            <button style={{ width: "150px" ,height:"3rem",display:"flex", alignItems:"center",textAlign:"center",background:"none",margin:"2rem 0",fontWeight:"bold" }} onClick={handleLogout}>
              cerrar sesion
            </button>
          </div>

          <div className="sectionData">
            <div className="refresh">
              <p>Componentes</p>
              <div style={{ margin: "7px 0" }}>
                <button
                  type="button"
                  style={{ background: "#41BCAC", border: "none" }}
                  onClick={refreshData}
                >
                  actualizar
                </button>
                <button
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  type="button"
                  style={{ background: "#00a6ff", border: "none" }}
                >
                  agregar
                </button>
              </div>
            </div>

            <section className="containerSensors">
              {data.map((sensor) => (
                <div className="cartSensor" key={sensor.id}>
                  <h2> {sensor.name}</h2>
                  <p>
                    tipo de sensor : <span> {sensor.type} </span>{" "}
                  </p>
                  <p>
                    Ubicasion : <span>{sensor.name} </span>{" "}
                  </p>
                  <p>
                    valor :{" "}
                    <span style={{ fontWeight: "bold", fontSize: "2rem" }}>
                      {convertMed(sensor.value)}
                      {sensor.type === "gas"
                        ? " ppm"
                        : sensor.type === "temperatura"
                        ? " ºC"
                        : "%"}
                    </span>{" "}
                  </p>

                  <div style={{ fontSize: "1.4rem" }}>
                    {sensor.type == "gas" ? (
                      <p style={{ color: getColorForGas(sensor.value) }}>
                        {renderGasMessage(sensor.value)}
                      </p>
                    ) : sensor.type == "temperatura" ? (
                      <p style={{ color: getColorForTemp(sensor.value) }}>
                        {renderTempMessage(sensor.value)}
                      </p>
                    ) : (
                      <p style={{ color: getColorForHumedad(sensor.value) }}>
                        {renderHumedadMessage(sensor.value)}
                      </p>
                    )}
                  </div>

                  <p>
                    ultima actualizacion :{" "}
                    <span> {formatDate(sensor.updatedAt)} </span>
                  </p>
                  <div className="modSensor">
                    <button
                      onClick={() => selectSensor(sensor)}
                      type="button"
                      style={{
                        background: "#00a6ff",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      actualizar
                    </button>
                    <button
                      onClick={() => deleteSensor(sensor.id)}
                      type="button"
                      style={{
                        background: "#ff0f36",
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      eliminar
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </section>

        {isOpen && (
          <div className="addSensor">
            <form onSubmit={handleSubmit(sendForm)}>
              <input
                {...register("name")}
                type="text"
                placeholder="ubicasion"
              />
              <input
                {...register("value")}
                type="text"
                placeholder="valor inicial"
              />
              <input {...register("status")} type="text" placeholder="estado" />
              <input
                {...register("type")}
                type="text"
                placeholder="tipo de sensor"
              />
              <div className="buttonSM">
                <button style={{ background: "#00a6ff", border: "none" }}>
                  {sensorSelected ? "Actualizar" : "Crear"}
                </button>
                <button
                  style={{ background: "#08baff", border: "none" }}
                  type="button"
                  onClick={clearData}
                >
                  cancelar
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </>
  );
};

export default Profile;
