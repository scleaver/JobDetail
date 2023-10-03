import axios, { type AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://local.fr5.com.au',
  headers: {
    'Content-type': 'application/json'
  }
})

apiClient.interceptors.response.use((originalResponse) => {
  handleDates(originalResponse.data)
  return originalResponse
})

export default apiClient

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/

// eslint-disable-next-line
function isIsoDateString(value: any): boolean {
  return value && typeof value === 'string' && isoDateFormat.test(value)
}

// eslint-disable-next-line
export function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== 'object') return body

  for (const key of Object.keys(body)) {
    const value = body[key]
    if (isIsoDateString(value)) body[key] = parseISO(value)
    else if (typeof value === 'object') handleDates(value)
  }
}

function parseISO(value: string): Date {
  return new Date(value)
}
