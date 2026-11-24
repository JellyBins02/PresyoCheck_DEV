const API_BASE_URL = 'https://localhost:7272/api/users';

export async function checkUsername(username) {
    const response = await fetch(
        `${API_BASE_URL}/check-username?username=${encodeURIComponent(username)}`
    );

    if (!response.ok) {
        throw new Error('Unable to check username availability.');
    }

    return await response.json();
}

export async function checkEmail(email) {
    const response = await fetch(
        `${API_BASE_URL}/check-email?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
        throw new Error('Unable to check email availability.');
    }

    return await response.json();
}

export async function registerUser(userData) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    return {
        ok: response.ok,
        status: response.status,
        data
    };
}


export async function loginUser(userData) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    return {
        ok: response.ok,
        status: response.status,
        data
    };
}
