import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Status } from 'constant'

import { Employee, EmployeeState } from 'types/employee'
import {
  deleteEmployee,
  fetchAllEmployees,
  updateEmployee
} from './employeeAPI'

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

export const deleteEmployeeAsync = createAsyncThunk(
  'employee/delete',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await deleteEmployee(id)
      if (response?.status === 204) {
        void dispatch(fetchAllEmployeeAsync())
      }
      return response.data?.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const updateEmployeeAsync = createAsyncThunk(
  'employee/update',
  async (employee: Employee, { rejectWithValue, dispatch }) => {
    try {
      const response = await updateEmployee(employee)
      if (response?.status === 204) {
        void dispatch(fetchAllEmployeeAsync())
      }
      return response.data?.data
    } catch (error) {
      return rejectWithValue(error)
    }
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
