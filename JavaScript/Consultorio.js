import { CredencialAcceso } from "./TodoCode.js";
import { Medico } from "./TodoCode.js";
import { Asistente } from "./TodoCode.js";
import { Login } from "./TodoCode.js";
import { GestionCita } from "./TodoCode.js";

// Credencial de acceso para el médico
var credencialAccesoMedico = new CredencialAcceso("DrMendez", "Strlla16");

//Creando el objeto de GestionCita
var objGestion = new GestionCita();

// Datos personales y profesionales del médico
export var medico = new Medico("Juan de Dios", credencialAccesoMedico, 12345678, "Medicina General", "Dr", objGestion);

//Credencial acceso para el asistente
var credencialAccesoAsistente = new CredencialAcceso("DieguitoM", "Sharkmind");

//Datos personales del asistente
export var asistente = new Asistente("Diego Morales", credencialAccesoAsistente);

var login = new Login();
login.listaUsuarios = medico;
login.listaUsuarios = asistente;

document.addEventListener('DOMContentLoaded', function () {
    let btnIniciarSesion = document.getElementById("inicioSesion");

    btnIniciarSesion.addEventListener("click", function () {
        let usuario = document.getElementById("usuario").value;
        let contraseña = document.getElementById("contraseña").value;

        let persona = login.autenticarAcceso(usuario, contraseña);

        if (persona == null) {
            Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.'
            });
            document.getElementById("usuario").value = "";
            document.getElementById("contraseña").value = "";
        } else {
            document.getElementById("usuario").value = "";
            document.getElementById("contraseña").value = "";
            if (persona.nombre === "Juan de Dios") {
                window.location = "realizarTratamiento.html";
            } else {
                window.location = "citas.html";
            }
        }
    });
});
