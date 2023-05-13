import React, { useState } from 'react'

const LoginForm = ({ loginUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        loginUser({ username, password })

        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                Username: <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
            </div>
            <div>
                Password: <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm
