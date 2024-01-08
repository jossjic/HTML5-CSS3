const listaClientes = () => 
  fetch("http://localhost:3000/perfil").then((res) => res.json()) 

  const crearCliente = (nombre, email) => {
    return fetch("http://localhost:3000/perfil", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({nombre, email, id: uuid.v4()})
    })
  }

  const eliminarCliente = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`, {
      method: "DELETE"
    })
  }
  
const detalleCliente = (id) => {
  return fetch(`http://localhost:3000/perfil/${id}`).then((res) => res.json())
}

const actualizarCliente = (id, nombre, email) => {
  return fetch(`http://localhost:3000/perfil/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({nombre, email})
  })
}

export const clientServices = {
  listaClientes,
  crearCliente,
  eliminarCliente,
  detalleCliente,
  actualizarCliente,
}