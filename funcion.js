// 1. TU BASE DE DATOS SIMPLIFICADA
// Reemplazá este correo de ejemplo por el Gmail exacto con el que estás iniciando sesión.
const baseDeDatos = {
    "calandronada@gmail.com": { id: "EMP-2026-941", nombre: "Tomás Pérez", sueldo: "450.000,00" },
    "juan.gomez@gmail.com": { id: "EMP-2026-102", nombre: "Juan Gómez", sueldo: "520.000,00" }
};

// Vinculamos el botón de cerrar sesión apenas cargue la página
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btn-logout").addEventListener("click", logout);
});

// 2. LA FUNCIÓN QUE SE EJECUTA AL LOGUEARTE
function manejarLogin(response) {
    try {
        // Rompemos el token de Google de forma segura para caracteres especiales (tildes, eñes)
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('0' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const usuarioGoogle = JSON.parse(jsonPayload);
        const correoIngresado = usuarioGoogle.email.toLowerCase();

        console.log("Se intentó conectar el correo:", correoIngresado);

        // Buscamos si el correo existe en nuestra base de datos simulada
        const empleadoEncontrado = baseDeDatos[correoIngresado];

        if (empleadoEncontrado) {
            // Si existe, inyectamos los datos en el HTML
            document.getElementById("emp-id").textContent = empleadoEncontrado.id;
            document.getElementById("emp-fullname").textContent = empleadoEncontrado.nombre;
            document.getElementById("emp-email").textContent = correoIngresado;
            document.getElementById("emp-salary").textContent = empleadoEncontrado.sueldo;

            // Cambiamos de pantalla (ocultamos login, mostramos panel)
            document.getElementById("login-screen").classList.add("hidden");
            document.getElementById("dashboard-screen").classList.remove("hidden");
            console.log("¡Acceso concedido!");
        } else {
            alert("Acceso denegado: El correo (" + correoIngresado + ") no está registrado en el sistema.");
        }
    } catch (error) {
        console.error("Error al procesar el login de Google:", error);
    }
}

// 3. FUNCIÓN PARA CERRAR SESIÓN
function logout() {
    document.getElementById("dashboard-screen").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
}