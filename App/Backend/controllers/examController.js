const Question = require("../models/questionModel")

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.aggregate([{ $sample: { size: 10 } }])
        res.json(questions)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const submitExam = async (req, res) => {
    const { answers } = req.body
    let score = 0

    try {
        const validAnswers = answers.filter(answer => answer !== null && answer !== undefined)

        if (validAnswers.length === 0) {
            return res.status(400).json({ message: 'No valid answers submitted' })
        }

        const submittedQuestionIds = validAnswers.map((answer) => answer.questionId)

        const correctQuestions = await Question.find({
            _id: { $in: submittedQuestionIds },
        })

        validAnswers.forEach((submittedAnswer) => {
            const question = correctQuestions.find(
                (q) => q._id.toString() === submittedAnswer.questionId
            )

            if (
                question &&
                submittedAnswer.selectedIndex !== null &&
                submittedAnswer.selectedIndex !== undefined
            ) {
                if (Number(question.correctAnswerIndex) === Number(submittedAnswer.selectedIndex)) {
                    score++
                }
            }
        })

        res.json({ score })

    } catch (error) {
        console.error("Scoring error:", error)
        res.status(500).json({ message: 'Server error during scoring.' })
    }
}

module.exports = { getQuestions, submitExam }