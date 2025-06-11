import React from "react";

function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="card shadow-sm p-3 mb-4">
      <div className="d-flex align-items-center">
        <img
          src={contact.avatar || "https://via.placeholder.com/80"} // imagen por defecto
          alt={contact.name}
          className="rounded-circle me-4"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />

        <div className="flex-grow-1">
          <p className="mb-1"><strong>Nombre:</strong> {contact.name}</p>
          <p className="mb-1"><strong>Teléfono:</strong> {contact.phone || "—"}</p>
          <p className="mb-0"><strong>Email:</strong> {contact.email}</p>
        </div>

        <div className="ms-4">
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => onEdit(contact)}
          >
            Editar
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(contact.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
