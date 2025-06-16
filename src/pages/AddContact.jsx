import React, { useEffect, useState } from "react";
import { crearContacto, actualizarContacto } from "../services/fetchs";
import useGlobalReducer from "./../hooks/useGlobalReducer";
import { useNavigate, useParams } from "react-router-dom";

function AddContact() {
  const { store, dispatch } = useGlobalReducer();
  const { slug, id } = useParams(); // `slug` y `id` vienen de la URL
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // Si hay `id`, buscar el contacto para editar
  useEffect(() => {
    if (id) {
      const contactoExistente = store.contactos.find(
        (c) => c.id === parseInt(id)
      );
      if (contactoExistente) {
        setContact(contactoExistente);
      }
    }
  }, [id, store.contactos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await actualizarContacto(contact, dispatch, slug);
    } else {
      await crearContacto(contact, dispatch, slug);
    }

    navigate(`/contacts/${slug}`);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">
            {id ? "Editar Contacto" : "Agregar Contacto"}
          </h1>
          <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Nombre"
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Teléfono
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Teléfono"
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Dirección"
                value={contact.address}
                onChange={(e) =>
                  setContact({ ...contact, address: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              {id ? "Actualizar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddContact;
