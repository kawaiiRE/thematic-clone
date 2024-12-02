import axios from 'axios'

const baseAxios = axios.create({
  baseURL: 'https://staging-api.hellothematic.com/api/v2/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})
baseAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

baseAxios.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

export default baseAxios
