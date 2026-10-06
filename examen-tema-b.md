# Examen Parcial TLP IV — Parte práctica · Tema B

**Duración:** 1,5 horas · **Valor:** 60% de la nota final

Para aprobar la parte práctica hay que resolver correctamente **al menos 2 de los 3 ejercicios**. La parte práctica solo se corrige si la parte teórica está aprobada.

> **Hora de entrega:** se informa en clase. El **último commit** del repositorio no puede ser posterior a esa hora.

---

## Preparación del proyecto

Armá el proyecto desde cero en una carpeta llamada `parcial-tlp4-<apellido>`:

1. Generá el `package.json` y cambiá `"type"` a `"module"`.
2. Instalá TypeScript como dependencia de desarrollo (instalación local).
3. Creá el `tsconfig.json` con estas opciones: `strict`, `noEmit`, `erasableSyntaxOnly`, `allowImportingTsExtensions`, `skipLibCheck`, `target: es2022`, `module` y `moduleResolution` en `nodenext`.
4. Creá un `.gitignore` que excluya `node_modules/`.
5. Creá un archivo `ENTREGA.md` con tu apellido, nombre, DNI, **Tema B** y la URL del repositorio.

```
parcial-tlp4-<apellido>/
├── .gitignore
├── ENTREGA.md
├── package.json
├── package-lock.json
├── tsconfig.json
└── src/
    ├── ejercicio1.ts
    ├── ejercicio2.ts
    └── ejercicio3.ts
```

---

## Git y GitHub

### Configuración del repositorio

1. Creá en GitHub un repositorio **privado** llamado `parcial-tlp4-<apellido>`.
2. Agregá a los cuatro profesores como colaboradores, invitándolos por correo desde **Settings → Collaborators → Add people**:
   - `alesanabri4@gmail.com`
   - `augustochavesfiore@gmail.com`
   - `agustinmcenturion@gmail.com`
   - `cristiand.gonzalez094@gmail.com`

Si el repositorio es público, o si falta algún profesor como colaborador, la entrega no se corrige.

### Puntos de control

Cada punto de control es un commit **con el mensaje exacto indicado**, seguido de `git push`. Podés hacer todos los commits intermedios que quieras.

| #   | Momento                                        | Mensaje del commit                    |
| --- | ---------------------------------------------- | ------------------------------------- |
| 0   | Proyecto configurado y `npx tsc` corriendo     | `chore: configuración inicial`        |
| 1   | Ejercicio 1 terminado                          | `feat(ej1): ejercicio 1 completo`     |
| 2   | Ejercicio 2 terminado                          | `feat(ej2): ejercicio 2 completo`     |
| 3   | Código original del ejercicio 3 copiado, antes de refactorizar | `chore(ej3): código original` |
| 4   | Ejercicio 3 terminado                          | `refactor(ej3): ejercicio 3 completo` |
| 5   | `ENTREGA.md` con los ejercicios resueltos      | `docs: entrega final`                 |

El orden de los puntos 1 a 4 es libre: podés empezar por el ejercicio que prefieras.

### Reglas de la entrega

- Solo se corrige lo que esté **subido a GitHub** en la rama `main`.
- El **último commit no puede superar la hora de entrega** informada en clase. Lo que se suba después no se tiene en cuenta.
- Un ejercicio sin su commit de punto de control se considera no entregado.
- No se aceptan entregas por otro medio.

---

## Reglas del código

- `npx tsc` tiene que terminar **sin errores**.
- Cada ejercicio se debe ejecutar correctamente y mostrar su salida por consola.
- No se permite usar `enum`, _parameter properties_ (`constructor(private x: string)`) ni `any`.
- Cada archivo termina con un bloque de prueba que reproduce la salida esperada.

Un ejercicio está **resuelto correctamente** cuando `npx tsc` está limpio, el archivo corre sin errores, cumple todos los requisitos y su commit de punto de control está en GitHub antes de la hora de entrega.

---

## Ejercicio 1 — Hotel

**Temas:** clase abstracta, herencia, polimorfismo, `readonly`, `private`, `static`, getter.

Un hotel registra las habitaciones ocupadas y calcula cuánto paga cada una.

1. Clase abstracta `Habitacion` con `numero: number` como `readonly` (se recibe en el constructor) y un método abstracto `calcularPrecio(noches: number): number`.
2. Dos subclases que extienden `Habitacion`: `Simple` ($20000 por noche) y `Suite` ($50000 por noche).
3. Clase `Hotel` con:
   - Un arreglo **privado** de `Habitacion`.
   - `checkIn(habitacion: Habitacion): void`: lo agrega al arreglo.
   - Un atributo `static` que cuente cuántos ingresaron en total.
   - Un getter `cantidad` que devuelva cuántos hay en el arreglo.
   - `mostrarPrecios(noches: number): void`: recorre el arreglo y muestra cuánto paga cada uno, llamando al método de cada objeto (sin `if` por tipo).

**Salida esperada** (una simple y una suite, 2 noches):

```
Habitación 101 paga $40000
Habitación 303 paga $100000
Habitaciones ocupadas: 2
Total histórico de check-ins: 2
```

---

## Ejercicio 2 — Envíos de una empresa de paquetería

**Temas:** interfaces, Singleton, Factory Method.

Una empresa de paquetería hace envíos estándar y express.

1. **Singleton** `ConfiguracionEmpresa`: constructor privado, método estático `obtenerInstancia()` y un atributo `readonly recargoExpress = 2500`.
2. Interfaz `Envio` con el método `calcularCosto(base: number): number`.
3. Dos clases que implementan `Envio`:
   - `EnvioEstandar`: devuelve la base.
   - `EnvioExpress`: devuelve la base más el `recargoExpress` **leído del Singleton**.
4. **Factory** `FabricaEnvios` con un método estático `crear(tipo: "estandar" | "express"): Envio`. Fuera de la fábrica nadie usa `new EnvioEstandar` ni `new EnvioExpress`.

**Salida esperada** (base de $3000 en los dos envíos):

```
Mismo Singleton: true
Estándar: $3000
Express: $5500
```

---

## Ejercicio 3 — Refactorizar un servicio de notificaciones

**Temas:** principios SOLID: Abierto/Cerrado (OCP) e Inversión de Dependencia (DIP).

Este código funciona, pero tiene dos problemas: cada opción nueva obliga a agregar otro `if`, y la clase crea su propia dependencia concreta. Copialo en `src/ejercicio3.ts`, hacé el commit del punto de control 3 y después refactorizalo.

```ts
class ArchivoLog {
  escribir(linea: string): void {
    console.log(`[LOG] ${linea}`);
  }
}

class ServicioNotificaciones {
  notificar(canal: string, mensaje: string): void {
    let costo = 0;
    if (canal === "sms") {
      costo = 15;
    }
    const log = new ArchivoLog();
    log.escribir(`${canal}: "${mensaje}" ($${costo})`);
  }
}

const servicio = new ServicioNotificaciones();
servicio.notificar("email", "Hola");
servicio.notificar("sms", "Hola");
```

1. **OCP:** creá la interfaz `Canal` (con `nombre` y `calcularCosto(): number`) y una clase por cada opción: `Email` ($0) y `SMS` ($15). `ServicioNotificaciones.notificar` recibe un `Canal` y no tiene ningún `if`.
2. **DIP:** `ServicioNotificaciones` no crea `ArchivoLog`. Recibe por constructor una interfaz `Registro`, con dos implementaciones: `RegistroArchivo` (muestra `[LOG] ...`) y `RegistroBaseDeDatos` (muestra `[DB] ...`).
3. Arriba de cada interfaz nueva, un comentario de una línea indicando qué principio aplica.

**Salida esperada:**

```
[LOG] Email: "Hola" ($0)
[LOG] SMS: "Hola" ($15)
[DB] Email: "Prueba" ($0)
```

---
