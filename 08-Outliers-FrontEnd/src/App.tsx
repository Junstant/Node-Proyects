import { useState } from 'react'
import Header from './components/Header.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  )
}

export default App
