import axios from 'axios'

const isMockMode =
  import.meta.env.VITE_USE_MOCK === 'true' ||
  !import.meta.env.VITE_API_BASE_URL

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
  timeout: isMockMode ? 1000 : 8000,
})

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Unable to complete the request.'
    return Promise.reject(new Error(message))
  },
)

export const USE_MOCK_DATA = isMockMode
