import { useState } from 'react'

import './App.css'
import Tasks from './pages/tasks'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Tasks/>
    </>
  )
}

export default App
