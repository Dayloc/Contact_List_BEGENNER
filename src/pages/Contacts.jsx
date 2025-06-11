import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { obtenerContactos, eliminarContacto } from "../services/fetchs.jsx";
import mujer from "../assets/img/mujer.jpg"; // Asegúrate de que la ruta sea correcta

function Contacts() {
  const { store, dispatch } = useGlobalReducer();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    obtenerContactos(dispatch, slug);
  }, [dispatch, slug]);

  const contactos = store.contactos;

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center text-primary">
        Agenda de <span className="text-dark">{slug}</span>
      </h1>

      <div className="text-center mb-4">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-contact/" + slug)}
        >
          Add Contact
        </button>
      </div>

      {contactos.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No hay contactos en esta agenda.
        </div>
      ) : (
        <div className="row">
          {contactos.map((contacto) => (
            <div className="col-12 mb-3" key={contacto.id}>
              <div className="card p-3 shadow-sm">
                <div className="d-flex align-items-center justify-content-between">
                  {/* Imagen */}
                  <div className="d-flex align-items-center">
                    <img
                      src={mujer}
                      alt={contacto.name}
                      className="rounded-circle me-3"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />

                    {/* Información */}
                    <div>
                      <p className="mb-1">
                        <strong>Nombre:</strong> {contacto.name}
                      </p>
                      <p className="mb-1">
                        <strong>Teléfono:</strong> {contacto.phone || "—"}
                      </p>
                      <p className="mb-0">
                        <strong>Email:</strong> {contacto.email}
                      </p>
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="text-end">
                    <button
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={() => navigate(`/edit-contact/${slug}/${contacto.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={async () => {
                        await eliminarContacto(contacto.id, dispatch, slug);
                        await obtenerContactos(dispatch, slug);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Contacts;
