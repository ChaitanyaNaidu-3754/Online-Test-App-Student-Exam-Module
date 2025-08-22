const express = require('express')
const { getQuestions, submitExam } = require('../controllers/examController')

const { protect } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/start',protect, getQuestions)
router.post('/submit',protect, submitExam)

module.exports = router