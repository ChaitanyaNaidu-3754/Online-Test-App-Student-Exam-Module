import { useLocation, useNavigate } from 'react-router-dom'


const Results = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const score = location.state?.score

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    console.log("Received state:", location.state)
    console.log("Received score:", score)

    return (
        <div className="results-container">
            <div className="results-box">
                <h2>Exam Submitted!</h2>
                {score !== undefined ? (
                    <p className="score">Your final score is: {score}</p>
                ) : (
                    <p className="error">Could not retrieve your score. Please try again.</p>
                )}
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Results