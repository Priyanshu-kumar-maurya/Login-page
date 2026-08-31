/**
 * NeoAuth - Interactive Glassmorphic Auth Portal
 * Author: Priyanshu Kumar Maurya
 */

(function () {
    'use strict';

    // Elements
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const tabSlider = document.querySelector('.tab-slider');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const switchToReg = document.getElementById('switch-to-reg');
    const switchToLogin = document.getElementById('switch-to-login');
    
    // Password Strength Elements
    const regPasswordInput = document.getElementById('reg-password');
    const pwdStrengthWrap = document.getElementById('pwd-strength-wrap');
    const pwdStrengthProgress = document.getElementById('pwd-strength-progress');
    const pwdStrengthText = document.getElementById('pwd-strength-text');
    const regConfirmPasswordInput = document.getElementById('reg-confirm-password');

    // Modal Elements
    const forgotModal = document.getElementById('forgot-modal');
    const openForgotBtn = document.getElementById('open-forgot-btn');
    const closeForgotBtn = document.getElementById('close-forgot-btn');
    const forgotForm = document.getElementById('forgot-form');

    // Toast
    const toast = document.getElementById('toast');
    const toastMsg = toast.querySelector('.toast-msg');

    // =========================================================================
    // Tab Switching Logic
    // =========================================================================

    function switchTab(target) {
        if (target === 'register') {
            tabLogin.classList.remove('active');
            tabRegister.classList.add('active');
            tabSlider.style.transform = 'translateX(100%)';
            loginForm.classList.remove('active-form');
            registerForm.classList.add('active-form');
        } else {
            tabRegister.classList.remove('active');
            tabLogin.classList.add('active');
            tabSlider.style.transform = 'translateX(0%)';
            registerForm.classList.remove('active-form');
            loginForm.classList.add('active-form');
        }
    }

    tabLogin.addEventListener('click', () => switchTab('login'));
    tabRegister.addEventListener('click', () => switchTab('register'));
    if (switchToReg) switchToReg.addEventListener('click', (e) => { e.preventDefault(); switchTab('register'); });
    if (switchToLogin) switchToLogin.addEventListener('click', (e) => { e.preventDefault(); switchTab('login'); });

    // =========================================================================
    // Password Visibility Toggle
    // =========================================================================

    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = btn.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'bx bx-hide';
            } else {
                input.type = 'password';
                icon.className = 'bx bx-show';
            }
        });
    });

    // =========================================================================
    // Real-Time Password Strength Checker
    // =========================================================================

    if (regPasswordInput) {
        regPasswordInput.addEventListener('input', () => {
            const val = regPasswordInput.value;
            if (val.length === 0) {
                pwdStrengthWrap.classList.remove('active');
                return;
            }

            pwdStrengthWrap.classList.add('active');
            let score = 0;

            if (val.length >= 6) score++;
            if (val.length >= 10) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
            if (/[^A-Za-z0-9]/.test(val)) score++;

            // Update Progress Bar
            if (score <= 1) {
                pwdStrengthProgress.style.width = '25%';
                pwdStrengthProgress.style.background = '#ef4444'; // Red
                pwdStrengthText.textContent = 'Weak password';
                pwdStrengthText.style.color = '#ef4444';
            } else if (score === 2 || score === 3) {
                pwdStrengthProgress.style.width = '60%';
                pwdStrengthProgress.style.background = '#f59e0b'; // Amber
                pwdStrengthText.textContent = 'Medium password';
                pwdStrengthText.style.color = '#f59e0b';
            } else {
                pwdStrengthProgress.style.width = '100%';
                pwdStrengthProgress.style.background = '#10b981'; // Green
                pwdStrengthText.textContent = 'Strong password';
                pwdStrengthText.style.color = '#10b981';
            }
        });
    }

    // =========================================================================
    // Toast Feedback
    // =========================================================================

    function showToast(msg, isError = false) {
        toastMsg.textContent = msg;
        const icon = toast.querySelector('.toast-icon');
        if (isError) {
            icon.className = 'bx bx-error-circle toast-icon';
            icon.style.color = '#ef4444';
        } else {
            icon.className = 'bx bx-check-circle toast-icon';
            icon.style.color = '#34d399';
        }
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // =========================================================================
    // Form Submission Handlers
    // =========================================================================

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const btn = document.getElementById('login-submit-btn');

        btn.disabled = true;
        btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> <span>Signing in...</span>`;

        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = `<span class="btn-text">Sign In</span> <i class='bx bx-right-arrow-alt'></i>`;
            showToast(`Welcome back, ${username || 'User'}!`);
            loginForm.reset();
        }, 1200);
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reg-name').value.trim();
        const pwd = regPasswordInput.value;
        const confirmPwd = regConfirmPasswordInput.value;
        const btn = document.getElementById('register-submit-btn');

        if (pwd !== confirmPwd) {
            showToast('Passwords do not match!', true);
            regConfirmPasswordInput.focus();
            return;
        }

        btn.disabled = true;
        btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> <span>Creating Account...</span>`;

        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = `<span class="btn-text">Create Account</span> <i class='bx bx-user-plus'></i>`;
            showToast(`Account created for ${name}! Please sign in.`);
            registerForm.reset();
            pwdStrengthWrap.classList.remove('active');
            switchTab('login');
        }, 1400);
    });

    // =========================================================================
    // Forgot Password Modal
    // =========================================================================

    if (openForgotBtn) {
        openForgotBtn.addEventListener('click', () => {
            forgotModal.classList.add('open');
        });
    }

    if (closeForgotBtn) {
        closeForgotBtn.addEventListener('click', () => {
            forgotModal.classList.remove('open');
        });
    }

    forgotModal.addEventListener('click', (e) => {
        if (e.target === forgotModal) {
            forgotModal.classList.remove('open');
        }
    });

    forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value.trim();
        const submitBtn = forgotForm.querySelector('button[type="submit"]');

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> <span>Sending...</span>`;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span class="btn-text">Send Reset Link</span> <i class='bx bx-send'></i>`;
            forgotModal.classList.remove('open');
            forgotForm.reset();
            showToast(`Reset link sent to ${email}`);
        }, 1200);
    });

    // Social Button Toast feedback
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const provider = btn.querySelector('span').textContent;
            showToast(`Connecting to ${provider}...`);
        });
    });

})();
