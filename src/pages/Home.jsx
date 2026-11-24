
import { House, Factory, Store } from 'lucide-react'
import Swal from 'sweetalert2'
import {
    checkUsername,
    checkEmail,
    registerUser,
    loginUser
} from '../services/userService'
import { useAuth } from '../context/useAuth'
import './Home.css'

export default function Home() {
    const { user, login, logout } = useAuth()

    const swalClasses = {
        popup: 'resyo-swal-popup',
        title: 'resyo-swal-title',
        htmlContainer: 'resyo-swal-text',
        confirmButton: 'resyo-swal-confirm',
        cancelButton: 'resyo-swal-cancel'
    }

    // Greeting
    function getGreeting() {
        if (user.isGuest) {
            return 'Hi, Guest!'
        }

        const firstName = user.firstName || ''

        const middleInitial = user.middleName
            ? `${user.middleName.trim().charAt(0).toUpperCase()}.`
            : ''

        const lastInitial = user.lastName
            ? `${user.lastName.trim().charAt(0).toUpperCase()}.`
            : ''

        return `Hi, ${firstName}${middleInitial ? ` ${middleInitial}` : ''}${lastInitial ? ` ${lastInitial}` : ''}!`
    }

    // Navigation handlers
    function handleHome() {
        console.log('Home clicked')
    }

    function handleManufacturer() {
        console.log('Manufacturer clicked')
    }

    function handleStore() {
        console.log('Store clicked')
    }

    // Login
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

            await Swal.fire({
                title: 'Welcome Back!',
                text: `Welcome back, ${response.data.user.firstName}!`,
                icon: 'success',
                confirmButtonText: 'Continue',
                customClass: swalClasses,
                buttonsStyling: false
            })

            // Update global authentication state
            login(response.data.user)

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

    // Logout
    async function handleLogout() {
        const result = await Swal.fire({
            title: 'Log Out?',
            text: 'Are you sure you want to log out of your account?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, Log Out',
            cancelButtonText: 'Cancel',
            customClass: swalClasses,
            buttonsStyling: false,
            reverseButtons: true
        })

        if (result.isConfirmed) {
            logout()
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
                ...swalClasses,
                popup: 'resyo-swal-popup resyo-signup-popup',
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
                    // Check username
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

                    // Check email
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

            // Check for possible duplicate full name
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
        <div className="home-page">

            {/* Navigation Bar */}
            <nav className="home-navbar">
                <div className="home-navbar-brand">
                    <span className="currency">₱</span>
                    <span>resyo Check</span>
                </div>

                <div className="home-navbar-actions">
                    <button
                        className="home-nav-button home-nav-home"
                        onClick={handleHome}
                        aria-label="Home"
                        title="Home"
                    >
                        <House size={20} />
                    </button>

                    <button
                        className="home-nav-button"
                        onClick={handleManufacturer}
                    >
                        <Factory size={18} />
                        <span>Manufacturer</span>
                    </button>

                    <button
                        className="home-nav-button"
                        onClick={handleStore}
                    >
                        <Store size={18} />
                        <span>Store</span>
                    </button>
                </div>
            </nav>

            {/* Floating Account Actions */}
            <div className="home-account-actions">

                {user.isGuest ? (
                    <>
                        <button
                            type="button"
                            className="home-nav-login"
                            onClick={handleLogin}
                        >
                            Log in existing user
                        </button>

                        <button
                            type="button"
                            className="home-nav-login"
                            onClick={handleSignup}
                        >
                            Sign-up
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        className="home-nav-login"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                )}

            </div>

            {/* Main Content */}
            <main className="home-main">

                {/* Greeting */}
                <div className="home-greeting">
                    <h1>{getGreeting()}</h1>
                </div>

                {/* Home Content */}
                <div className="home-content">

                    {/* Left Panels */}
                    <div className="home-left-panels">
                        <section className="home-panel home-panel-one">
                            {/* Left Panel 1 content goes here */}
                        </section>

                        <section className="home-panel home-panel-two">
                            {/* Left Panel 2 content goes here */}
                        </section>
                    </div>

                    {/* Right Panel */}
                    <section className="home-panel home-right-panel">
                        {/* Right Panel content goes here */}
                    </section>

                </div>
            </main>
        </div>
    )
}
