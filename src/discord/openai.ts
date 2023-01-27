import { Configuration, OpenAIApi } from 'openai'

export const createCompletion = async (prompt: string) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI
  })
  const openai = new OpenAIApi(configuration)
  return openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    temperature: 0.7,
    max_tokens: 200
  })
}
