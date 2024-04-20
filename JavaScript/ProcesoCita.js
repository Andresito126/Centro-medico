import { medico } from "./Consultorio.js";
import { asistente } from "./Consultorio.js";

var nombre_Usuario = document.getElementById("usuario_nombre");
nombre_Usuario.innerHTML = "USUARIO: "+ asistente.credencialAcceso.usuario;

var date = new Date();
var dia = date.getDate();
var mes = date.getMonth() + 1;
var año = date.getFullYear();

var fechaActual = document.getElementById("fechaActual");
fechaActual.innerHTML = "FECHA ACTUAL: " + dia + "/" + mes + "/" + año;

document.addEventListener('DOMContentLoaded', function() {
    let anadir = document.getElementById("añadirCita");
    anadir.addEventListener("click",function(){
        medico.objGestion.agregarCita();
    })
});



