import axiosInstance from "@/lib/axios"

export const QuestionsService = {
  async getQuestions(examId: string) {
    return axiosInstance.get(`/questions/exam/${examId}`)
  },

  async getQuestion(id: string) {
    return axiosInstance.get(`/questions/${id}`)
  },
}
