/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import AppFeature from 'features/app/app'
import { store } from './app/store'
import App from './App'
import './index.css'
import 'antd/dist/antd.css'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppFeature />
      <App />
    </Provider>
  </React.StrictMode>
)
