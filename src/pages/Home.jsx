import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import {  crearAgenda,  obtenerAgendas,  deleteAgenda,} from "../services/fetchs.js";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const { agendas } = store;
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();
  const myUser="Dayloc"
  useEffect(() => {
    obtenerAgendas(dispatch);
  }, [dispatch]);


const handleCreateAgenda = async () => {
  if (!slug.trim()) return;
  if (slug!== myUser){
    alert("Ese no es su nombre de usuario")
    setSlug("")
    return;
  }else{
    const alreadyExists = agendas.some((a) => a.slug === myUser);
     if (alreadyExists) {
    alert("Lo dirijo hacia su agenda!!")
    navigate(`/contacts/${slug}`)
    setSlug(""); 
    }else{
      await crearAgenda(myUser, dispatch);

      alert("Agenda creada con éxito");
      setSlug("");
      navigate(`/contacts/${slug}`);
    }}}
 
 


console.log("Agendas:", agendas); // Depuración
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light py-4">
      <h1 className="mb-4 fw-bold">Cree su Agenda</h1>

      <div className="card shadow p-4 w-100" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese su nombre Agenda"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreateAgenda();
            }}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={() => handleCreateAgenda()}
        >
          Crear Agenda
        </button>
      </div>

      <div className="mt-5 w-100" style={{ maxWidth: "400px" }}>
        <h5 className="mb-3">Nombres de agendas no disponibles:</h5>
        <ul className="list-group">
          {Array.isArray(agendas) &&
            agendas.map((agenda, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{agenda.slug}</span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={async () => {
                    await deleteAgenda(agenda.slug, dispatch);
                    await obtenerAgendas(dispatch);
                  }}
                >
                  Eliminar
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
