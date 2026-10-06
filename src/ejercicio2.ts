class ConfiguracionEmpresa {
  private static instancia: ConfiguracionEmpresa | null = null;
  readonly recargoExpress: number = 2500;

  private constructor() {}

  static obtenerInstancia(): ConfiguracionEmpresa {
    if (ConfiguracionEmpresa.instancia === null) {
      ConfiguracionEmpresa.instancia = new ConfiguracionEmpresa();
    }
    return ConfiguracionEmpresa.instancia;
  }
}

interface Envio {
  calcularCosto(base: number): number;
}

class EnvioEstandar implements Envio {
  calcularCosto(base: number): number {
    return base;
  }
}

class EnvioExpress implements Envio {
  calcularCosto(base: number): number {
    const config = ConfiguracionEmpresa.obtenerInstancia();
    return base + config.recargoExpress;
  }
}

class FabricaEnvios {
  static crear(tipo: "estandar" | "express"): Envio {
    if (tipo === "estandar") {
      return new EnvioEstandar();
    }
    return new EnvioExpress();
  }
}

const config1 = ConfiguracionEmpresa.obtenerInstancia();
const config2 = ConfiguracionEmpresa.obtenerInstancia();
console.log(`Mismo Singleton: ${config1 === config2}`);

const envioEstandar = FabricaEnvios.crear("estandar");
const envioExpress = FabricaEnvios.crear("express");

console.log(`Estándar: $${envioEstandar.calcularCosto(3000)}`);
console.log(`Express: $${envioExpress.calcularCosto(3000)}`);