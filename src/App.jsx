import { Configuration, OpenAIApi } from 'openai'
import { useState } from 'react'

function App() {
  const config = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(config)

  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.5,
        max_tokens: 100,
      })
      setResult(response.data.choices[0].text)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }
  return (
    <main>
      <textarea
        placeholder="Ask me anything !"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <button onClick={handleClick} disabled={loading || prompt.length === 0}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      <div>{result}</div>
    </main>
  )
}

export default App
