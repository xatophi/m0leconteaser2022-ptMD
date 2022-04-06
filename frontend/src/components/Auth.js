import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";

import { Error } from './Error';

function Login({ CSRFToken }) {

    const [error, setError] = useState(undefined);

    const navigate = useNavigate()
    const goToHome = () => navigate('/');

    const submitLogin = async (e) => {
        e.preventDefault()
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        const r = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, _csrf: CSRFToken })
        })

        if (r.status !== 200) {
            const j = await r.json()
            setError(j.error || "Login failed")
        } else {
            goToHome()
        }
    }

    return <>
        <Error errorMsg={error} />

        <h1>Login</h1>

        <form onSubmit={submitLogin}>
            <input type="text" id="username" placeholder="username" />
            <input type="password" id="password" placeholder="password" />
            <button type="submit" id="submit">Login</button>
        </form>

    </>
}

function Signup({ CSRFToken }) {

    const [error, setError] = useState(undefined);

    const navigate = useNavigate()
    const goToLogin = () => navigate('/login');

    const submitSignup = async (e) => {
        e.preventDefault()
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        const r = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, _csrf: CSRFToken })
        })

        if (r.status !== 200) {
            const j = await r.json()
            setError(j.error || "Signup failed")
        } else {
            goToLogin()
        }
    }

    return <>
        <Error errorMsg={error} />

        <h1>Signup</h1>

        <form onSubmit={submitSignup}>
            <input type="text" id="username" placeholder="username" />
            <input type="password" id="password" placeholder="password" />
            <button type="submit">Signup</button>
        </form>

    </>
}


function Logout() {

    fetch('/api/logout')

    return <Navigate to="/" />

}

export { Login, Signup, Logout }