// Esta función se ejecuta automáticamente cuando el usuario se loguea con Google
function manejarLogin(response) {
    // Enviamos el token devuelto por Google a nuestro backend en PHP
    fetch('login_google.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_token: response.credential })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            // 1. Inyectamos los datos del empleado en los spans correspondientes
            document.getElementById('emp-id').innerText = data.empleado.ID;
            document.getElementById('emp-name').innerText = data.empleado.Nombre;
            document.getElementById('emp-lastname').innerText = data.empleado.Apellido;
            document.getElementById('emp-email').innerText = data.empleado.Correo;
            document.getElementById('emp-salary').innerText = data.empleado.Sueldo;

            // 2. Ocultamos la pantalla de login y mostramos el panel
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('dashboard-screen').classList.remove('hidden');
        } else {
            // Si el correo de Gmail no existe en la BD
            alert("Error de acceso: " + data.message);
        }
    })
    .catch(error => {
        console.error('Error al conectar con el servidor:', error);
        alert('Hubo un problema al procesar el inicio de sesión.');
    });
}

// Lógica para el botón "Cerrar Sesión"
document.getElementById('btn-logout').addEventListener('click', function() {
    // Limpiamos los textos por seguridad
    document.getElementById('emp-id').innerText = "-";
    document.getElementById('emp-name').innerText = "-";
    document.getElementById('emp-lastname').innerText = "-";
    document.getElementById('emp-email').innerText = "-";
    document.getElementById('emp-salary').innerText = "-";

    // Volvemos a intercambiar las pantallas de forma visual
    document.getElementById('dashboard-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
    
    // Opcional: Recargar la página para limpiar por completo el estado de Google Identity
    location.reload();
});