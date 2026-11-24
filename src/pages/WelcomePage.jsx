
import { User, LogIn, UserPlus } from 'lucide-react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import {
    checkUsername,
    checkEmail,
    registerUser,
    loginUser
} from '../services/userService'
import { useAuth } from '../context/useAuth'

export default function WelcomePage() {
    const navigate = useNavigate()
    const { login, logout } = useAuth()

    const swalClasses = {
        popup: 'resyo-swal-popup',
        title: 'resyo-swal-title',
        htmlContainer: 'resyo-swal-text',
        confirmButton: 'resyo-swal-confirm',
        cancelButton: 'resyo-swal-cancel'
    }

    // Continue as Guest
    function handleGuest() {
        Swal.fire({
            title: 'Continue as Guest?',
            text: 'Browsing as a Guest prevents you from using other features available in the app. Do you want to proceed?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Continue >',
            cancelButtonText: '< Go Back',
            customClass: {
                ...swalClasses,
                cancelButton: 'resyo-swal-cancel'
            },
            buttonsStyling: false,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                logout()

                navigate('/home')
            }
        })
    }

    // Log in
    async function handleLogin() {
        const result = await Swal.fire({
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

                return { username, password }
            }
        })

        if (!result.isConfirmed) return

        try {
            Swal.fire({
                title: 'Logging In...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                didOpen: () => Swal.showLoading(),
                customClass: swalClasses,
                buttonsStyling: false
            })

            const response = await loginUser(result.value)

            if (!response.ok) {
                throw new Error(
                    response.data.message || 'Invalid username or password.'
                )
            }

            // Update global authentication state
            login(response.data.user)

            await Swal.fire({
                title: 'Welcome Back!',
                text: `Welcome back, ${response.data.user.firstName}!`,
                icon: 'success',
                confirmButtonText: 'Continue',
                customClass: swalClasses,
                buttonsStyling: false
            })

            // Navigate to Home after successful login
            navigate('/home')

        } catch (error) {
            Swal.fire({
                title: 'Login Failed',
                text: error.message || 'Unable to log in. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again',
                customClass: swalClasses,
                buttonsStyling: false
            })
        }
    }

    // Check availability response
    function getAvailability(response) {
        if (typeof response.available === 'boolean') {
            return response.available
        }

        if (typeof response.isAvailable === 'boolean') {
            return response.isAvailable
        }

        if (typeof response.exists === 'boolean') {
            return !response.exists
        }

        if (typeof response.isTaken === 'boolean') {
            return !response.isTaken
        }

        return null
    }

    // Sign-up
    async function handleSignup() {
        const result = await Swal.fire({
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

            preConfirm: async () => {
                const firstName = document
                    .getElementById('signup-firstname').value.trim()

                const middleName = document
                    .getElementById('signup-middlename').value.trim()

                const lastName = document
                    .getElementById('signup-lastname').value.trim()

                const email = document
                    .getElementById('signup-email').value.trim()

                const username = document
                    .getElementById('signup-username').value.trim()

                const password = document
                    .getElementById('signup-password').value

                if (
                    !firstName ||
                    !middleName ||
                    !lastName ||
                    !email ||
                    !username ||
                    !password
                ) {
                    Swal.showValidationMessage(
                        'Please complete all fields.'
                    )
                    return false
                }

                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

                if (!emailPattern.test(email)) {
                    Swal.showValidationMessage(
                        'Please enter a valid email address.'
                    )
                    return false
                }

                if (username.length < 3) {
                    Swal.showValidationMessage(
                        'Username must contain at least 3 characters.'
                    )
                    return false
                }

                if (password.length < 8) {
                    Swal.showValidationMessage(
                        'Password must contain at least 8 characters.'
                    )
                    return false
                }

                try {
                    // Check username availability
                    const usernameResult = await checkUsername(username)
                    const usernameAvailable = getAvailability(usernameResult)

                    if (usernameAvailable === false) {
                        Swal.showValidationMessage(
                            'This username is already taken. Please choose another.'
                        )
                        return false
                    }

                    if (usernameAvailable === null) {
                        Swal.showValidationMessage(
                            'Unexpected response while checking username availability.'
                        )
                        return false
                    }

                    // Check email availability
                    const emailResult = await checkEmail(email)
                    const emailAvailable = getAvailability(emailResult)

                    if (emailAvailable === false) {
                        Swal.showValidationMessage(
                            'This email address is already registered.'
                        )
                        return false
                    }

                    if (emailAvailable === null) {
                        Swal.showValidationMessage(
                            'Unexpected response while checking email availability.'
                        )
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

                } catch (error) {
                    Swal.showValidationMessage(
                        error.message || 'Unable to connect to the API.'
                    )
                    return false
                }
            }
        })

        if (!result.isConfirmed) {
            return
        }

        // Register account
        try {
            Swal.fire({
                title: 'Creating Your Account',
                text: 'Please wait...',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading()
                },
                customClass: swalClasses
            })

            const registrationData = {
                ...result.value,
                confirmPossibleDuplicate: false
            }

            let response = await registerUser(registrationData)

            // Possible duplicate full name
            if (
                response.status === 409 &&
                response.data.requiresConfirmation === true
            ) {
                const confirmation = await Swal.fire({
                    title: 'Possible Existing Account',
                    text: response.data.message ||
                        'An account with the same name may already exist. Do you still want to continue?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, Continue',
                    cancelButtonText: 'Cancel',
                    customClass: swalClasses,
                    buttonsStyling: false,
                    reverseButtons: true
                })

                if (!confirmation.isConfirmed) {
                    return
                }

                Swal.fire({
                    title: 'Creating Your Account',
                    text: 'Please wait...',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    didOpen: () => {
                        Swal.showLoading()
                    },
                    customClass: swalClasses
                })

                response = await registerUser({
                    ...registrationData,
                    confirmPossibleDuplicate: true
                })
            }

            if (!response.ok) {
                throw new Error(
                    response.data.message ||
                    'Registration failed. Please try again.'
                )
            }

            await Swal.fire({
                title: 'Account Created!',
                text: 'Your account has been successfully registered.',
                icon: 'success',
                confirmButtonText: 'Got it',
                customClass: swalClasses,
                buttonsStyling: false
            })

        } catch (error) {
            Swal.fire({
                title: 'Registration Failed',
                text: error.message ||
                    'Something went wrong while creating your account.',
                icon: 'error',
                confirmButtonText: 'Got it',
                customClass: swalClasses,
                buttonsStyling: false
            })
        }
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
