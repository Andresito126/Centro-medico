import { medico } from "./Consultorio.js";

var informacionMedico = document.getElementById('infoMedico');
informacionMedico.innerHTML = " &emsp;&emsp;&emsp;&emsp;&emsp;CENTRO MÉDICO 'SAN PEDRO' <br>&emsp; " + medico.titulo + "." + medico.nombre  + "&ensp; &ensp;&ensp;&emsp;&emsp;&emsp;" + "CEDULA PROFESIONAL: " + medico._cedulaProfesional;


var date = new Date();
var dia = date.getDate();
var mes = date.getMonth() + 1;
var año = date.getFullYear();



var infoHora = document.getElementById('zonaHoraria');
infoHora.innerHTML = "SUCHIAPA, CHIAPAS <br> FECHA ACTUAL: " + dia + "/" + mes + "/" + año;


var busquedaPaciente = document.getElementById('buscar');
busquedaPaciente.addEventListener("click",()=>{
    medico.objGestion.buscarCitaPacienteId();
    document.getElementById('buscarPaciente').value = "";
});

var regresarSesion = document.getElementById('btnSesion');

regresarSesion.addEventListener("click",()=>{
    window.location.href = 'realizarTratamiento.html';
})

