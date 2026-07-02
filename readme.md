# Portal de Recibos de Sueldo - Tecnologías del Atlántico S.A.

1. Descripción del proyecto

Este proyecto consiste en un **Portal de Recibos de Sueldo** desarrollado para la empresa *Tecnologías del Atlántico S.A.* El sistema permite a los empleados consultar de forma segura y confidencial sus datos personales y laborales (ID, Nombre, Apellido, Correo Electrónico y Sueldo Actual). 

La autenticación está delegada en Google mediante **Google Identity Services (OAuth 2.0)**, garantizando que solo los usuarios con un correo electrónico registrado previamente en la base de datos de la empresa puedan acceder a la información protegida, eliminando la necesidad de gestionar contraseñas locales.

---

2. Requisitos previos

Para ejecutar e instalar este proyecto localmente, se requiere lo siguiente:
*   **Servidor Web Local:** XAMPP, WampServer o Laragon (con soporte para PHP y MySQL).
*   **Versión de PHP:** 7.4 o superior recomendado.
*   **Versión de MySQL:** 5.7 o superior (o MariaDB equivalente).
*   **Navegador recomendado:** Google Chrome o cualquier navegador moderno basado en Chromium (Edge, Brave, etc.) con soporte para *Google Identity Services*.
*   **APIs utilizadas:** Google Identity Services API (Sign-In con JavaScript v2).
*   **Conexión a Internet:** Requerida de forma obligatoria para cargar las librerías externas de Google en tiempo de ejecución.

---

3. Instalación

Siga estos pasos para clonar y poner en marcha el sistema en un entorno local:

1.  **Descargar o clonar el proyecto:**
    Coloque la carpeta del proyecto dentro del directorio raíz de su servidor web (por ejemplo, `C:/xampp/htdocs/portal-recibos/`).
2.  **Iniciar los servicios:**
    Abra el panel de control de su servidor local (ej. XAMPP) e inicie los módulos de **Apache** y **MySQL**.
3.  **Montar la base de datos:**
    *   Acceda a `http://localhost/phpmyadmin/`.
    *   Cree una nueva base de datos llamada `login_reitchert`.
    *   Cree la tabla e inserte datos de prueba ejecutando la siguiente consulta SQL en la pestaña "SQL":

```sql
CREATE TABLE `datos_empleado` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `Correo electronico` varchar(150) NOT NULL,
  `Sueldo` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `datos_empleado` (`Nombre`, `Apellido`, `Correo electronico`, `Sueldo`) VALUES
('', '', '', $),
En los espacios libres, ponga su nombre, apellido y correo electrónico en ese orden. Al final, en el "$", ponga su sueldo.


4. Configuración

Creación del proyecto en Google Cloud y Obtención del Client ID
Para que el inicio de sesión funcione con su propio entorno, debe configurar las credenciales en Google:

Vaya a la consola de Google Cloud Console.

Cree un nuevo proyecto llamado, por ejemplo, Portal Recibos Atlantico.

Vaya a APIs y servicios > Pantalla de consentimiento de OAuth. Seleccione el tipo de usuario (External o Internal) y complete los datos obligatorios (Nombre de la app, correo de soporte).

Vaya a Credenciales, haga clic en Crear credenciales y seleccione ID de cliente de OAuth.

En Tipo de aplicación, elija Aplicación web.

En la sección Orígenes de JavaScript autorizados, agregue de forma obligatoria las URL de su entorno local:

http://localhost

http://localhost:80 (o el puerto específico que use su servidor Apache).

Haga clic en Crear. Copie el ID de cliente generado.

Abra su archivo index.html y reemplace el valor del atributo data-client_id con su nuevo ID:

HTML
data-client_id="SU_CLIENT_ID_DE_GOOGLE.apps.googleusercontent.com"
Configuración de la base de datos
Si sus credenciales de MySQL locales son distintas a las predeterminadas (por ejemplo, si tiene contraseña), modifique las primeras líneas del archivo buscar_empleado.php:

PHP
$host = "localhost";
$user = "root";       // Su usuario de MySQL
$pass = "";           // Su contraseña de MySQL
$db   = "login_reitchert"; 
# 5. Ejecución
Asegúrese de acceder al proyecto utilizando una URL de servidor local válida (no abrir el archivo HTML haciendo doble clic directamente).

Abra su navegador e ingrese a: http://localhost/portal-recibos/index.html (o el nombre que le haya asignado a la carpeta).

Visualizará la pantalla de bienvenida. Haga clic en el botón oficial "Iniciar sesión con Google".

Seleccione su cuenta de Google. Si el correo coincide con uno de los registros precargados en la base de datos, el sistema ocultará el Login y cargará automáticamente sus datos en el Panel del Empleado.

6. Estructura del proyecto
La organización de los archivos principales del sistema es la siguiente:

Plaintext
portal-recibos/
│
├── index.html          # Interfaz de usuario (Pantalla de Login y Panel del Empleado)
├── estilo.css          # Estilos de la aplicación (diseño responsive, tarjetas y botón)
├── funcion.js          # Lógica en JS: Captura el token de Google, lo decodifica y consume la API local
├── buscar_empleado.php # Backend en PHP: Conecta a MySQL y valida la existencia del correo vía JSON
└── README.md           # Documentación técnica obligatoria del sistema (este archivo)

7. Capturas de pantalla

Están en la carpeta "img". 

Pantalla de Inicio de Sesión (Login)
Descripción: Interfaz de bienvenida corporativa con el botón oficial de Google Identity Services configurado con estilo Pill y Outline.

Panel de Datos del Empleado (Dashboard)
Descripción: Panel privado que muestra de manera dinámica la información confidencial extraída de la base de datos tras un login exitoso.

# 8. Integrantes

Baltazar López - Programador 1.

Joaquin Calandroni - Programador 1 porque no nos gusta competir.

Sofia Juarez - README.MD

9. Dificultades encontradas y Soluciones
Error 400: origin_mismatch (Google OAuth):

Problema: Al intentar iniciar sesión, Google bloqueaba el acceso indicando que la aplicación no cumplía con la política OAuth 2.0 debido a una falta de concordancia en el origen. Esto sucede porque Google Identity requiere explícitamente conocer desde qué dominios web se va a llamar a su servicio.

Solución: Se identificó que la aplicación se estaba ejecutando desde un servidor local cuyas URLs no estaban autorizadas en la consola de desarrollo. Se accedió a Google Cloud y se añadieron las URLs http://localhost y http://localhost:80 en la sección de Orígenes de JavaScript autorizados de las credenciales de OAuth, solucionando el bloqueo de manera inmediata.

Formato de intercambio de datos (JSON en PHP):

Problema: Inicialmente, el backend en PHP usando el array tradicional $_POST no procesaba correctamente el correo enviado por JavaScript mediante fetch.

Solución: Dado que JavaScript envía los datos con el encabezado application/json, los datos no se formatean como un formulario común. Se modificó el backend en PHP para capturar el flujo de entrada crudo del servidor utilizando file_get_contents('php://input') y decodificarlo con json_decode(), logrando una comunicación limpia y dinámica.

10. Uso de IA
En el desarrollo de este proyecto se utilizaron herramientas de Inteligencia Artificial para las siguientes tareas:

Estructuración y Refactorización de código: Se utilizó el asistente para modularizar la lógica de JavaScript y conectar de forma asíncrona mediante fetch la respuesta de Google con el backend de PHP.

Resolución de Errores Técnicos: Ayudó en el diagnóstico preciso del error 400: origin_mismatch de Google y en la configuración adecuada del lector de flujos de entrada en PHP (php://input).

Generación de Documentación: Se empleó para maquetar el formato técnico Markdown de este archivo informativo cumpliendo rigurosamente con todas las directrices y puntos obligatorios requeridos para la entrega.