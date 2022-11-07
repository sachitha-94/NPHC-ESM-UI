import React, { useState } from 'react'
import { Button, message, Modal, Upload, UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

interface IFileUploadModal {
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  handleSubmit: (data: any) => void
}
const FileUploadModal: React.FC<IFileUploadModal> = ({
  isModalOpen,
  setIsModalOpen,
  handleSubmit
}) => {
  const [files, setFiles] = useState<any>()

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }

  const props: UploadProps = {
    beforeUpload (file, FileList) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        void message.error('Image must smaller than 2MB!')
      } else {
        setFiles(FileList)
      }
    },
    multiple: true,
    accept: '.csv'
  }

  return (
    <Modal
      title="Update Employee"
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={() => handleSubmit(files)}
      okText="Upload"
    >
      <Upload {...props}>
        <Button type="dashed" icon={<UploadOutlined />}>
          Select File
        </Button>
      </Upload>
    </Modal>
  )
}

export default FileUploadModal
