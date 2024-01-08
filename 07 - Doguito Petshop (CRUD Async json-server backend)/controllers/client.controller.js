import { clientServices } from "../services/client-service.js";

const table = document.querySelector("[data-table]")

const crearNuevaLinea = (nombre,email, id) => {
    const linea = document.createElement("tr")
    const content = `<tr>
    <td class="td" data-td>
    ${nombre}
    </td>
    <td>${email}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a
            href="../screens/editar_cliente.html?id=${id}"
            class="simple-button simple-button--edit"
            >Editar</a
          >
        </li>
        <li>
          <button
            class="simple-button simple-button--delete"
            type="button"
            id = "${id}"
          >
            Eliminar
          </button>
        </li>
      </ul>
    </td>
  </tr>`

  linea.innerHTML = content
  const btn = linea.querySelector("button")
  btn.addEventListener("click", () => {
      const id= btn.id
      clientServices.eliminarCliente(id).then(respuesta => {
        console.log('repuesta :>> ', repuesta);
        btn.classList.add("readyToDelete")
      }).catch(error => console.log('error :>> ', error))
  })
  return linea
}

clientServices.listaClientes()
.then((data) => {
  data.forEach(({nombre,email,id}) => {
    const row = crearNuevaLinea(nombre, email, id)
    table.appendChild(row)
  })
}).catch((error) => console.log("Ocurrio un error:" + error))



