import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const[error, setError] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:5000/api/auth/register", { username,password })
            navigate("/login")
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed')
        }
    }


    return (
        <>
            <div className="auth-container">
                <div className="auth-box">
                    <h2>Resister</h2>
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
                        <button type="submit">Register</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                    <p>
                        Already have a account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </>
    )
}


export default Register