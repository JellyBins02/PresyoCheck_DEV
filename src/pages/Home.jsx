
import { useLocation } from 'react-router-dom'
import { House, Factory, Store } from 'lucide-react'
import Swal from 'sweetalert2'
import './Home.css'

export default function Home() {
    const location = useLocation()

    const user = location.state?.user ?? {
        isGuest: true
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

                return { username, password }
            }
        }).then((result) => {
            if (result.isConfirmed) {
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

    // Sign-up
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
                const firstName = document
                    .getElementById('signup-firstname')
                    .value.trim()

                const middleName = document
                    .getElementById('signup-middlename')
                    .value.trim()

                const lastName = document
                    .getElementById('signup-lastname')
                    .value.trim()

                const email = document
                    .getElementById('signup-email')
                    .value.trim()

                const username = document
                    .getElementById('signup-username')
                    .value.trim()

                const password = document
                    .getElementById('signup-password')
                    .value

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

            {/* Floating Guest Account Links */}
            {user.isGuest && (
                <div className="home-account-actions">
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
                </div>
            )}

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
