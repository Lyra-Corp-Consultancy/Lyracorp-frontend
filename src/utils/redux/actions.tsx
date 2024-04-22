import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios/instance";


type Type = "customer" | "payment" | "account" | "discount" | "document";

export const postType = createAsyncThunk("user/postType", async ({value,type}:{value:string,type:Type}, { rejectWithValue }) => {
    try {
        await instance.post("/master/type-master", { value,type })
        return
    } catch (err) {
        rejectWithValue(err)
    }
})

export const getType = createAsyncThunk("user/getCustomerType", async (type:Type, { rejectWithValue }) => {
    try {
        const res = await instance.get("/master/type-master",{params:{type}})
        console.log(res.data)
        return res.data
    } catch (err) {
        rejectWithValue(err)
    }
})

export const deleteTypeMaster = createAsyncThunk("user/deleteType", async ({values,type}:{values:string[],type:Type}, { rejectWithValue }) => {
    try {
        const res = await instance.delete("/master/type-master/"+type, { params:{values} })
        console.log(res.data)
        return res.data
    } catch (err) {
        rejectWithValue(err)
    }
})

export const updateType = createAsyncThunk("user/editType", async (value:{id:string,val:string,type:Type}, { rejectWithValue })=>{
    try {
         await instance.patch("/master/type-master/"+value.id, { val:value.val,type:value.type })
    } catch (err) {
        rejectWithValue(err)
    }
})
