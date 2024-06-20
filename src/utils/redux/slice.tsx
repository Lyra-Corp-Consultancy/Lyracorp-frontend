/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import { addCustomerMaster, addProductMaster, addVendorMaster, getMyDetails } from './actions'

export interface CounterState {
  msg: string|number,
  submsg: string|number,
  toaster:boolean,
  user?:any,
  pathToGo?:string,
  superAdminCompany?:any,
  loader:boolean,
}

const initialState: CounterState = {
  msg: `Customer Account Number Created as 04565`,
  submsg:`Your Customer Account has been Successfully Created`,
  toaster:false,
  loader:false,
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
    setCompany:(state,{payload})=>{
      state.superAdminCompany = payload
    },
    startLoading:(state)=>{
      state.loader = true
    },
    stopLoading:(state)=>{
      state.loader = false
    }
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
    builder.addCase(addProductMaster.pending,(state)=>{
      state.loader = true
    })
    builder.addCase(addProductMaster.fulfilled,(state)=>{
      state.loader = false
    })
    builder.addCase(addProductMaster.rejected,(state)=>{
      state.loader = false
    })
  },
})

// Action creators are generated for each case reducer function
export const {  makeToastFalse,addPathToGo,setCompany,startLoading,stopLoading} = counterSlice.actions

export default counterSlice.reducer