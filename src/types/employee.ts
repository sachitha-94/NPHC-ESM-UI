import { Status } from 'constant'

export interface Employee {
  id: string
  userName: string
  fullName: string
  salary: number
}

export interface EmployeeState {
  employeeList: Employee[]
  status: Status
  uploadCSV: Status
}
