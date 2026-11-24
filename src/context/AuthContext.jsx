import { useState } from 'react'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        isGuest: true
    })

    function login(userData) {
        setUser({
            ...userData,
            isGuest: false
        })
    }

    function logout() {
        setUser({
            isGuest: true
        })
    }

    const value = {
        user,
        isGuest: user.isGuest,
        isAuthenticated: !user.isGuest,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}