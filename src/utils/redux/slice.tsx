/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import { addCustomerMaster, addVendorMaster, getMyDetails } from './actions'

export interface CounterState {
  msg: string|number,
  submsg: string|number,
  toaster:boolean,
  user?:any,
  pathToGo?:string
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
    addPathToGo:(state,{payload})=>{
      state.pathToGo = payload
    },
  },
  extraReducers(builder) {
    builder.addCase(addCustomerMaster.fulfilled,(state,action)=>{
      state.msg = `Customer Account Number Create as ${action.payload}`
      state.submsg = `Your Customer Account has been Successfully Created`
      state.toaster = true
    })

    builder.addCase(addVendorMaster.fulfilled,(state)=>{
      state.msg = `Vendor Account Create `
      state.submsg = `Your Vendor Account has been Successfully Created`
      state.toaster = true
    })

    builder.addCase(getMyDetails.fulfilled,(state,{payload})=>{
      state.user = payload
    })
  },
})

// Action creators are generated for each case reducer function
export const {  makeToastFalse,addPathToGo} = counterSlice.actions

export default counterSlice.reducer