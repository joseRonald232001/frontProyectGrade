import axios from "axios";
import { useState } from "react";

const useRequest = () => {
  const [data, setData] = useState([]);

  const requestGet = async (url) => {
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      console.error("Error en la solicitud GET:", error);
    }
  };

  const requestPost = async (url, body) => {
    try {
      const res = await axios.post(url, body);
      console.log("Solicitud POST exitosa:", res.data);
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
    }
  };

  const requestPut = async (url, body) => {
    try {
      const res = await axios.put(url, body);
      console.log("Solicitud PUT exitosa:", res.data);
    } catch (error) {
      console.error("Error en la solicitud PUT:", error);
    }
  };

  const requestDelete = async (url) => {
    try {
      const res = await axios.delete(url);
      console.log("Solicitud delete exitosa:", res.data);
    } catch (error) {
      console.error("Error en la solicitud delete:", error);
    }
  };
  return { data, requestGet, requestPost, requestPut,requestDelete };
};

export default useRequest;
