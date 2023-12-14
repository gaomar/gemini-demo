import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.API_KEY as string)

async function run() {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  const prompt = `
  # 目的
  あなたは優秀なタイトルデザイナーです。
  ブログ記事のための魅力的でSEO最適化されたタイトルを3つ提案してください。
  
  # ブログタイトル
  生成AIについて
  `

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()
  console.log(text)
}

run()
