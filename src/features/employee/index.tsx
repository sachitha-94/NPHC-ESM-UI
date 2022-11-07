import React, { FC, useEffect } from 'react'
import EmployeeTable from './components/EmployeeTable'
import { useAppDispatch } from 'app/hooks'
import { fetchAllEmployeeAsync } from './employeeSlice'

const Employee: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllEmployeeAsync())
  }, [])

  return <EmployeeTable />
}

export default Employee
