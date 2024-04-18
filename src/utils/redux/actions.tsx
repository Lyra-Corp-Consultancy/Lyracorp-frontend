import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios/instance";


export const postCustomerType = createAsyncThunk("user/postCustomerType", async (value: string, { rejectWithValue }) => {
    try {
        await instance.post("/master/type-master/customer-type", { value })
        return
    } catch (err) {
        rejectWithValue(err)
    }
})

export const postAccountType = createAsyncThunk("user/postAccountType", async (value: string, { rejectWithValue }) => {
    try {
        await instance.post("/master/type-master/account-type", { value })
        return
    } catch (err) {
        rejectWithValue(err)
    }
})

export const getCustomerType = createAsyncThunk("user/getCustomerType", async (_, { rejectWithValue }) => {
    try {
        const res = await instance.get("/master/type-master/customer-type")
        console.log(res.data)
        return res.data
    } catch (err) {
        rejectWithValue(err)
    }
})

export const getAccountType = createAsyncThunk("user/getAccountType", async (_, { rejectWithValue }) => {
    try {
        const res = await instance.get("/master/type-master/account-type")
        console.log(res.data)
        return res.data
    } catch (err) {
        rejectWithValue(err)
    }
})

export const deleteCustomerType = createAsyncThunk("user/deleteCustomerType", async (values: string[], { rejectWithValue }) => {
    try {
        const res = await instance.post("/master/type-master/customer-type/delete", { values })
        console.log(res.data)
        return res.data
    } catch (err) {
        rejectWithValue(err)
    }
})

export const deleteAccountType = createAsyncThunk("user/deleteAccountType", async (values: string[], { rejectWithValue }) => {
    try {
        const res = await instance.post("/master/type-master/account-type/delete", { values })
        console.log(res.data)
        return res.data
    } catch (err) {
        rejectWithValue(err)
    }
})

export const updateCustomerType = createAsyncThunk("user/editCustomerType", async (value:{id:string,val:string}, { rejectWithValue })=>{
    try {
         await instance.patch("/master/type-master/customer-type/"+value.id, { val:value.val })
       
    } catch (err) {
        rejectWithValue(err)
    }
})

export const updateAccountType = createAsyncThunk("user/editAccountType", async (value:{id:string,val:string}, { rejectWithValue })=>{
    try {
         await instance.patch("/master/type-master/account-type/"+value.id, { val:value.val })
       
    } catch (err) {
        rejectWithValue(err)
    }
})