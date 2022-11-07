import api from 'app/axios'
import { Employee } from 'types/employee'

export const fetchAllEmployees: any = async () => {
  return await api.get('/employees')
}

export const deleteEmployee: any = async (id: string) => {
  return await api.delete(`/employees/${id}`)
}

export const updateEmployee: any = async (employee: Employee) => {
  return await api.put(`/employees/${employee?.id}`, employee)
}

export const uploadEmployeesCSV: any = async (data: FormData) => {
  return await api.post('/employees/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
