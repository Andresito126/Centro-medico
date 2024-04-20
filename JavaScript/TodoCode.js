import { medico } from "./Consultorio.js";

export class CredencialAcceso {
  constructor(usuario, contraseña) {
    this._usuario = usuario;
    this._contraseña = contraseña;
  }

  get usuario() {
    return this._usuario;
  }

  set usuario(usuario) {
    this._usuario = usuario;
  }

  get contraseña() {
    return this._contraseña;
  }

  set contraseña(contraseña) {
    this._contraseña = contraseña;
  }
}

class Persona {
  constructor(nombre, credencialAcceso) {
    this._nombre = nombre;
    this._credencialAcceso = credencialAcceso;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nombre) {
    this._nombre = nombre;
  }

  get credencialAcceso() {
    return this._credencialAcceso;
  }

  set credencialAcceso(credencialAcceso) {
    this._credencialAcceso = credencialAcceso;
  }
}

export class Medico extends Persona {
  constructor(
    nombre,
    credencialAcceso,
    cedulaProfesional,
    especialidad,
    titulo,
    objGestion
  ) {
    super(nombre, credencialAcceso);
    this._cedulaProfesional = cedulaProfesional;
    this._especialidad = especialidad;
    this._titulo = titulo;
    this._objGestion = objGestion;
  }

  get cedulaProfesional() {
    return this._cedulaProfesional;
  }

  set cedulaProfesional(cedulaProfesional) {
    this._cedulaProfesional = cedulaProfesional;
  }

  get especialidad() {
    return this._especialidad;
  }

  set especialidad(especialidad) {
    this._especialidad = especialidad;
  }

  get titulo() {
    return this._titulo;
  }

  set titulo(titulo) {
    this._titulo = titulo;
  }

  get objGestion() {
    return this._objGestion;
  }

  set objGestion(objGestion) {
    this._objGestion = objGestion;
  }

  realizarTratamiento(paciente, listaPacientes){
    let nombre = document.getElementById('nombrePaciente');
    let fecha = document.getElementById('fechaAsignada');
    let hora = document.getElementById('horaAsignada');

    console.log(listaPacientes)
    console.log(paciente._nombre);
        
    nombre.value = paciente._nombre;

    let fechaCita = paciente._cita._fecha;
    fecha.value = fechaCita;

    let horaCita = paciente._cita._hora;
    hora.value = horaCita;

    let receta = new RecetaMedica();
    receta._fecha = fechaCita;
    receta._hora = horaCita;

    document.getElementById("medicamento").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();

        var nuevoMedicamento = this.value.trim();
        console.log(nuevoMedicamento)

        if (nuevoMedicamento !== "") {
          receta._listaMedicamentos.push(nuevoMedicamento);
          this.value = "";
        }
      }
    });

    paciente._receta = receta;

    console.log(paciente._receta)
    
    let terminarProcesoT = document.getElementById('generar-tratamiento');

    terminarProcesoT.addEventListener("click",()=>{
      let apellidoPaterno = document.getElementById('paterno').value;
      let apellidoMaterno = document.getElementById('materno').value;
      console.log(apellidoPaterno)
      paciente._apellidoPaterno = apellidoPaterno;
      paciente._apellidoMaterno = apellidoMaterno;

      console.log(paciente._apellidoPaterno);
      console.log(paciente._apellidoMaterno);

      localStorage.setItem("listaPacientes", JSON.stringify(listaPacientes));

      medico.objGestion.eliminarCitaRealizada(paciente);
      console.log(paciente)
      document.getElementById("buscarPaciente").value = "";
      document.getElementById('nombrePaciente').value = "";
      document.getElementById('paterno').value = "";
      document.getElementById('materno').value  = "";
      document.getElementById('fechaAsignada').value = "";
      document.getElementById('horaAsignada').value = "";
      window.location.href = 'realizarTratamiento.html'
    });
  }
}

export class Asistente extends Persona {
  constructor(nombre, credencialAcceso) {
    super(nombre, credencialAcceso);
  }
}

export class Login {
  constructor() {
    this._listaUsuarios = [];
  }

  get listaUsuarios() {
    return this._listaUsuarios;
  }

  set listaUsuarios(usuario) {
    this._listaUsuarios.push(usuario);
  }

  autenticarAcceso(usuario, contraseña) {
    for (let i = 0; i < this._listaUsuarios.length; i++) {
      if (
        usuario === this._listaUsuarios[i].credencialAcceso.usuario &&
        contraseña === this._listaUsuarios[i].credencialAcceso.contraseña
      ) {
        return this._listaUsuarios[i];
      }
    }

    return null;
  }
}

export class GestionCita {
  constructor() {
    this._listaPacientes = new ListaEnlazada();
    this.recuperarListaEnlazada();
  }

  get listaPacientes() {
    return this._listaPacientes;
  }

  agregarCita() {
    let paciente = new Paciente();
    let nombrePaciente = document.getElementById("nombrePaciente").value;
    let idPaciente = document.getElementById("idPaciente").value;
    let numeroTelefono = document.getElementById("numTelefono").value;
    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let costo = document.getElementById("valorAPagar").value;

    if (nombrePaciente.trim() === "" || idPaciente.trim() === "" || numeroTelefono.trim() === "" || fecha.trim() === "" || hora.trim() === "" || costo.trim() === "") {
      Swal.fire({
        title: "Todos los campos deben estar llenos",
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

      document.getElementById("nombrePaciente").value = "";
      document.getElementById("idPaciente").value = "";
      document.getElementById("numTelefono").value = "";
      document.getElementById("fecha").value = "";
      document.getElementById("hora").value = "";
      document.getElementById("valorAPagar").value = "";
    }

    else{
      paciente.nombre = nombrePaciente;
      paciente.idPaciente = idPaciente;
      paciente.numeroTelefono = numeroTelefono;

      let cita = new Cita(fecha, hora, costo);

      paciente.cita = cita;

      this._listaPacientes.agregandoAlFinal(paciente);
      localStorage.setItem(
        "listaPacientes",
        JSON.stringify(this._listaPacientes)
      );

      let aux = this._listaPacientes.inicio;
      while (aux !== null) {
        console.log(aux._paciente._nombre + " " + aux._paciente._cita._fecha);
        aux = aux._siguiente;
      }

      Swal.fire({
        title: "Cita añadida exitosamente",
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

      document.getElementById("nombrePaciente").value = "";
      document.getElementById("idPaciente").value = "";
      document.getElementById("numTelefono").value = "";
      document.getElementById("fecha").value = "";
      document.getElementById("hora").value = "";
      document.getElementById("valorAPagar").value = "";
    }

  }

  recuperarListaEnlazada() {
    const listaEnlazadaData = JSON.parse(
      localStorage.getItem("listaPacientes")
    );
    if (listaEnlazadaData) {
      let current = listaEnlazadaData.inicio;
      while (current !== null) {
        const paciente = new Paciente();
        Object.assign(paciente, current._paciente);
        this._listaPacientes.agregandoAlFinal(paciente);
        current = current._siguiente;
      }
    }
  }

  verCitasProgramadas() {
    this._listaPacientes.ordenarListaEnlazada();
    let current = this._listaPacientes.inicio;
    let table = document.getElementById("tablaCitas");

    let principalTabla = document.createElement("thead");
    let filaPrincipal = document.createElement("tr");

    let pacienteId = document.createElement("th");
    pacienteId.innerHTML = "ID del Paciente";
    filaPrincipal.appendChild(pacienteId);

    let fechaCita = document.createElement("th");
    fechaCita.innerHTML = "Fecha";
    filaPrincipal.appendChild(fechaCita);

    let horaCita = document.createElement("th");
    horaCita.innerHTML = "Hora";
    filaPrincipal.appendChild(horaCita);

    principalTabla.appendChild(filaPrincipal);

    let cuerpoTabla = document.createElement("tbody");
    table.innerHTML = "";

    while (current !== null) {
      let fila = document.createElement("tr");

      let tdIdPaciente = document.createElement("td");
      tdIdPaciente.innerHTML = current._paciente._idPaciente;
      fila.appendChild(tdIdPaciente);

      let tdFecha = document.createElement("td");
      tdFecha.innerHTML = current._paciente._cita._fecha;
      fila.appendChild(tdFecha);

      let tdHora = document.createElement("td");
      tdHora.innerHTML = current._paciente._cita._hora;
      fila.appendChild(tdHora);

      cuerpoTabla.appendChild(fila);

      current = current._siguiente;
    }

    table.appendChild(principalTabla)
    table.appendChild(cuerpoTabla);
}

  cancelarCita() {
    let idPacienteCancelar = document.getElementById("citaCancelar").value;
    console.log(idPacienteCancelar);

    if(this._listaPacientes.estaVacia() !== null){
      if(this._listaPacientes.inicio === this._listaPacientes.fin && idPacienteCancelar === this._listaPacientes.inicio._paciente._idPaciente){
          this._listaPacientes.inicio = this._listaPacientes.fin = null;
      }
      
      else if(idPacienteCancelar === this._listaPacientes.inicio._paciente._idPaciente){
          this._listaPacientes.inicio = this._listaPacientes.inicio._siguiente;
      }
      
      else{
          let anterior = this._listaPacientes.inicio;
          let actual = anterior._siguiente;
          
          while(actual !== null && actual._paciente._idPaciente != idPacienteCancelar){
              anterior = anterior._siguiente;
              actual = actual._siguiente;
          }
          
          if(actual !== null){
              anterior._siguiente = actual._siguiente;
              if(actual === this._listaPacientes.fin){
                  this._listaPacientes.fin = anterior;
              }
          }

          else{
              Swal.fire({
                title: "El id no corresponde",
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
      }
    }

    document.getElementById("citaCancelar").value = "";

    localStorage.setItem(
      "listaPacientes",
      JSON.stringify(this._listaPacientes)
    );

    this.verCitasProgramadas();

  }

  eliminarCitaRealizada(paciente){  
    if(this._listaPacientes.estaVacia() !== null){
      if(this._listaPacientes.inicio === this._listaPacientes.fin && paciente._nombre === this._listaPacientes.inicio._paciente._nombre){
          this._listaPacientes.inicio = this._listaPacientes.fin = null;
      }
      
      else if(paciente._nombre === this._listaPacientes.inicio._paciente._nombre){
          this._listaPacientes.inicio = this._listaPacientes.inicio._siguiente;
      }
      
      else{
          let anterior = this._listaPacientes.inicio;
          let actual = anterior._siguiente;
          
          while(actual !== null && actual._paciente._nombre != paciente._nombre){
              anterior = anterior._siguiente;
              actual = actual._siguiente;
          }
          
          if(actual !== null){
              anterior._siguiente = actual._siguiente;
              if(actual === this._listaPacientes.fin){
                  this._listaPacientes.fin = anterior;
              }
          }
      }
    }
    localStorage.setItem("listaPacientes",JSON.stringify(this._listaPacientes));
  }

  buscarCitaPacienteId(){
    let idBusqueda  = document.getElementById("buscarPaciente").value;
    let aux = this._listaPacientes.inicio;
    let bandera = false;

    while (aux !== null) {
      if(idBusqueda === aux._paciente._idPaciente){
        Swal.fire({
          title: "Id encontrado ",
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

        let paciente = aux._paciente;

        medico.realizarTratamiento(paciente, this._listaPacientes)
        bandera = true;
      }
      aux = aux._siguiente;
    }

    if(bandera === false){
      Swal.fire({
        title: "Id incorrecto, verique la escritura o bien, si el paciente está registrado",
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
  }
}

class Paciente {
  constructor(
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    idPaciente,
    numeroTelefono,
    receta,
    cita
  ) {
    this._nombre = nombre;
    this._apellidoPaterno = apellidoPaterno;
    this._apellidoMaterno = apellidoMaterno;
    this._idPaciente = idPaciente;
    this._numeroTelefono = numeroTelefono;
    this._receta = receta;
    this._cita = cita;
  }

  get nombre() {
    return this._nombre;
  }

  set nombre(nombre) {
    this._nombre = nombre;
  }

  get apellidoPaterno() {
    return this._apellidoPaterno;
  }

  set apellidoPaterno(apellidoPaterno) {
    this._apellidoPaterno = apellidoPaterno;
  }

  get apellidoMaterno() {
    return this._apellidoMaterno;
  }

  set apellidoMaterno(apellidoMaterno) {
    this._apellidoMaterno = apellidoMaterno;
  }

  get idPaciente() {
    return this._idPaciente;
  }

  set idPaciente(idPaciente) {
    this._idPaciente = idPaciente;
  }

  get numeroTelefono() {
    return this._numeroTelefono;
  }

  set numeroTelefono(numeroTelefono) {
    this._numeroTelefono = numeroTelefono;
  }

  get receta() {
    return this._receta;
  }

  set receta(receta) {
    this._receta = receta;
  }

  get cita() {
    return this._cita;
  }

  set cita(cita) {
    this._cita = cita;
  }
}

class Cita {
  constructor(fecha, hora, costo) {
    this._fecha = fecha;
    this._hora = hora;
    this._costo = costo;
  }

  get fecha() {
    return this._fecha;
  }

  set fecha(fecha) {
    this._fecha = fecha;
  }

  get hora() {
    return this._hora;
  }

  set hora(hora) {
    this._hora = hora;
  }

  get costo() {
    return this._costo;
  }

  set costo(costo) {
    this._costo = costo;
  }
}

class ListaEnlazada {
  constructor() {
    this.inicio = null;
    this.fin = null;
  }

  estaVacia() {
    return this.inicio === null;
  }

  agregandoAlFinal(paciente) {
    if (this.estaVacia()) {
      this.inicio = new Nodo(paciente);
      this.fin = this.inicio;
    } else {
      this.fin._siguiente = new Nodo(paciente);
      this.fin = this.fin._siguiente;
    }
  }

  ordenarListaEnlazada() {
    let punteroInicio = this.inicio;
    let aux;

    while (punteroInicio !== null) {
      aux = punteroInicio._siguiente;
      while (aux !== null) {
        if (punteroInicio._paciente._cita._fecha > aux._paciente._cita._fecha) {
          let temp = punteroInicio._paciente;
          punteroInicio._paciente = aux._paciente;
          aux._paciente = temp;
        } else if (
          punteroInicio._paciente._cita._fecha === aux._paciente._cita._fecha &&
          punteroInicio._paciente._cita._hora > aux._paciente._cita._hora
        ) {
          let temp = punteroInicio._paciente;
          punteroInicio._paciente = aux._paciente;
          aux._paciente = temp;
        }
        aux = aux._siguiente;
      }
      punteroInicio = punteroInicio._siguiente;
    }
  }
}

class Nodo {
  constructor(paciente) {
    this._paciente = paciente;
    this._siguiente = null;
  }
}

class RecetaMedica {
  constructor(fecha, hora) {
    this._fecha = fecha;
    this._hora = hora;
    this._listaMedicamentos = [];
  }
}
