import React, { FC } from 'react'

import Employee from 'features/employee'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from 'components'

const App: FC = () => {
  return (
    <BrowserRouter>
      <Layout data-testid="layout">
        <Routes>
          <Route path="/" element={<Employee />}></Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
