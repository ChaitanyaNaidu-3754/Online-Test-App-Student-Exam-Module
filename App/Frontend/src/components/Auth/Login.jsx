import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
    const [username, setUsername]= useState("")
    const [password, setPassword]= useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password
            })
            localStorage.setItem("token", res.data.token)
            navigate("/exam")
        } catch (err) {
            setError(err.response?.data?.message || "Login failed")
        }
    }

    return (
        <>
            <div className="auth-container">
                <div className="auth-box">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>

        </>
    )
}


export default Login