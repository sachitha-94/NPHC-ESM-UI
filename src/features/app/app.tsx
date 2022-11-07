import React, { memo } from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { actions } from './app.slice'

import { RootState } from 'app/store'
import { Alert } from 'antd'

const App: React.FC = () => {
  const alert = useAppSelector((state: RootState) => state?.app?.alert)
  const dispatch = useAppDispatch()

  const handleAlertClose = (): void => {
    dispatch(actions.closeAlert())
  }

  return (
    <>
      {alert?.isOpen && (
        <Alert
          message={alert.childern}
          type={alert.type}
          closable
          onClose={handleAlertClose}
          showIcon
        />
      )}
    </>
  )
}

export default memo(App)
