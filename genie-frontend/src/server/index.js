import express from 'express'
import ViteExpress from 'vite-express'
import multer from 'multer'
import cors from 'cors'
import {
  uploadAudio,
  askQuestion,
  getFeedbackForTextInput,
  getFeedbackForAudioInput,
} from './gemini.js'

const app = express()
app.use(express.json())
app.use(cors())

const upload = multer({ dest: '/tmp/' })

app.post('/api/upload', upload.single('audio'), async (req, res) => {
  try {
    const file = req.file
    const resp = await uploadAudio(file)
    console.log(resp)
    res.json({ data: resp })
  } catch (error) {
    res.status(500).json({ error })
  }
})

app.post('/api/ask-question', async (req, res) => {
  try {
    const { question } = req.body
    const response = await askQuestion(question)
    res.json({ response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})

app.post('/api/feedback-text', async (req, res) => {
  try {
    const { answer } = req.body
    const feedback = await getFeedbackForTextInput(answer)
    res.json({ feedback })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})

app.post('/api/feedback-audio', upload.single('audio'), async (req, res) => {
  try {
    const { input } = req.body
    const answerAudio = req.file
    const feedback = await getFeedbackForAudioInput(input, answerAudio)
    res.json({ feedback })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})

app.get('/api/testing/working-of-api', async (req, res) => {
  try {
  console.log("Api is working");
  res.status(202).json({ message: 'API is working' })
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})

// eslint-disable-next-line no-undef
const port = process.env.NODE_ENV === 'production' ? 8080 : 3000

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
)
