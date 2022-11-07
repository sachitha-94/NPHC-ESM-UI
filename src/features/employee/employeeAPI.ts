import api from 'app/axios'
export const fetchAllEmployees: any = async () => {
  return await api.get('/employees')
}
