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
            const icon = btn.querySelector('.svg-icon');

            if (input.type === 'password') {
                input.type = 'text';
                if (icon) icon.innerHTML = '<path fill="currentColor" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>';
            } else {
                input.type = 'password';
                if (icon) icon.innerHTML = '<path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
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

            pwdStrengthProgress.className = 'strength-progress';

            if (score <= 2) {
                pwdStrengthProgress.classList.add('strength-weak');
                pwdStrengthText.textContent = 'Weak password';
                pwdStrengthText.style.color = '#f87171';
            } else if (score <= 3) {
                pwdStrengthProgress.classList.add('strength-medium');
                pwdStrengthText.textContent = 'Moderate password';
                pwdStrengthText.style.color = '#fbbf24';
            } else {
                pwdStrengthProgress.classList.add('strength-strong');
                pwdStrengthText.textContent = 'Strong password';
                pwdStrengthText.style.color = '#34d399';
            }
        });
    }

    // =========================================================================
    // Toast Notification
    // =========================================================================

    function showToast(message, isError = false) {
        toastMsg.textContent = message;
        const icon = toast.querySelector('.toast-icon');
        if (isError) {
            icon.style.fill = '#f87171';
        } else {
            icon.style.fill = '#34d399';
        }
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // =========================================================================
    // Form Submissions
    // =========================================================================

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const btn = document.getElementById('login-submit-btn');

        btn.disabled = true;
        btn.innerHTML = `<span>Signing In...</span>`;

        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = `<span class="btn-text">Sign In</span> <svg class="svg-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>`;
            showToast(`Welcome back, ${username}!`);
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
        btn.innerHTML = `<span>Creating Account...</span>`;

        setTimeout(() => {
            btn.disabled = false;
            btn.innerHTML = `<span class="btn-text">Create Account</span> <svg class="svg-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`;
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
        submitBtn.innerHTML = `<span>Sending...</span>`;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span class="btn-text">Send Reset Link</span> <svg class="svg-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`;
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
