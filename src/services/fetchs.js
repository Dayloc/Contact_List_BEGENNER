const API_URL = "https://playground.4geeks.com/contact";

//----------------------1

export async function obtenerAgendas(dispatch) {
  try {
    const response = await fetch(`${API_URL}/agendas`);
    if (!response.ok) {
      throw new Error("Error al obtener las agendas");
    }
    const data = await response.json();
    dispatch({
      type: "guardar_agendas",
      payload: data.agendas,
    });
  } catch (error) {
    console.error("Error al cargar las agendas:", error);
  }
}

//----------------------2

export async function crearAgenda(slug, dispatch) {
  try {
    const response = await fetch(`${API_URL}/agendas/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Respuesta de la API:", response); // Depuración

    if (!response.ok) {
      throw new Error(errorData.message || "Error al crear la agenda");
    }

    const data = await response.json();
    console.log("Agenda creada:", data); // Depuración

    // Despacha la acción para agregar la nueva agenda al estado
    dispatch({
      type: "guardar_agendas",
      payload: data, // La nueva agenda creada
    });

    return data; // Devuelve la agenda creada
  } catch (error) {
    console.error("Error al crear la agenda, o ya existe :", error); // Depuración
  }
}

//--------------------------3

export async function obtenerContactos(dispatch, slug) {
  try {
    const response = await fetch(`${API_URL}/agendas/${slug}`);
    if (!response.ok) {
      throw new Error("Error al obtener los contactos");
    }
    const data = await response.json();
    console.log("Contactos obtenidos:", data); // Depuración
    dispatch({
      type: "guardar_contactos",
      payload: data.contacts,
    });
  } catch (error) {
    console.error("Error al obtener los contactos:", error);
  }
}

//-----------------------------4

export async function crearContacto(contacto, dispatch, slug) {
  try {
    const response = await fetch(`${API_URL}/agendas/${slug}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contacto),
    });
    if (!response.ok) {
      throw new Error("Error al crear el contacto");
    }
    const data = await response.json();
    dispatch({
      type: "agregar_contacto",
      payload: data,
    });
  } catch (error) {
    console.error("Error al crear el contacto:", error);
  }
}

//------------------------5

export async function actualizarContacto(contacto, dispatch, slug) {
  try {
    const response = await fetch(
      `${API_URL}/agendas/${slug}/contacts/${contacto.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contacto),
      }
    );
    if (!response.ok) {
      throw new Error("Error al actualizar el contacto");
    }
    const data = await response.json();
    dispatch({
      type: "actualizar_contacto",
      payload: data,
    });
  } catch (error) {
    console.error("Error al actualizar el contacto:", error);
  }
}

//------------------------6

export async function eliminarContacto(id, dispatch, slug) {
  try {
    const response = await fetch(`${API_URL}/agendas/${slug}/contacts/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el contacto");
    }
    dispatch({
      type: "eliminar_contacto",
      payload: id,
    });
  } catch (error) {
    console.error("Error al eliminar el contacto:", error);
  }
}

//------------------------7
export async function deleteAgenda(slug, dispatch) {
  try {
    const response = await fetch(`${API_URL}/agendas/${slug}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar la agenda");
    }

    dispatch({
      type: "eliminar_agenda",
      payload: slug,
    });
  } catch (error) {
    console.error("Error al eliminar la agenda:", error);
  }
}
