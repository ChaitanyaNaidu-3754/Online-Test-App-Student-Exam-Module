import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Question from './Question'
import Timer from './Timer'

const ExamInterface = () => {
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchQuestions = async () => {
        const token = localStorage.getItem('token')
        try {
            const res = await axios.get('http://localhost:5000/api/exam/start', {
                headers: { Authorization: `Bearer ${token}` },
            })
            setQuestions(res.data)
            setAnswers(Array(res.data.length).fill(null))
            setLoading(false)
        } catch (err) {
            console.error('Failed to fetch questions:', err)
            setLoading(false)
            navigate('/login')
        }
    }

    const handleAnswer = (selectedIndex) => {
        const newAnswers = [...answers]
        newAnswers[currentQuestionIndex] = {
            questionId: questions[currentQuestionIndex]._id,
            selectedIndex,
        }
        setAnswers(newAnswers)
    }

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        }
    }

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1)
        }
    }

    const handleSubmit = async () => {
        const token = localStorage.getItem('token')
        try {
            const res = await axios.post(
                'http://localhost:5000/api/exam/submit',
                { answers },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            navigate('/results', { state: { score: res.data.score } })
        } catch (err) {
            console.error('Failed to submit exam:', err)
            navigate('/results', { state: { score: 0, message: 'Submission failed.' } })
        }
    }

    useEffect(() => {
        fetchQuestions()
    }, [navigate])

    if (loading) {
        return <div>Loading exam...</div>
    }

    const currentQuestion = questions[currentQuestionIndex]

    return (
        <div className="exam-container">
            <div className="header">
                <h2>Exam</h2>
                <Timer duration={1800} onTimeout={handleSubmit} />
            </div>
            <Question
                question={currentQuestion}
                onAnswer={handleAnswer}
                selectedAnswerIndex={answers[currentQuestionIndex]?.selectedIndex}
            />
            <div className="navigation-buttons">
                <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                    Previous
                </button>
                <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
                    Next
                </button>
                <button onClick={handleSubmit} className="submit-button">
                    Submit Exam
                </button>
            </div>
        </div>
    )
}

export default ExamInterface