import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import employeeReducer from 'features/employee/employeeSlice'
import appReducer from 'features/app/app.slice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    employee: employeeReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>
