// Principio Abierto/Cerrado (OCP)
interface Canal {
  nombre: string;
  calcularCosto(): number;
}

class Email implements Canal {
  readonly nombre: string = "Email";

  calcularCosto(): number {
    return 0;
  }
}

class SMS implements Canal {
  readonly nombre: string = "SMS";

  calcularCosto(): number {
    return 15;
  }
}

// Principio de Inversión de Dependencia (DIP)
interface Registro {
  escribir(linea: string): void;
}

class RegistroArchivo implements Registro {
  escribir(linea: string): void {
    console.log(`[LOG] ${linea}`);
  }
}

class RegistroBaseDeDatos implements Registro {
  escribir(linea: string): void {
    console.log(`[DB] ${linea}`);
  }
}

class ServicioNotificaciones {
  private registro: Registro;

  constructor(registro: Registro) {
    this.registro = registro;
  }

  notificar(canal: Canal, mensaje: string): void {
    this.registro.escribir(`${canal.nombre}: "${mensaje}" ($${canal.calcularCosto()})`);
  }
}

// Bloque de prueba
const registroArchivo = new RegistroArchivo();
const servicioArchivo = new ServicioNotificaciones(registroArchivo);

const email = new Email();
const sms = new SMS();

servicioArchivo.notificar(email, "Hola");
servicioArchivo.notificar(sms, "Hola");

const registroBD = new RegistroBaseDeDatos();
const servicioBD = new ServicioNotificaciones(registroBD);
servicioBD.notificar(email, "Prueba");