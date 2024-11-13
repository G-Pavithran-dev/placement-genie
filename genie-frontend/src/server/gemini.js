import { GoogleGenerativeAI } from '@google/generative-ai'
import { GoogleAIFileManager } from '@google/generative-ai/server'
import dotenv from 'dotenv'

dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.API_KEY)
const fileManager = new GoogleAIFileManager(process.env.API_KEY)

let role = ''
let company = ''

export const setRoleAndCompany = (userRole, userCompany) => {
  role = userRole
  company = userCompany
}

export const uploadAudio = async (file) => {
  try {
    const uploadedFile = await fileManager.uploadFile(file.path, {
      displayName: file.originalname,
      mimeType: file.mimetype,
    })
    console.log(`upload completed. The uploaded file: ${uploadedFile.file}`)
    return uploadedFile.file
  } catch (error) {
    console.error(error)
  }
}

export const askQuestion = async (question) => {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: `You are HR with working experience with all companies including tech giants, who helps ask questions to the candidate based on the job role of ${role} at ${company}. The candidate is answering the questions.`,
  })

  try {
    const response = await model.generateContent(question)
    console.log(response.response.text())
    return response.response.text()
  } catch (error) {
    console.error(error)
    return 'Error generating response'
  }
}

export const getFeedbackForTextInput = async (answerFromCandidate) => {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: `You are HR with working experience with all companies including tech giants, who helps ask questions to the candidate based on the job role of ${role} at ${company}. The candidate is answering the questions. You have to provide feedback to the candidate based on their answers. The feedback should be constructive and should help the candidate to improve their answers. The feedback should be based on the candidate’s knowledge, communication skills, and other relevant factors. If the candidate is not able to answer the question, you can ask the candidate to explain the concept or provide an example related to the question.`,
  })

  try {
    const feedback = await model.generateContent(answerFromCandidate)
    console.log(feedback.response.text())
    return feedback.response.text()
  } catch (error) {
    console.error(error)
    return 'Error generating feedback'
  }
}

export const getFeedbackForAudioInput = async (input, answerAudio) => {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: `You are HR with working experience with all companies including tech giants, who helps ask questions to the candidate based on the job role of ${role} at ${company}. The candidate is answering the questions. You have to provide feedback to the candidate based on their answers. The feedback should be constructive and should help the candidate to improve their answers. The feedback should be based on the candidate’s knowledge, communication skills, and other relevant factors. If the candidate is not able to answer the question, you can ask the candidate to explain the concept or provide an example related to the question.`,
  })

  try {
    const req = [
      { text: input },
      {
        fileData: {
          mimeType: answerAudio.mimeType,
          fileUri: answerAudio.uri,
        },
      },
    ]
    const result = await model.generateContent(req)
    console.log(result.response.text())
    return result.response.text()
  } catch (error) {
    console.error(error)
    return 'Error generating feedback'
  }
}
