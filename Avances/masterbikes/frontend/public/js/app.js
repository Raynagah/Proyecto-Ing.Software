// Datos de bicicletas (simulando API)
const bikes = [
    {
        id: 1,
        name: "Montaña Pro 29\"",
        description: "Bicicleta todo terreno con suspensión delantera",
        price: 450000,
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        type: "mountain"
    },
    {
        id: 2,
        name: "Urbana Elegance",
        description: "Diseño clásico para la ciudad",
        price: 320000,
        image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        type: "urban"
    },
    {
        id: 3,
        name: "Ruta Velocity",
        description: "Alto rendimiento para carretera",
        price: 580000,
        image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        type: "road"
    }
];

// Cuenta demo preconfigurada
const demoAccount = {
    email: "tester@masterbikes.cl",
    password: "MasterBikes2025",
    name: "Usuario Demo"
};

// Variables para el proceso de registro
let generatedCode = "";
let registeredUsers = [demoAccount];
let currentUser = null;

// Elementos del DOM
const authModal = document.getElementById('auth-modal');
const closeModal = document.getElementById('close-modal');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authButtons = document.getElementById('auth-buttons');
const userProfile = document.getElementById('user-profile');
const userName = document.getElementById('user-name');
const userAvatar = document.getElementById('user-avatar');
const logoutBtn = document.getElementById('logout-btn');
const bikeGrid = document.querySelector('.bike-grid');

// Cargar bicicletas al iniciar
function loadBikes() {
    bikeGrid.innerHTML = '';
    bikes.forEach(bike => {
        const bikeCard = document.createElement('div');
        bikeCard.className = 'bike-card';
        bikeCard.innerHTML = `
            <div class="bike-img" style="background-image: url('${bike.image}')"></div>
            <div class="bike-info">
                <h3>${bike.name}</h3>
                <p>${bike.description}</p>
                <div class="bike-price">$${bike.price.toLocaleString('es-CL')}</div>
                <div class="bike-actions">
                    <a href="#" class="btn btn-outline">Detalles</a>
                    <a href="#" class="btn btn-solid">Comprar</a>
                </div>
            </div>
        `;
        bikeGrid.appendChild(bikeCard);
    });
}

// Mostrar modal de login/registro
function showAuthModal(tab = 'login') {
    authModal.style.display = 'flex';
    switchTab(tab);
}

// Ocultar modal
function hideAuthModal() {
    authModal.style.display = 'none';
}

// Cambiar entre pestañas de login y registro
function switchTab(tab) {
    loginTab.classList.remove('active');
    registerTab.classList.remove('active');
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
    
    if (tab === 'login') {
        loginTab.classList.add('active');
        loginForm.classList.add('active');
        document.getElementById('auth-modal-title').textContent = 'Acceso a tu cuenta';
    } else {
        registerTab.classList.add('active');
        registerForm.classList.add('active');
        document.getElementById('auth-modal-title').textContent = 'Crear nueva cuenta';
    }
}

// Validar email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Mostrar/ocultar mensajes de error
function showError(elementId, show, message = '') {
    const element = document.getElementById(elementId);
    if (message) element.textContent = message;
    element.style.display = show ? 'block' : 'none';
}

// Función de login
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    let valid = true;
    
    // Validar email
    if (!email || !isValidEmail(email)) {
        showError('login-email-error', true);
        valid = false;
    } else {
        showError('login-email-error', false);
    }
    
    // Validar contraseña
    if (!password) {
        showError('login-password-error', true);
        valid = false;
    } else {
        showError('login-password-error', false);
    }
    
    if (!valid) return;
    
    // Verificar credenciales
    const user = registeredUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login exitoso
        document.getElementById('login-general-error').style.display = 'none';
        currentUser = user;
        updateUIAfterLogin();
        hideAuthModal();
    } else {
        showError('login-general-error', true, 'Correo o contraseña incorrectos');
    }
}

// Actualizar UI después del login
function updateUIAfterLogin() {
    authButtons.style.display = 'none';
    userProfile.style.display = 'flex';
    userName.textContent = currentUser.name;
    userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
}

// Actualizar UI después del logout
function updateUIAfterLogout() {
    authButtons.style.display = 'block';
    userProfile.style.display = 'none';
    currentUser = null;
}

// Iniciar proceso de registro
function startRegistration() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    let valid = true;
    
    // Validar nombre
    if (!name) {
        showError('register-name-error', true);
        valid = false;
    } else {
        showError('register-name-error', false);
    }
    
    // Validar email
    if (!email || !isValidEmail(email)) {
        showError('register-email-error', true, 'Por favor ingresa un correo válido');
        valid = false;
    } else if (registeredUsers.some(u => u.email === email)) {
        showError('register-email-error', true, 'Este correo ya está registrado');
        valid = false;
    } else {
        showError('register-email-error', false);
    }
    
    // Validar contraseña
    if (!password || password.length < 6) {
        showError('register-password-error', true);
        valid = false;
    } else {
        showError('register-password-error', false);
    }
    
    // Validar confirmación
    if (password !== confirm) {
        showError('register-confirm-error', true);
        valid = false;
    } else {
        showError('register-confirm-error', false);
    }
    
    if (!valid) return;
    
    // Generar código de verificación (simulado)
    generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Mostrar sección de verificación
    document.getElementById('verification-code-group').style.display = 'block';
    document.getElementById('register-submit').style.display = 'none';
    document.getElementById('verify-btn').style.display = 'block';
    
    // Simular envío de código por email
    alert(`Se ha enviado un código de verificación a ${email}\n\nCódigo generado (simulación): ${generatedCode}\n\nEn un sistema real, esto se enviaría por email.`);
}

// Verificar código de registro
function verifyCode() {
    const code = document.getElementById('verification-code').value;
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    if (code === generatedCode) {
        // Registro exitoso
        showError('verification-code-error', false);
        document.getElementById('verification-success').style.display = 'block';
        
        // Agregar usuario (en memoria, en un sistema real se enviaría al backend)
        const newUser = { name, email, password };
        registeredUsers.push(newUser);
        
        // Mostrar mensaje de éxito
        document.getElementById('register-success').textContent = '¡Registro completado con éxito!';
        document.getElementById('register-success').style.display = 'block';
        
        // Auto-login después de registro
        setTimeout(() => {
            currentUser = newUser;
            updateUIAfterLogin();
            hideAuthModal();
        }, 1500);
    } else {
        showError('verification-code-error', true);
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadBikes();
    
    // Botones de autenticación
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showAuthModal('login');
    });
    
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showAuthModal('register');
    });
    
    // Tabs del modal
    loginTab.addEventListener('click', () => switchTab('login'));
    registerTab.addEventListener('click', () => switchTab('register'));
    
    // Cerrar modal
    closeModal.addEventListener('click', hideAuthModal);
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) hideAuthModal();
    });
    
    // Botón de logout
    logoutBtn.addEventListener('click', () => {
        updateUIAfterLogout();
    });
    
    // Formulario de login
    document.getElementById('login-submit').addEventListener('click', login);
    loginForm.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') login();
    });
    
    // Formulario de registro
    document.getElementById('register-submit').addEventListener('click', startRegistration);
    document.getElementById('verify-btn').addEventListener('click', verifyCode);
    registerForm.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (document.getElementById('verify-btn').style.display === 'block') {
                verifyCode();
            } else {
                startRegistration();
            }
        }
    });
    
    // Rellenar datos demo automáticamente al hacer clic en el tab de login
    loginTab.addEventListener('click', function() {
        document.getElementById('login-email').value = demoAccount.email;
        document.getElementById('login-password').value = demoAccount.password;
    });
});