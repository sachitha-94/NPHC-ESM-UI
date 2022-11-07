import React, { FC, useEffect, useState } from 'react'
import EmployeeTable from './components/EmployeeTable'
import { useAppDispatch } from 'app/hooks'
import {
  fetchAllEmployeeAsync,
  uploadEmployeesCSVAsync
} from './employeeSlice'
import { Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import './styles.css'
import { FileUploadModal } from 'components'

const Employee: FC = () => {
  const dispatch = useAppDispatch()

  const [isFileUploadModalOpen, setIsFileUploadModalOpen] =
    useState<boolean>(false)

  useEffect(() => {
    dispatch(fetchAllEmployeeAsync())
  }, [])

  const handleUploadEmployeeCSV = (files: any[]): void => {
    const formdata = new FormData()
    files.forEach((file) => {
      formdata.append('file', file)
    })

    dispatch(uploadEmployeesCSVAsync(formdata))
    setIsFileUploadModalOpen(false)
  }

  return (
    <div className="employee-container">
      <Button
        type="primary"
        icon={<UploadOutlined />}
        onClick={() => setIsFileUploadModalOpen(true)}
      >
        Upload Employee CSV
      </Button>
      <EmployeeTable />
      {isFileUploadModalOpen && (
        <FileUploadModal
          isModalOpen={isFileUploadModalOpen}
          setIsModalOpen={setIsFileUploadModalOpen}
          handleSubmit={handleUploadEmployeeCSV}
        />
      )}
    </div>
  )
}

export default Employee
