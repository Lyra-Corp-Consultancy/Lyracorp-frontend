import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios/instance";

type Type = "customer" | "payment" | "account" | "discount" | "document" | "certification" | "uom" | "tax" | "marginSetting" | "vendor";

interface CustomerMasterData {
  customerId?: string;
  customerName?: string;
  customerType?: string;
  accountType?: string;
  contactPerson?: string;
  email?: string;
  primaryNumber?: string;
  secondaryNumber?: string;
  country?: string;
  state?: string;
  district?: string;
  city?: string;
  zone?: string;
  address?: string;
  pincode?: string;
  purchaseResitriction?: string;
  discountType?: string;
  paymentTerms?: string;
  bussinessDocument?: string;
  fileUrls?: string[];
}

export const postType = createAsyncThunk("user/postType", async ({ value, type }: { value: string | { name: string; des: string }; type: Type }, { rejectWithValue }) => {
  try {
    await instance.post("/master/type-master", { value, type });
    return;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const getType = createAsyncThunk("user/getCustomerType", async (type: Type, { rejectWithValue }) => {
  try {
    const res = await instance.get("/master/type-master", { params: { type } });
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const deleteTypeMaster = createAsyncThunk("user/deleteType", async ({ values, type }: { values: string[]; type: Type }, { rejectWithValue }) => {
  try {
    const res = await instance.delete("/master/type-master/" + type, { params: { values } });
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const updateType = createAsyncThunk("user/editType", async (value: { id: string; val: string | { name: string; des: string }; type: Type }, { rejectWithValue }) => {
  try {
    await instance.patch("/master/type-master/" + value.id, { val: value.val, type: value.type });
  } catch (err) {
    rejectWithValue(err);
  }
});

export const addCustomerMaster = createAsyncThunk("user/addCustomerMaster", async (data: CustomerMasterData, { rejectWithValue }) => {
  try {
    const res = await instance.post("/master/customer-master", { data });
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const editCustomerMaster = createAsyncThunk("user/edit   CustomerMaster", async ({data,id}:{data:CustomerMasterData,id:string}, { rejectWithValue }) => {
    try {
      await instance.patch("/master/customer-master/"+id, { data });
      return 
    } catch (err) {
      rejectWithValue(err);
    }
  });

export const getAllCustomerMaster = createAsyncThunk("user/getAllCustomerMaster", async (_, { rejectWithValue }) => {
  try {
    const res = await instance.get("/master/customer-master/all");
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const activeAndDeactiveCustomerMaster = createAsyncThunk("user/inactiveCustomerMaster", async (id: string[], { rejectWithValue }) => {
  try {
    await instance.delete("/master/customer-master",{params:{id}});
    return
  } catch (err) {
    rejectWithValue(err);
  }
});

export const getCustomerMasterById = createAsyncThunk("user/getCustomerMasterById", async(id:string,{rejectWithValue})=>{
    try{
        const res = await instance.get("/master/customer-master/individual",{params:{id}});
        return res.data;
    }catch(err){
        rejectWithValue(err);
    }
})
