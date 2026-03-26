/* ===========================
   Form Switching Logic
   =========================== */

function switchForm(event) {
    event.preventDefault();
    
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
    
    // Clear form inputs when switching
    clearFormInputs();
}

/* ===========================
   Clear Form Inputs
   =========================== */

function clearFormInputs() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="tel"]');
    inputs.forEach(input => {
        input.value = '';
        const errorElement = document.getElementById(input.id + '-error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
}

/* ===========================
   Password Visibility Toggle
   =========================== */

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
}

/* ===========================
   Form Validation
   =========================== */

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 6 characters
    return password.length >= 6;
}

function validatePhoneNumber(phone) {
    // Basic phone validation - at least 10 digits
    const phoneRegex = /^\d{10,}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

/* ===========================
   Form Submission Handlers
   =========================== */

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm form');
    const registerForm = document.querySelector('#registerForm form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
});

function handleLoginSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Reset previous errors
    clearElement('login-email-error');
    clearElement('login-password-error');
    
    let isValid = true;
    
    // Validate email
    if (!email.trim()) {
        showError('login-email-error', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('login-email-error', 'Please enter a valid email');
        isValid = false;
    }
    
    // Validate password
    if (!password.trim()) {
        showError('login-password-error', 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError('login-password-error', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    if (isValid) {
        // Form is valid, you can send data to backend
        console.log('Login Form Data:', {
            email: email,
            password: password
        });
        
        // TODO: Send login request to backend
        // Example:
        // fetch('/api/auth/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password })
        // })
        
        alert('Login successful! (Demo)');
    }
}

function handleRegisterSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('register-phone').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const termsAccepted = document.querySelector('input[name="terms"]').checked;
    
    // Reset previous errors
    clearElement('register-name-error');
    clearElement('register-email-error');
    clearElement('register-phone-error');
    clearElement('register-password-error');
    clearElement('register-confirm-password-error');
    
    let isValid = true;
    
    // Validate name
    if (!name.trim()) {
        showError('register-name-error', 'Full name is required');
        isValid = false;
    } else if (name.trim().length < 3) {
        showError('register-name-error', 'Name must be at least 3 characters');
        isValid = false;
    }
    
    // Validate email
    if (!email.trim()) {
        showError('register-email-error', 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError('register-email-error', 'Please enter a valid email');
        isValid = false;
    }
    
    // Validate phone
    if (!phone.trim()) {
        showError('register-phone-error', 'Phone number is required');
        isValid = false;
    } else if (!validatePhoneNumber(phone)) {
        showError('register-phone-error', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate password
    if (!password.trim()) {
        showError('register-password-error', 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showError('register-password-error', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    // Validate confirm password
    if (!confirmPassword.trim()) {
        showError('register-confirm-password-error', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('register-confirm-password-error', 'Passwords do not match');
        isValid = false;
    }
    
    // Validate terms acceptance
    if (!termsAccepted) {
        alert('Please accept the Terms & Conditions');
        isValid = false;
    }
    
    if (isValid) {
        // Form is valid, you can send data to backend
        console.log('Register Form Data:', {
            name: name,
            email: email,
            phone: phone,
            password: password
        });
        
        // TODO: Send registration request to backend
        // Example:
        // fetch('/api/auth/register', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, email, phone, password })
        // })
        
        alert('Registration successful! (Demo)');
    }
}

/* ===========================
   Helper Functions
   =========================== */

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '';
    }
}

/* ===========================
   Social Login Handlers
   =========================== */

document.addEventListener('DOMContentLoaded', function() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', handleSocialLogin);
    });
});

function handleSocialLogin(event) {
    event.preventDefault();
    
    const button = event.currentTarget;
    const provider = button.classList.contains('google-btn') ? 'Google' : 'Facebook';
    
    console.log(`Social login with ${provider} clicked`);
    
    // TODO: Implement social login logic
    // For now, just show a message
    alert(`${provider} login functionality to be implemented`);
}

/* ===========================
   Real-time Validation (Optional)
   =========================== */

document.addEventListener('DOMContentLoaded', function() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    // Email validation on blur
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const errorId = this.id + '-error';
            const errorElement = document.getElementById(errorId);
            
            if (this.value.trim() && !validateEmail(this.value)) {
                showError(errorId, 'Please enter a valid email');
            } else {
                clearElement(errorId);
            }
        });
    });
    
    // Password validation on blur (for registration password confirmation)
    const registerPasswordInput = document.getElementById('register-password');
    const confirmPasswordInput = document.getElementById('register-confirm-password');
    
    if (registerPasswordInput && confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', function() {
            if (this.value && registerPasswordInput.value !== this.value) {
                showError('register-confirm-password-error', 'Passwords do not match');
            } else {
                clearElement('register-confirm-password-error');
            }
        });
    }
});
