import { medico } from "./Consultorio.js";

var date = new Date();
var dia = date.getDate();
var mes = date.getMonth() + 1;
var año = date.getFullYear();

var infoHora = document.getElementById('zonaHoraria');
infoHora.innerHTML = "SUCHIAPA, CHIAPAS <br> FECHA ACTUAL: " + dia + "/" + mes + "/" + año;

var informacionMedico = document.getElementById('infoMedico');
informacionMedico.innerHTML = " &emsp;&emsp;&emsp;&emsp;&emsp;CENTRO MÉDICO 'SAN PEDRO' <br>&emsp; " + medico.titulo + "." + medico.nombre  + "&ensp; &ensp;&ensp;&emsp;&emsp;&emsp;" + "CEDULA PROFESIONAL: " + medico._cedulaProfesional;

var buttonRealizarT = document.getElementById('btn_realizarTratamiento');

buttonRealizarT.addEventListener("click",()=>{
    if(medico.objGestion._listaPacientes.estaVacia()){
        Swal.fire({
            title: "No hay pacientes por atender",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
          });
    }
    
    else{
        window.location.href = 'generarTratamiento.html';
    }
})

var buttonCerrarSesion = document.getElementById('btn_cerrarSesion')

buttonCerrarSesion.addEventListener("click", ()=>{
    window.location.href = 'sesion.html';
})
