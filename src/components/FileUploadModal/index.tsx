import React, { useState } from 'react'
import { Button, Modal, Upload, UploadProps } from 'antd'
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
      setFiles(FileList)
    },
    multiple: true
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
