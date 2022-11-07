import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Status } from 'constant'

import { EmployeeState } from 'types/employee'
import { fetchAllEmployees } from './employeeAPI'

const initialState: EmployeeState = {
  employeeList: [],
  status: Status.idle
}

export const fetchAllEmployeeAsync = createAsyncThunk(
  'employee/fetchAll',
  async () => {
    try {
      const response = await fetchAllEmployees()
      return response.data?.data
    } catch (error) {}
  }
)

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployeeAsync.pending, (state) => {
        state.status = Status.loading
      })
      .addCase(fetchAllEmployeeAsync.fulfilled, (state, action) => {
        state.status = Status.idle
        state.employeeList = action.payload
      })
      .addCase(fetchAllEmployeeAsync.rejected, (state) => {
        state.status = Status.failed
      })
  }
})

export default employeeSlice.reducer
