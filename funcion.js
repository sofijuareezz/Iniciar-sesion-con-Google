// Pantallas
const loginScreen = document.getElementById('login-screen');
const registerScreen = document.getElementById('register-screen');
const dashboardScreen = document.getElementById('dashboard-screen');

// Enlaces de navegación
const goToRegister = document.getElementById('go-to-register');
const goToLogin = document.getElementById('go-to-login');

// Botones y Formulario
const btnLogin = document.getElementById('btn-google-login');
const btnLogout = document.getElementById('btn-logout');
const registerForm = document.getElementById('register-form');

// Campos del Dashboard
const empId = document.getElementById('emp-id');
const empFullname = document.getElementById('emp-fullname');
const empEmail = document.getElementById('emp-email');
const empSalary = document.getElementById('emp-salary');

// --- NAVEGACIÓN ---
goToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginScreen.classList.add('hidden');
    registerScreen.classList.remove('hidden');
});

goToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerScreen.classList.add('hidden');
    loginScreen.classList.remove('remove'); // Corrige a remoción normal
    loginScreen.classList.remove('hidden');
});

// --- ACCIÓN: REGISTRAR ---
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevoEmpleado = {
        id: document.getElementById('reg-id').value,
        nombre: document.getElementById('reg-nombre').value,
        apellido: document.getElementById('reg-apellido').value,
        correo: document.getElementById('reg-correo').value,
        sueldo: document.getElementById('reg-sueldo').value
    };

    try {
        // REEMPLAZAR URL CON TU BACKEND REAL
        const response = await fetch('http://localhost:3000/api/registrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoEmpleado)
        });

        if (response.ok) {
            alert('¡Empleado registrado con éxito! Ahora puedes iniciar sesión.');
            registerForm.reset();
            registerScreen.classList.add('hidden');
            loginScreen.classList.remove('hidden');
        } else {
            alert('Error al registrar el empleado.');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        alert('No se pudo conectar con el servidor.');
    }
});

// --- ACCIÓN: LOGEARSE (Simulado/Real) ---
btnLogin.addEventListener('click', async () => {
    try {
        // Aquí llamarías a la autenticación de Google. Al obtener el correo:
        const correoGoogle = "juan.perez@empresa.com"; // Simulación de respuesta Google

        // REEMPLAZAR URL CON TU BACKEND REAL (Busca los datos por correo)
        const response = await fetch(`http://localhost:3000/api/empleado/${correoGoogle}`);
        
        if (response.ok) {
            const empleado = await response.json();

            // Inyectamos los datos reales traídos de MySQL
            empId.textContent = empleado.id;
            empFullname.textContent = `${empleado.nombre} ${empleado.apellido}`;
            empEmail.textContent = empleado.correo;
            empSalary.textContent = empleado.sueldo;

            // Cambiamos al panel
            loginScreen.classList.add('hidden');
            dashboardScreen.classList.remove('hidden');
        } else {
            alert('El usuario no está registrado en el sistema.');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error en el servidor.');
    }
});

// --- ACCIÓN: CERRAR SESIÓN ---
btnLogout.addEventListener('click', () => {
    loginScreen.classList.remove('hidden');
    dashboardScreen.classList.add('hidden');
});