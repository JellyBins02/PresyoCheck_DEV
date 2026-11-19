import { useState, useEffect, useRef } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './pages/WelcomePage'
import './index.css'
import WelcomePage from './pages/WelcomePage';

function App() {
    const [theme, setTheme] = useState('light')
    const [appearance, setAppearance] = useState('light')
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)

    const paletteRef = useRef(null)

    // Apply selected theme and appearance globally
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        document.documentElement.setAttribute('data-mode', appearance)
    }, [theme, appearance])

    // Close palette when clicking outside
    useEffect(() => {
        function handleOutsideClick(event) {
            if (
                paletteRef.current &&
                !paletteRef.current.contains(event.target)
            ) {
                setIsPaletteOpen(false)
            }
        }

        document.addEventListener('pointerdown', handleOutsideClick)

        return () => {
            document.removeEventListener('pointerdown', handleOutsideClick)
        }
    }, [])

    return (
        <div className="app-container">
            {/* Abstract hexagon background */}
            <div className="hex-background">
                <div className="hexagon hex-one"></div>
                <div className="hexagon hex-two"></div>
                <div className="hexagon hex-three"></div>
                <div className="hexagon hex-four"></div>
                <div className="hexagon hex-five"></div>
                <div className="hexagon hex-six"></div>
                <div className="hexagon hex-seven"></div>
                <div className="hexagon hex-eight"></div>
            </div>

            <WelcomePage />

            {/* Floating palette selector */}
            <div
                ref={paletteRef}
                className={`theme-btn ${isPaletteOpen ? 'open' : ''}`}
                onClick={() => setIsPaletteOpen(true)}
            >
                <div className="theme-btn-icon">🎨</div>

                <div className="theme-btn-content">

                    {/* Header */}
                    <div className="palette-header">
                        <h3>Choose your palette</h3>

                        <button
                            className="palette-close"
                            onClick={(event) => {
                                event.stopPropagation()
                                setIsPaletteOpen(false)
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    <p className="palette-description">
                        Preview app in different visual styles.
                    </p>

                    {/* Palette options */}
                    <button
                        className={`palette-choice ${theme === 'light' ? 'active' : ''}`}
                        onClick={() => setTheme('light')}
                    >
                        <div className="palette-dots">
                            <i style={{ background: '#2563EB' }} />
                            <i style={{ background: '#059669' }} />
                            <i style={{ background: '#0F172A' }} />
                        </div>

                        <div className="palette-info">
                            <strong>Modern Fintech</strong>
                            <small>Clean, balanced</small>
                        </div>
                    </button>

                    <button
                        className={`palette-choice ${theme === 'dark' ? 'active' : ''}`}
                        onClick={() => setTheme('dark')}
                    >
                        <div className="palette-dots">
                            <i style={{ background: '#8B5CF6' }} />
                            <i style={{ background: '#F59E0B' }} />
                            <i style={{ background: '#1E293B' }} />
                        </div>

                        <div className="palette-info">
                            <strong>Premium Shopping</strong>
                            <small>Elegant, refined</small>
                        </div>
                    </button>

                    <button
                        className={`palette-choice ${theme === 'custom' ? 'active' : ''}`}
                        onClick={() => setTheme('custom')}
                    >
                        <div className="palette-dots">
                            <i style={{ background: '#EA580C' }} />
                            <i style={{ background: '#84CC16' }} />
                        </div>

                        <div className="palette-info">
                            <strong>Deal Hunter</strong>
                            <small>Bold, deal-focused</small>
                        </div>
                    </button>

                    {/* Appearance options */}
                    <div className="appearance-section">
                        <strong className="appearance-title">
                            Appearance
                        </strong>

                        <div className="appearance-options">
                            <button
                                className={`appearance-choice ${appearance === 'light' ? 'active' : ''}`}
                                onClick={() => setAppearance('light')}
                            >
                                ☀️ Light Mode
                            </button>

                            <button
                                className={`appearance-choice ${appearance === 'dark' ? 'active' : ''}`}
                                onClick={() => setAppearance('dark')}
                            >
                                🌙 Dark Mode
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default App
