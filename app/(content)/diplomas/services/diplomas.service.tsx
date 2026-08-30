import axiosInstance from "@/lib/axios"


export const diplomaService = {
  async getDiplomas() {
    return await axiosInstance.get('/diplomas')
  },

  async getDiploma(id: string) {
    return axiosInstance.get(`/diplomas/${id}`)
  },
}
