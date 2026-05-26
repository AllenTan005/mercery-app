// src/api/http.ts

import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

http.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('accessToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  config.headers.interviewerName = import.meta.env.VITE_INTERVIEWER_NAME

  return config
})
