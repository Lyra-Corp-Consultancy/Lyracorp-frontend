import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: string
}

const initialState: CounterState = {
  value: "hello world",
}

export const counterSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    
  },
})

// Action creators are generated for each case reducer function
// export const {  } = counterSlice.actions

export default counterSlice.reducer