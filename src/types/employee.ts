import { Status } from 'constant'

export interface Employee {
  id: string
  username: string
  fullName: string
  salary: number
}

export interface EmployeeState {
  employeeList: Employee[]
  status: Status
}
