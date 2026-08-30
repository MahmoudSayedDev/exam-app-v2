import axiosInstance from "@/lib/axios"

export const examService = {
  async getExams(diplomaId: string) {
    return await axiosInstance.get('/exams', {
      params: {
        diplomaId
      }
    })
  },

  async getExam(id: string) {
    return axiosInstance.get(`/exams/${id}`)
  },
}
