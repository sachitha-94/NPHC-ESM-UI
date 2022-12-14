import React, { FC, useState } from 'react'
import './styles.css'
import { Button, Modal, Space, Table, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
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

  const { confirm } = Modal

  const handleDeleteEmploee = (id: string): void => {
    dispatch(deleteEmployeeAsync(id))
  }

  const handleUpdateEmploee = (employee: Employee): void => {
    setIsModalOpen(true)
    setSelectedEmployee(employee)
  }

  const showConfirm = (employee: Employee): void => {
    confirm({
      title: `Do you Want to delete these employee ${employee.id}?`,
      icon: <ExclamationCircleOutlined />,
      onOk () {
        handleDeleteEmploee(employee.id)
      }
    })
  }

  const columns: ColumnsType<Employee> = [
    {
      title: EmployeeLabel.id,
      dataIndex: EmployeeData.id,
      key: EmployeeData.id,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.id.localeCompare(b.id)
    },
    {
      title: EmployeeLabel.fullName,
      dataIndex: EmployeeData.fullName,
      key: EmployeeData.fullName,
      sorter: (a, b) => a.fullName.localeCompare(b.fullName)
    },
    {
      title: EmployeeLabel.userName,
      dataIndex: EmployeeData.userName,
      key: EmployeeData.userName,
      sorter: (a, b) => a.userName.localeCompare(b.userName)
    },
    {
      title: EmployeeLabel.salary,
      dataIndex: EmployeeData.salary,
      key: EmployeeData.salary,
      sorter: (a, b) => a.salary - b.salary,
      filters: [
        {
          text: '< 1000',
          value: 1000
        },
        {
          text: '< 10000',
          value: 10000
        },
        {
          text: '< 50000',
          value: 50000
        }
      ],
      onFilter: (value, record) => record.salary <= Number(value)
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
              onClick={() => showConfirm(record)}
            />
          </Tooltip>
        </Space>
      )
    }
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={employeeList}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '15']
        }}
      />
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
