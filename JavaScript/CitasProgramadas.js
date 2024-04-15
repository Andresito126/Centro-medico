import { medico } from "./Consultorio.js";
import { asistente } from "./Consultorio.js";

var nombre_Asis = asistente.nombre;
var persona = document.getElementById("personaAte");
persona.innerHTML = "<br><br>PERSONA QUIEN ATENDIO: " + nombre_Asis;

var date = new Date();
var dia = date.getDate();
var mes = date.getMonth() + 1;
var año = date.getFullYear();

var fechaActualC = document.getElementById("fechaHoy");
fechaActualC.innerHTML = "<br>FECHA ACTUAL: " + dia + "/" + mes + "/" + año;
