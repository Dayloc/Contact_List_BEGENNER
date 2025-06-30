import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { crearAgenda, obtenerAgendas } from "../services/fetchs.js";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const { agendas } = store;
  const navigate = useNavigate();
  const myUser = "Dayloc";

  useEffect(() => {
   
    obtenerAgendas(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (agendas !== null && agendas.length > 0) {
      handleCreateAgenda();
    }
  }, [agendas]);

  const handleCreateAgenda = async () => {
    const alreadyExists = agendas.some((a) => a.slug === myUser);
    if (alreadyExists) {
      navigate(`/contacts/${myUser}`);
    } else {
      await crearAgenda(myUser, dispatch);
      alert("Su agenda no estaba en la lista de agendas y ha sido creada con éxito");
      navigate(`/contacts/${myUser}`);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light py-4">
      <h1>Lista de Contactos</h1>
    </div>
  );
};
