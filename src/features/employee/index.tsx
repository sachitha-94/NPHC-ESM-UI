import React, { FC, useEffect } from 'react'
import EmployeeTable from './components/EmployeeTable'
import { useAppDispatch } from 'app/hooks'
import {
  fetchAllEmployeeAsync,
  uploadEmployeesCSVAsync
} from './employeeSlice'
import { Button, Upload, UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import './styles.css'

const Employee: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllEmployeeAsync())
  }, [])

  const props: UploadProps = {
    beforeUpload: (file) => {
      const formdata = new FormData()
      formdata.append('file', file)
      dispatch(uploadEmployeesCSVAsync(formdata))
    },
    showUploadList: false
  }

  return (
    <div className="employee-container">
      <Upload {...props}>
        <Button type="primary" icon={<UploadOutlined />}>
          Upload Employee CSV
        </Button>
      </Upload>

      <EmployeeTable />
    </div>
  )
}

export default Employee
