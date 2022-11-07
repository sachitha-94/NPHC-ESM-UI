import axios, { AxiosRequestConfig } from 'axios'

const baseURL: string =
  process.env.REACT_APP_BASE_API_URL != null
    ? process.env.REACT_APP_BASE_API_URL
    : 'http://localhost:3001/api'

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL
}

const api = axios.create(config)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    return await Promise.reject(error)
  }
)

export default api
