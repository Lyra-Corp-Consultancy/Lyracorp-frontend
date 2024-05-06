import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios/instance";

type Type = "customer" | "payment" | "account" | "discount" | "document" | "certification" | "uom" | "tax" | "marginSetting" | "vendor" | "department" | "role";

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


interface ProfileMaster {
  fileUrls: string[];
  logo?: string;
  companyName?: string;
  businessType?: string;
  contactNumber?: string;
  country?: string;
  state?: string;
  district?: string;
  city?: string;
  zone?: string;
  address?: string;
  pincode?: string;
  aadharNumber?: string;
  panNumber?: string;
  regNumber?: string;
  gstinNumber?: string;
  bankAccNo?: string;
  accBranch?: string;
  ifscCode?: string;
  bussinessDocument?: string;
}

interface VendorMasterData {
  vendorName?: string;
  vendorType?: string;
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
  bankAccNo?: string;
  accountBranch?: string;
  ifscCode?: string;
  paymentTerms?: string;
  bussinessDocument?: string;
  fileUrls?: string[];
}

export const postType = createAsyncThunk("user/postType", async ({ value, type }: { value: string | {  [des:string]: string }; type: Type }, { rejectWithValue }) => {
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

export const updateType = createAsyncThunk("user/editType", async (value: { id: string; val: string | { [key:string]: string }; type: Type }, { rejectWithValue }) => {
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



export const editCustomerMaster = createAsyncThunk("user/editCustomerMaster", async ({data,id}:{data:CustomerMasterData,id:string}, { rejectWithValue }) => {
    try {
      await instance.patch("/master/customer-master/"+id, { data });
      return 
    } catch (err) {
      rejectWithValue(err);
    }
  });


  export const editProductMaster = createAsyncThunk("user/editProductMaster", async ({data,id}:{data:CustomerMasterData,id:string}, { rejectWithValue }) => {
    try {
      await instance.patch("/master/product-master/"+id, { data });
      return 
    } catch (err) {
      rejectWithValue(err);
    }
  });


  export const editProfileMaster = createAsyncThunk("user/editProfileMaster", async ({data,id}:{data:CustomerMasterData,id:string}, { rejectWithValue }) => {
    try {
      await instance.patch("/master/profile-master/"+id, { data });
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


export const getProductMasterById = createAsyncThunk("user/getProductMasterById", async(id:string,{rejectWithValue})=>{
  try{
      const res = await instance.get("/master/product-master/individual",{params:{id}});
      return res.data;
  }catch(err){
      rejectWithValue(err);
  }
})

export const getProfileMasterById = createAsyncThunk("user/getProfileMasterById", async(id:string,{rejectWithValue})=>{
  try{
      const res = await instance.get("/master/profile-master/individual",{params:{id}});
      return res.data;
  }catch(err){
      rejectWithValue(err);
  }
})

export const addVendorMaster = createAsyncThunk("user/addVendorMaster", async (data: VendorMasterData, { rejectWithValue }) => {
  try {
    console.log(data)
    const res = await instance.post("/master/vendor-master", { data });
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});


export const addProductMaster = createAsyncThunk("user/addProductMaster", async (data: VendorMasterData, { rejectWithValue }) => {
  try {
    console.log(data)
    const res = await instance.post("/master/product-master", { data });
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});


export const addProfileMaster = createAsyncThunk("user/addProductMaster", async (data: ProfileMaster, { rejectWithValue }) => {
  try {
    console.log(data)
    const res = await instance.post("/master/profile-master", { data });
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});


export const getAllVendorMaster = createAsyncThunk("user/getAllVendorMaster", async (_, { rejectWithValue }) => {
  try {
    const res = await instance.get("/master/vendor-master/all");
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const getAllProfileMaster = createAsyncThunk("user/getAllProfileMaster", async (_, { rejectWithValue }) => {
  try {
    const res = await instance.get("/master/profile-master/all");
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const activeAndDeactiveVendorMaster = createAsyncThunk("user/inactiveVendorMaster", async (id: string[], { rejectWithValue }) => {
  try {
    await instance.delete("/master/vendor-master",{params:{id}});
    return
  } catch (err) {
    rejectWithValue(err);
  }
});

export const activeAndDeactiveProfileMaster = createAsyncThunk("user/inactiveVendorMaster", async (id: string, { rejectWithValue }) => {
  try {
    await instance.delete("/master/profile-master",{params:{id}});
    return
  } catch (err) {
    rejectWithValue(err);
  }
});


export const getVendorMasterById = createAsyncThunk("user/getVendorMasterById", async(id:string,{rejectWithValue})=>{
  try{
      const res = await instance.get("/master/vendor-master/individual",{params:{id}});
      return res.data;
  }catch(err){
      rejectWithValue(err);
  }
})



export const editVendorMaster = createAsyncThunk("user/editVendorMaster", async ({data,id}:{data:CustomerMasterData,id:string}, { rejectWithValue }) => {
  try {
    await instance.patch("/master/vendor-master/"+id, { data });
    return 
  } catch (err) {
    rejectWithValue(err);
  }
});


export const getAllProductMaster = createAsyncThunk("user/getAllProductMaster", async (_, { rejectWithValue }) => {
  try {
    const res = await instance.get("/master/product-master/all");
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});


export const activeAndDeactiveProductMaster = createAsyncThunk("user/inactiveProductMaster", async (id: string[], { rejectWithValue }) => {
  try {
    await instance.delete("/master/product-master",{params:{id}});
    return
  } catch (err) {
    rejectWithValue(err);
  }
});