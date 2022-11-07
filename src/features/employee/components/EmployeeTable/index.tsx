import React, { FC } from 'react'
import 'antd/dist/antd.css'
import './styles.css'
import { Space, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Employee } from 'types/employee'
import {
  EmployeeData,
  EmployeeLabel
} from 'features/employee/employeeDataMapper'
import { useAppSelector } from 'app/hooks'
import { RootState } from 'app/store'

const EmployeeTable: FC = () => {
  const employeeList = useAppSelector(
    (state: RootState) => state?.employee?.employeeList
  )

  const columns: ColumnsType<Employee> = [
    {
      title: EmployeeLabel.id,
      dataIndex: EmployeeData.id,
      key: EmployeeData.id
    },
    {
      title: EmployeeLabel.fullName,
      dataIndex: EmployeeData.fullName,
      key: EmployeeData.fullName
    },
    {
      title: EmployeeLabel.username,
      dataIndex: EmployeeData.username,
      key: EmployeeData.username
    },
    {
      title: EmployeeLabel.salary,
      dataIndex: EmployeeData.salary,
      key: EmployeeData.salary
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite </a>
          <a>Delete</a>
        </Space>
      )
    }
  ]

  return <Table columns={columns} dataSource={employeeList} />
}

export default EmployeeTable
