import axiosInstance from "@/lib/axios"

export const submissionService = {
  async submitExamAnswers(data: any) {
    return axiosInstance.post(`/submissions`, data)
  },
}
