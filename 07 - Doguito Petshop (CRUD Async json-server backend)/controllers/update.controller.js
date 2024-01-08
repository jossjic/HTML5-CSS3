import { clientServices } from "../services/client-service.js";


const obtenerCliente = async () => {
    const url = new URL(window.location)
    const id = url.searchParams.get('id')

    if (!id) {
        window.location.href = '/screens/error.html'
    }

    const nombre = document.querySelector('[data-nombre]')
    const email = document.querySelector('[data-email]')

    try {
        const perfil = await clientServices.detalleCliente(id)
        if (perfil.nombre && perfil.email){
            nombre.value = perfil.nombre
            email.value = perfil.email
        } else {
            throw new Error('No se encontró el cliente')
        }
    } catch (error) {console.log('Catch error :>> ', error);
        window.location.href = '../screens/error.html'
}

    
}

const formulario = document.querySelector('[data-form]')
formulario.addEventListener('submit', (event) => {
    event.preventDefault()
    const url = new URL(window.location)
    const id = url.searchParams.get('id')
    const nombre = document.querySelector('[data-nombre]').value
    const email = document.querySelector('[data-email]').value

    clientServices.actualizarCliente(id, nombre, email).then((data) => {
        window.location.href = '../screens/edicion_concluida.html'
    }).catch((error) => {
        console.log('error :>> ', error)
        window.location.href = '../screens/error.html'
    })
})

obtenerCliente();

