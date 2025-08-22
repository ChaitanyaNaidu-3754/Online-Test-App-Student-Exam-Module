
const Question = ({ question, onAnswer, selectedAnswerIndex }) => {
    return (
        <div className="question-card">
            <p className="question-text">{question.questionText}</p>
            <div className="options">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        className={`option-button ${selectedAnswerIndex === index ? 'selected' : ''}`}
                        onClick={() => onAnswer(index)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Question