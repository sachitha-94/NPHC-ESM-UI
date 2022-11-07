import React, { FC, useState } from 'react'
import 'antd/dist/antd.css'
import './styles.css'
import { Button, Space, Table, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { Employee } from 'types/employee'
import {
  EmployeeData,
  EmployeeLabel
} from 'features/employee/employeeDataMapper'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { RootState } from 'app/store'
import { deleteEmployeeAsync } from 'features/employee/employeeSlice'
import EmployeeModal from '../EmployeeModal'

const EmployeeTable: FC = () => {
  const dispatch = useAppDispatch()
  const employeeList = useAppSelector(
    (state: RootState) => state?.employee?.employeeList
  )

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>()

  const handleDeleteEmploee = (id: string): void => {
    dispatch(deleteEmployeeAsync(id))
  }

  const handleUpdateEmploee = (employee: Employee): void => {
    setIsModalOpen(true)
    setSelectedEmployee(employee)
  }

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
      title: EmployeeLabel.userName,
      dataIndex: EmployeeData.userName,
      key: EmployeeData.userName
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
          <Tooltip title="Edit">
            <Button
              type="default"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleUpdateEmploee(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="default"
              shape="circle"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteEmploee(record?.id)}
            />
          </Tooltip>
        </Space>
      )
    }
  ]

  return (
    <>
      <Table columns={columns} dataSource={employeeList} />
      {isModalOpen && !(selectedEmployee == null) && (
        <EmployeeModal
          employee={selectedEmployee}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  )
}

export default EmployeeTable
