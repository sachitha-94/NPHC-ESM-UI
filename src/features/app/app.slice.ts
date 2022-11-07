import { createSlice } from '@reduxjs/toolkit'
import { AlertTypes } from 'types/common'
import { AppState } from 'types/app'

const initialState: AppState = {
  alert: {
    isOpen: false,
    type: AlertTypes.success,
    childern: null
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    triggerAlert (state, action) {
      state.alert = {
        isOpen: true,
        type: action?.payload?.type,
        childern: action?.payload?.childern
      }
    },
    closeAlert (state) {
      state.alert = {
        isOpen: false,
        type: AlertTypes.success,
        childern: null
      }
    }
  }
})

export const { actions } = appSlice

export default appSlice.reducer
