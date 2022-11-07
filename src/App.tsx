import React, { FC } from 'react'

import Counter from 'features/counter/Counter'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App: FC = () => {
  return (
    <BrowserRouter>
      <div data-testid="app">
        <Routes>
          <Route path="/" element={<Counter />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
