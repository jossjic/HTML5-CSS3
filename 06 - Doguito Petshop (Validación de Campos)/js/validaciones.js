export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";

  } else {
    input.parentElement.classList.add("input-container--invalid");
    console.log(tipoDeInput)
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input);
  }
}

const errorTypes = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "El nombre es obligatorio",
  },
  email: {
    valueMissing: "El email es obligatorio",
    typeMismatch: "El correo no es valido",
  },
  password: {
    valueMissing: "El password es obligatorio",
    patternMismatch: "La contraseña debe contener al menos 8 caracteres, un número y caracteres especiales",
  },
  nacimiento: {
    valueMissing: "La fecha de nacimiento es obligatoria",
    customError: "Debes tener al menos 18 años de edad",
  },
  numero: {
    valueMissing: "El número de teléfono es obligatorio",
    patternMismatch: "El número de teléfono debe contener 10 dígitos",
  },
}

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mostrarMensajeDeError(tipo,input) {
  let mensaje = "";
  errorTypes.forEach((error) => {
    if (input.validity[error]) {
      console.log(tipo, error);
      console.log(mensajesDeError[tipo][error]);
      mensaje = mensajesDeError[tipo][error];
    }
  });
  return mensaje;
}


function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
}
