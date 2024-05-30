/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios/instance";
import { CustomerMasterData, ProfileMaster, PurchaseInward, PurchaseOrder, RawMaterialOutward, Type, UserData, VendorMasterData } from "../Type/types";

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

export const addUser = createAsyncThunk("user/addUser", async (data: UserData, { rejectWithValue }) => {
  try {
    const res = await instance.post("/user-management", { data });
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

  export const editUser = createAsyncThunk("user/editUser", async ({data,id}:{data:UserData,id:string}, { rejectWithValue }) => {
    try {
      await instance.patch("/user-management/"+id, { data });
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


  export const editProfileMaster = createAsyncThunk("user/editProfileMaster", async ({data,id}:{data:ProfileMaster,id:string}, { rejectWithValue }) => {
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

export const getAllUserManagement = createAsyncThunk("user/getAllUserManagement", async (_, { rejectWithValue }) => {
  try {
    const res = await instance.get("/user-management/all");
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const getUser = createAsyncThunk("user/getUser", async (id:string, { rejectWithValue }) => {
  try {
    const res = await instance.get("/user-management/individual",{params: { id}});
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const userPermission = createAsyncThunk("user/userPermission", async ({data,id}:{data:{ view: string[]; edit: string[]; delete: string[]; add: string[] },id:string}, { rejectWithValue }) => {
  try {
    const res = await instance.patch("/user-management/permissions",{data,id});
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

export const activeAndDeactiveUser = createAsyncThunk("user/inactiveUser", async (id: string[], { rejectWithValue }) => {
  try {
    await instance.delete("/user-management",{params:{id}});
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
    console.log(res)
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


export const activeAndDeactivePurchaseOrder = createAsyncThunk("user/activeAndDeactivePurchaseOrder", async (id: string[], { rejectWithValue,getState }) => {
  try {
    const state:any = getState()
    let lineOfBusiness:string | null
    if(state?.data?.user?.superAdmin){
      lineOfBusiness = state.data?.superAdminCompany?._id
    }else{
      lineOfBusiness = state.data?.user?.company
    }
    await instance.delete("/inventory/purchase-order",{params:{id,lineOfBusiness}});
    return
  } catch (err) {
    rejectWithValue(err);
  }
});

export const activeAndDeactivePurchaseInward = createAsyncThunk("user/activeAndDeactivePurchaseInward", async (id: string[], { rejectWithValue,getState }) => {
  try {
    const state:any = getState()
    let lineOfBusiness:string | null
    if(state?.data?.user?.superAdmin){
      lineOfBusiness = state.data?.superAdminCompany?._id
    }else{
      lineOfBusiness = state.data?.user?.company
    }
    await instance.delete("/inventory/purchase-inward",{params:{id,lineOfBusiness}});
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

export const getMyDetails = createAsyncThunk("user/getMyDetails", async (_,{ rejectWithValue,fulfillWithValue }) => {
  try {
    const res = await instance.get("/get-my-details");
    fulfillWithValue(res.data)
    return res.data
  } catch (err) {
    rejectWithValue(err);
  }
});

export const addPurchaseOrder = createAsyncThunk("user/add-purchase-order", async (data: PurchaseOrder, { rejectWithValue }) => {
  try {
    const res = await instance.post("/inventory/purchase-order", { data });
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const addPurchaseInward = createAsyncThunk("user/add-purchase-inward", async (data: PurchaseInward, { rejectWithValue }) => {
  try {
    const res = await instance.post("/inventory/purchase-inward", { data });
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});


export const addRawMaterialOutward = createAsyncThunk("user/addRawMaterialOutward", async (data: RawMaterialOutward, { rejectWithValue }) => {
  try {
    const res = await instance.post("/inventory/raw-material-outward", { data });
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const getAllPurchaseOrder = createAsyncThunk("user/getAllPurchaseOrder", async (_, { rejectWithValue,getState }) => {
  try {
    const state:any = getState()
    let lineOfBusiness:string | null
    if(state?.data?.user?.superAdmin){
      lineOfBusiness = state.data?.superAdminCompany?._id
    }else{
      lineOfBusiness = state.data?.user?.company
    }
    const res = await instance.get("/inventory/purchase-order/all",{params:{lineOfBusiness}});
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});


export const getAllPurchaseInward = createAsyncThunk("user/getAllPurchaseInward", async (_, { rejectWithValue,getState }) => {
  try {
    const state:any = getState()
    let lineOfBusiness:string | null
    if(state?.data?.user?.superAdmin){
      lineOfBusiness = state.data?.superAdminCompany?._id
    }else{
      lineOfBusiness = state.data?.user?.company
    }
    const res = await instance.get("/inventory/purchase-inward/all",{params:{lineOfBusiness}});
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const getAllQCPO = createAsyncThunk("user/getAllQCPO", async (_, { rejectWithValue,getState }) => {
  try {
    const state:any = getState()
    let lineOfBusiness:string | null
    if(state?.data?.user?.superAdmin){
      lineOfBusiness = state.data?.superAdminCompany?._id
    }else{
      lineOfBusiness = state.data?.user?.company
    }
    const res = await instance.get("/qc/qc-po/all",{params:{lineOfBusiness}});
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});

export const getAllRawMaterialOutward = createAsyncThunk("user/getAllRawMaterialOutward", async (_, { rejectWithValue,getState }) => {
  try {
    const state:any = getState()
    let lineOfBusiness:string | null
    if(state?.data?.user?.superAdmin){
      lineOfBusiness = state.data?.superAdminCompany?._id
    }else{
      lineOfBusiness = state.data?.user?.company
    }
    const res = await instance.get("/inventory/raw-material-outward/all",{params:{lineOfBusiness}});
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});


export const getPurchaseOrderById = createAsyncThunk("user/getPurchaseOrderById", async(id:string,{rejectWithValue})=>{
  try{
      const res = await instance.get("/inventory/purchase-order/individual",{params:{id}});
      return res.data;
  }catch(err){
      rejectWithValue(err);
  }
})

export const getPurchaseInwardById = createAsyncThunk("user/getPurchaseInwardById", async(id:string,{rejectWithValue})=>{
  try{
      const res = await instance.get("/inventory/purchase-inward/individual",{params:{id}});
      return res.data;
  }catch(err){
      rejectWithValue(err);
  }
})


export const editPurchaseOrder = createAsyncThunk("user/editPurchaseOrder", async ({data,id}:{data:PurchaseOrder,id:string}, { rejectWithValue }) => {
  try {
    await instance.patch("/inventory/purchase-order/"+id, { data });
    return 
  } catch (err) {
    rejectWithValue(err);
  }
});

export const editPurchaseInward = createAsyncThunk("user/editPurchaseInward", async ({data,id}:{data:PurchaseInward,id:string}, { rejectWithValue }) => {
  try {
    await instance.patch("/inventory/purchase-inward/"+id, { data });
    return 
  } catch (err) {
    rejectWithValue(err);
  }
});

export const saveQCPO = createAsyncThunk("user/saveQCPO", async ({data,id}:{data:{productId:string,rejected:number}[],id:string}, { rejectWithValue }) => {
  try {
    await instance.patch("/qc/qc-po/"+id, { data });
    return 
  } catch (err) {
    rejectWithValue(err);
  }
});

export const getPurchaseOrdeBySerialNumber = createAsyncThunk("user/getPurchaseOrdeBySerialNumber", async (seqNumber:string, { rejectWithValue }) => {
  try {
    
   const res =  await instance.get("/inventory/purchase-order/getBySerialNumber", { params:{serialNumber:seqNumber} });
    return res.data
  } catch (err) {
    rejectWithValue(err);
  }
});

export const getPurchaseInwardByGRNNumber = createAsyncThunk("user/getPurchaseInwardByGRNNumber", async (grn:string, { rejectWithValue }) => {
  try {
    
   const res =  await instance.get("/inventory/purchase-inward/getByGRN", { params:{grn} });
    return res.data
  } catch (err) {
    rejectWithValue(err);
  }
});

export const getProductFromPurchaseOrderByGRNAndQuantity = createAsyncThunk("user/getProductFromPurchaseOrderByGRNAndQuantity",async (_, { rejectWithValue,getState }) => {
  try {
    const state:any = getState()
    let lineOfBusiness:string | null
    if(state?.data?.user?.superAdmin){
      lineOfBusiness = state.data?.superAdminCompany?._id
    }else{
      lineOfBusiness = state.data?.user?.company
    }
    
   const res =  await instance.get("/inventory/purchase-inward/get-products-with-quantity-and-grn", { params:{lineOfBusiness} });
    return res.data
  } catch (err) {
    rejectWithValue(err);
  }
})

export const getRawMaterialOutwardById = createAsyncThunk("user/getRawMaterialOutwardById", async (id:string, { rejectWithValue }) => {
  try {
    const res = await instance.get("/inventory/raw-material-outward/individual",{params: { id}});
    return res.data;
  } catch (err) {
    rejectWithValue(err);
  }
});
