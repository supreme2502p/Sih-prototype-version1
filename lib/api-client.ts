export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp?: string
}

export interface AccountCheckRequest {
  aadhaar: string
  bankAccount: string
}

export interface NotificationRequest {
  phone: string
  type: "sms" | "whatsapp"
  message: string
}

class ApiClient {
  private baseUrl = "/api"

  async checkAccount(data: AccountCheckRequest): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/check-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("API Error:", error)
      return {
        success: false,
        error: "Network error. Please check your connection and try again.",
      }
    }
  }

  async sendNotification(data: NotificationRequest): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("API Error:", error)
      return {
        success: false,
        error: "Network error. Please check your connection and try again.",
      }
    }
  }

  async getMockData(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${this.baseUrl}/mock-data`)
      const result = await response.json()
      return result
    } catch (error) {
      console.error("API Error:", error)
      return {
        success: false,
        error: "Network error. Please check your connection and try again.",
      }
    }
  }
}

export const apiClient = new ApiClient()
