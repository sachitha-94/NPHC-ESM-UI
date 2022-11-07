import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Status } from 'constant'

import { Employee, EmployeeState } from 'types/employee'
import {
  deleteEmployee,
  fetchAllEmployees,
  updateEmployee,
  uploadEmployeesCSV
} from './employeeAPI'

const initialState: EmployeeState = {
  employeeList: [],
  status: Status.idle,
  uploadCSV: Status.idle
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

export const uploadEmployeesCSVAsync = createAsyncThunk(
  'employee/upload/csv',
  async (file: FormData, { rejectWithValue, dispatch }) => {
    console.log('ssss', file)
    try {
      const response = await uploadEmployeesCSV(file)
      if (response?.status === 201) {
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
      // fetch employees
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

      // upload csv
      .addCase(uploadEmployeesCSVAsync.pending, (state) => {
        state.uploadCSV = Status.loading
      })
      .addCase(uploadEmployeesCSVAsync.fulfilled, (state, action) => {
        state.uploadCSV = Status.idle
      })
      .addCase(uploadEmployeesCSVAsync.rejected, (state) => {
        state.uploadCSV = Status.failed
      })
  }
})

export default employeeSlice.reducer
