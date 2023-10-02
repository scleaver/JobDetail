import axios from 'axios'
import type { Job } from '@/types/Job'

export default class JobService {
  static async getJob(dataId: string): Promise<Job | null> {
    try {
      const response = await axios.get(`https://local.fr5.com.au/internal/jobs/${dataId}`)
      return response.data as Job
    } catch (error: any) {
      // You can use 'any' here for simplicity
      if (axios.isAxiosError(error)) {
        // Type guard
        if (error.response && error.response.status === 404) {
          return null
        }
      }
      console.error('An error occurred:', error)
      return null
    }
  }
}
