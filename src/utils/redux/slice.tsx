import { createSlice } from '@reduxjs/toolkit'
import { addCustomerMaster } from './actions'

export interface CounterState {
  msg: string|number,
  submsg: string|number,
  toaster:boolean
}

const initialState: CounterState = {
  msg: `Customer Account Number Created as 04565`,
  submsg:`Your Customer Account has been Successfully Created`,
  toaster:false
}

export const counterSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    makeToastFalse: (state) => {
      state.toaster = false
    },
  },
  extraReducers(builder) {
    builder.addCase(addCustomerMaster.fulfilled,(state,action)=>{
      state.msg = `Customer Account Number Create as ${action.payload}`
      state.submsg = `Your Customer Account has been Successfully Created`
      state.toaster = true
    })
  },
})

// Action creators are generated for each case reducer function
export const {  makeToastFalse} = counterSlice.actions

export default counterSlice.reducer