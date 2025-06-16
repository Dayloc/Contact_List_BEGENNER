//ESto es dla parte de almacenaje
export const initialStore = () => {
  return {
    message: null,
    agendas: [],
    contactos: [],
  };
};
//parte donde gestiono el almacenaje
export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "guardar_agendas":
      return {
        ...store,
        agendas: action.payload,
      };
    case "guardar_contactos":
      return {
        ...store,
        contactos: action.payload,
      };
    case "agregar_contacto":
      return {
        ...store,
        contactos: [...store.contactos, action.payload],
      };
    case "actualizar_contacto":
      return {
        ...store,
        contactos: store.contactos.map((contacto) =>
          contacto.id === action.payload.id ? action.payload : contacto
        ),
      };
    case "eliminar_contacto":
      return {
        ...store,
        contactos: store.contactos.filter(
          (contacto) => contacto.id !== action.payload
        ),
      };

    
    case "eliminar_agenda":
      return {
        ...store,
        agendas: store.agendas.filter(
          (agenda) => agenda.slug !== action.payload
        ),
      };
    default:
      throw Error("Unknown action.");
  }
}
