import React from 'react'
import { Button, Form, Input, Modal, Space, InputNumber } from 'antd'
import { Employee } from 'types/employee'
import {
  EmployeeData,
  EmployeeLabel
} from 'features/employee/employeeDataMapper'
import { updateEmployeeAsync } from 'features/employee/employeeSlice'
import { useAppDispatch } from 'app/hooks'

interface IEmployeeModal {
  employee: Employee
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
}
const EmployeeModal: React.FC<IEmployeeModal> = ({
  isModalOpen,
  setIsModalOpen,
  employee
}) => {
  const dispatch = useAppDispatch()

  const handleSubmit = (values: Employee): void => {
    dispatch(updateEmployeeAsync(values))
    setIsModalOpen(false)
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }

  return (
    <Modal
      title="Update Employee"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label={EmployeeLabel.id}
          name={EmployeeData.id}
          initialValue={employee?.id}
          rules={[
            { required: true, message: `Please input ${EmployeeLabel.id}` }
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label={EmployeeLabel.fullName}
          name={EmployeeData.fullName}
          initialValue={employee?.fullName}
          rules={[
            { required: true, message: `Please input ${EmployeeLabel.fullName}` }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={EmployeeLabel.userName}
          name={EmployeeData.userName}
          initialValue={employee?.userName}
          rules={[
            { required: true, message: `Please input ${EmployeeLabel.userName}` }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={EmployeeLabel.salary}
          name={EmployeeData.salary}
          rules={[
            { required: true, message: `Please input ${EmployeeLabel.salary}` }
          ]}
          initialValue={employee?.salary}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 16, span: 8 }}>
          <Space size="middle">
            <Button type="default">Cancel</Button>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EmployeeModal
