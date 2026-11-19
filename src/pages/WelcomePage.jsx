
import { User, LogIn, UserPlus } from 'lucide-react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export default function WelcomePage() {
    const navigate = useNavigate()


    function handleGuest() {
        Swal.fire({
            title: 'Continue as Guest?',
            text: 'Browsing as a Guest prevents you from using other features available in the app. Do you want to proceed?',
            icon: 'info',

            showCancelButton: true,
            confirmButtonText: 'Continue >',
            cancelButtonText: '< Go Back',

            customClass: {
                popup: 'resyo-swal-popup',
                title: 'resyo-swal-title',
                htmlContainer: 'resyo-swal-text',
                confirmButton: 'resyo-swal-confirm',
                cancelButton: 'resyo-swal-cancel'
            },

            buttonsStyling: false,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/home', {
                    state: {
                        user: {
                            isGuest: true
                        }
                    }
                })
            }
        })
    }



    // Log in

    function handleLogin() {
        Swal.fire({
            title: 'Log in to Your Account',

            html: `
            <div class="resyo-login-form">

                <div class="resyo-form-group">
                    <label for="login-username">Username</label>
                    <input
                        id="login-username"
                        type="text"
                        placeholder="Enter username"
                        autocomplete="username"
                    />
                </div>

                <div class="resyo-form-group">
                    <label for="login-password">Password</label>
                    <input
                        id="login-password"
                        type="password"
                        placeholder="Enter password"
                        autocomplete="current-password"
                    />
                </div>

            </div>
        `,

            width: 420,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Log In',
            cancelButtonText: 'Cancel',

            allowOutsideClick: false,
            allowEscapeKey: false,

            customClass: {
                popup: 'resyo-swal-popup resyo-login-popup',
                title: 'resyo-swal-title',
                htmlContainer: 'resyo-swal-text',
                confirmButton: 'resyo-swal-confirm',
                cancelButton: 'resyo-swal-cancel',
                closeButton: 'resyo-swal-close'
            },

            buttonsStyling: false,
            reverseButtons: true,

            preConfirm: () => {
                const username = document
                    .getElementById('login-username')
                    .value.trim()

                const password = document
                    .getElementById('login-password')
                    .value

                if (!username || !password) {
                    Swal.showValidationMessage(
                        'Please enter your username and password.'
                    )
                    return false
                }

                return {
                    username,
                    password
                }
            }

        }).then((result) => {
            if (result.isConfirmed) {
                // Backend authentication will be implemented later.

                Swal.fire({
                    title: 'Form Validated!',
                    text: 'Your login information is complete. Authentication will be available once the backend is connected.',
                    icon: 'success',
                    confirmButtonText: 'Got it',

                    customClass: {
                        popup: 'resyo-swal-popup',
                        title: 'resyo-swal-title',
                        htmlContainer: 'resyo-swal-text',
                        confirmButton: 'resyo-swal-confirm'
                    },

                    buttonsStyling: false
                })
            }
        })
    }



    // Signup
    function handleSignup() {
        Swal.fire({
            title: 'Create an Account',
            html: `
                <div class="resyo-signup-form">

                    <div class="resyo-form-group">
                        <label for="signup-firstname">First Name</label>
                        <input
                            id="signup-firstname"
                            type="text"
                            placeholder="Enter first name"
                            autocomplete="given-name"
                        />
                    </div>

                    <div class="resyo-form-group">
                        <label for="signup-middlename">Middle Name</label>
                        <input
                            id="signup-middlename"
                            type="text"
                            placeholder="Enter middle name"
                            autocomplete="additional-name"
                        />
                    </div>

                    <div class="resyo-form-group">
                        <label for="signup-lastname">Last Name</label>
                        <input
                            id="signup-lastname"
                            type="text"
                            placeholder="Enter last name"
                            autocomplete="family-name"
                        />
                    </div>

                    <div class="resyo-form-group">
                        <label for="signup-email">Email Address</label>
                        <input
                            id="signup-email"
                            type="email"
                            placeholder="Enter email address"
                            autocomplete="email"
                        />
                    </div>

                    <div class="resyo-form-group">
                        <label for="signup-username">Username</label>
                        <input
                            id="signup-username"
                            type="text"
                            placeholder="Choose a username"
                            autocomplete="username"
                        />
                    </div>

                    <div class="resyo-form-group">
                        <label for="signup-password">Password</label>
                        <input
                            id="signup-password"
                            type="password"
                            placeholder="Create a password"
                            autocomplete="new-password"
                        />
                    </div>

                </div>
            `,

            width: 520,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sign Up',
            cancelButtonText: 'Cancel',

            allowOutsideClick: false,
            allowEscapeKey: false,

            customClass: {
                popup: 'resyo-swal-popup resyo-signup-popup',
                title: 'resyo-swal-title',
                htmlContainer: 'resyo-swal-text',
                confirmButton: 'resyo-swal-confirm',
                cancelButton: 'resyo-swal-cancel',
                closeButton: 'resyo-swal-close'
            },

            buttonsStyling: false,
            reverseButtons: true,

            preConfirm: () => {
                const firstName = document.getElementById('signup-firstname').value.trim()
                const middleName = document.getElementById('signup-middlename').value.trim()
                const lastName = document.getElementById('signup-lastname').value.trim()
                const email = document.getElementById('signup-email').value.trim()
                const username = document.getElementById('signup-username').value.trim()
                const password = document.getElementById('signup-password').value

                if (!firstName || !middleName || !lastName ||
                    !email || !username || !password) {

                    Swal.showValidationMessage('Please complete all fields.')
                    return false
                }

                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

                if (!emailPattern.test(email)) {
                    Swal.showValidationMessage('Please enter a valid email address.')
                    return false
                }

                return {
                    firstName,
                    middleName,
                    lastName,
                    email,
                    username,
                    password
                }
            }

        }).then((result) => {
            if (result.isConfirmed) {
                // Form validation succeeded.
                // Backend registration will be implemented later.

                Swal.fire({
                    title: 'Form Validated!',
                    text: 'Your information is complete. Account registration will be available once the backend is connected.',
                    icon: 'success',
                    confirmButtonText: 'Got it',
                    customClass: {
                        popup: 'resyo-swal-popup',
                        title: 'resyo-swal-title',
                        htmlContainer: 'resyo-swal-text',
                        confirmButton: 'resyo-swal-confirm'
                    },
                    buttonsStyling: false
                })
            }
        })
    }




    return (
        <div className="welcome-box">

            {/* Brand */}
            <div className="welcome-brand">
                <h1 className="welcome_title">
                    <span className="currency">₱</span>
                    <span className="title">resyo Check</span>
                </h1>

                <label className="welcome-description">
                    Scan a product to see its price at every store near you.
                </label>
            </div>

            {/* Continue as guest */}
            <button
                className="welcome-btn login_guest"
                onClick={handleGuest}
            >
                <User size={22} />
                <span className="welcome-btn-txt">
                    Continue as guest
                </span>
                <span className="welcome-btn-subtxt">
                    Browse prices without an account
                </span>
            </button>

            {/* Login */}
            <button
                className="welcome-btn login_user"
                onClick={handleLogin}
            >
                <LogIn size={22} />
                <span className="welcome-btn-txt">
                    Log in
                </span>
                <span className="welcome-btn-subtxt">
                    Log in using existing account
                </span>
            </button>

            {/* Signup */}
            <button
                className="welcome-btn signup"
                onClick={handleSignup}
            >
                <UserPlus size={22} />
                <span className="welcome-btn-txt">
                    Sign up
                </span>
                <span className="welcome-btn-subtxt">
                    Create an account
                </span>
            </button>

        </div>
    )
}
