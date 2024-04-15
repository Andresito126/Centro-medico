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
    constructor(nombre,credencialAcceso,cedulaProfesional, especialidad,titulo,objGestion) {
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
    }
  
    get listaPacientes() {
      return this._listaPacientes;
    }
  
    listaPacientesVacia() {
      return this._listaPacientes.estaVacia();
    }
  
    agregarCita() {
      let paciente = new Paciente();
      let nombrePaciente = document.getElementById("nombrePaciente").value;
      let idPaciente = document.getElementById("idPaciente").value;
      let numeroTelefono = document.getElementById("numTelefono").value;
      let fecha = document.getElementById("fecha").value;
      let hora = document.getElementById("hora").value;
      let costo = document.getElementById("valorAPagar").value;
  
      paciente.nombre = nombrePaciente;
      paciente.idPaciente = idPaciente;
      paciente.numeroTelefono = numeroTelefono;
  
      let cita = new Cita(fecha, hora, costo);
  
      paciente.cita = cita;   
  
      
      this.listaPacientes.agregarAlInicio(paciente);
  
      console.log(this.listaPacientes.inicio);
  
      document.getElementById("nombrePaciente").value = "";
      document.getElementById("idPaciente").value  = "";
      document.getElementById("numTelefono").value = "";
      document.getElementById("fecha").value = "";
      document.getElementById("hora").value = "";
      document.getElementById("valorAPagar").value = "";
  
      
    }
  
    mostrarNombresPacientes() {
        let nodoActual = this._listaPacientes.inicio;
        while (nodoActual) {
          console.log(nodoActual.paciente.nombre);
          nodoActual = nodoActual.siguiente;
        }
    }
  
    verCitasProgramadas() {
      console.log(this.listaPacientes.inicio)
    }
  
    // ordenarListaEnlazada() {
    //   let punteroInicio = this.listaPacientes.inicio;
    //   let aux;
  
    //   while (punteroInicio != null) {
    //     aux = punteroInicio.siguiente;
    //     while (aux != null) {
    //       if (punteroInicio.paciente.cita.fecha > aux.paciente.cita.fecha) {
    //         let temp = punteroInicio.paciente;
    //         punteroInicio.paciente = aux.paciente;
    //         aux.paciente = temp;
    //       } else if (punteroInicio.paciente.cita.fecha === aux.paciente.cita.fecha && punteroInicio.paciente.cita.hora > aux.paciente.cita.hora) {
    //         let temp = punteroInicio.paciente;
    //         punteroInicio.paciente = aux.paciente;
    //         aux.paciente = temp;
    //       }
    //       aux = aux.siguiente;
    //     }
    //     punteroInicio = punteroInicio.siguiente;
    //   }
    // }
  
    // verCitasProgramadas() {
    //   this.listaPacientes.ordenarListaEnlazada();
    //   let table = document.getElementById("tablaCitas");
    //   let cuerpoTabla = document.createElement('tbody');
  
    //   table.innerHTML = "";
  
    //   let aux = this.listaPacientes.inicio;
  
    //   while(aux != null) {
    //       let fila = document.createElement('tr');
  
    //       let tdIdPaciente = document.createElement('td');
    //       tdIdPaciente.innerHTML = aux.paciente.idPaciente;
    //       fila.appendChild(tdIdPaciente);
  
    //       let tdFecha = document.createElement('td');
    //       tdFecha.innerHTML = aux.paciente.cita.fecha;
    //       fila.appendChild(tdFecha);
  
    //       let tdHora = document.createElement('td');
    //       tdHora.innerHTML = aux.paciente.cita.hora;
    //       fila.appendChild(tdHora);
  
    //       cuerpoTabla.appendChild(fila);
  
    //       aux = aux.siguiente;
    //   }
  
    //   table.appendChild(cuerpoTabla);
    // }
  
    
  
  }
  
  class Paciente {
    constructor(nombre,apellidoPaterno,apellidoMaterno,idPaciente,numeroTelefono,receta,cita) {
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
  
  class Nodo {
    constructor(paciente, siguiente) {
      this._paciente = paciente;
      this._siguiente = siguiente;
    }
  }
  
  class ListaEnlazada {
    constructor() {
        this.inicio = null;
        this.fin = null;
    }
  
    verificarVacio() {
        return this.inicio === null;
    }
  
    agregarAlInicio(paciente) {
        if (this.verificarVacio()) {
            this.inicio = new Nodo(paciente, this.inicio);
            this.fin = this.inicio;
        } else {
            this.inicio = new Nodo(paciente, this.inicio);
        }
    }
  }
  
  class RecetaMedica {
      constructor(fecha, hora, listaMedicamentos) {
        this._fecha = fecha;
        this._hora = hora;
        this._listaMedicamentos = listaMedicamentos;
      }
  }