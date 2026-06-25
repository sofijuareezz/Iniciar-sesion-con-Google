// Elementos de la interfaz
const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const btnLogin = document.getElementById('btn-google-login');
const btnLogout = document.getElementById('btn-logout');

// Campos del panel (mapeados a tu BD MySQL)
const empId = document.getElementById('emp-id');
const empFullname = document.getElementById('emp-fullname');
const empEmail = document.getElementById('emp-email');
const empSalary = document.getElementById('emp-salary');

// SIMULACIÓN: Evento Iniciar Sesión
btnLogin.addEventListener('click', () => {
    // 1. Aquí iría la autenticación de Google y el fetch a tu BD.
    // 2. Simulamos que traemos este registro de tu tabla MySQL:
    const empleadoSimulado = {
        id: "EMP-2026-09",
        nombre: "Juan",
        apellido: "Pérez",
        correo: "juan.perez@empresa.com",
        sueldo: "1500.00"
    };

    // 3. Inyectamos los datos en el panel
    empId.textContent = empleadoSimulado.id;
    empFullname.textContent = `${empleadoSimulado.nombre} ${empleadoSimulado.apellido}`;
    empEmail.textContent = empleadoSimulado.correo;
    empSalary.textContent = empleadoSimulado.sueldo;

    // 4. Cambiamos de pantalla
    loginScreen.classList.add('hidden');
    dashboardScreen.classList.remove('hidden');
});

// Evento Cerrar Sesión
btnLogout.addEventListener('click', () => {
    // Al cerrar sesión, limpiamos datos y volvemos al inicio
    loginScreen.classList.remove('hidden');
    dashboardScreen.classList.add('hidden');
});