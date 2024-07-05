/* eslint-disable @typescript-eslint/no-explicit-any */

export type Type = "customer" | "payment" | "account" | "discount" | "document" | "certification" | "uom" | "tax" | "marginSetting" | "vendor" | "department" | "role" | "packing" | "shipping" | "transport" | "paymentTerm";

export interface CustomerMasterData {
  customerId?: string;
  customerName?: string;
  customerType?: string;
  accountType?: string;
  contactPerson?: string;
  email?: string;
  primaryNumber?: string;
  secondaryNumber?: string;
  country?: string;
  countryCode?: string;
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

export interface UserData {
  username: string;
  companyDetails?: any;
  phoneNumber: string;
  email: string;
  employeeId: string;
  password: string;
  department: string;
  role: string;
  company?: string;
  userPhoto?: string;
}

export interface VendorMasterData {
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

export interface Product {
  productId?: string;
  orderQuantity?: string;
  uom?: string;
  packing?: string;
  certificate?: string;
}

export interface PurchaseOrder {
  fileUrls: string[];
  products: Product[];
  deliveryDate?: string;
  deliveryTo?: string;
  shippingMethod?: string;
  shippingAddress?: any;
  billingAddress?: any;
  paymentTerm?: string;
  paymentType?: string;
  bussinessDocument?: string;
  vendor: string;
  lineOfBusiness: string;
}

export interface PurchaseInward {
  vendor?: string;
  products?: {
    productId?: string;
    productDetails?: any;
    recievedQuantity?: string;
    orderQuantity?: string;
    uom?: string;
    batchNumber?: string;
    expDate?: string;
    remarks?: string;
    certificate?: string;
    image?: File;
  }[];
  inwardDate?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  dcNumber?: string;
  transporter?: string;
  warehouse?: any;
  vehicleNumber?: string;
}

interface PrefixSeq {
  prefix?: string;
  seq?: number; // Adjusted to `string` if the input value is treated as a string
}

export interface ProfileMaster {
  
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
  billingAddress?: any[];
  shippingAddress?: any[];
  warehouse?: any[];
  purchaseOrder?: PrefixSeq;
  performInvoice?: PrefixSeq;
  invoice?: PrefixSeq;
  gatePass?: PrefixSeq;
  deliveryChallan?: PrefixSeq;
  grn?: PrefixSeq;
}

interface ProductSubModule {
  name: string;
  rawMaterial: string;
  uom: string;
  quantity?: number;
  productionFloor: string;
  timeDuration?: number;
  department: string;
  order: number;
}

export interface ProductProcess {
  moduleName: string;
  submodule: ProductSubModule[];
  order: number;
}

export interface RawMaterialOutward {
  transportationDistance?: string;
  outwardDate?: string;
  sender?: {
    address?: string;
    [key: string]: any; // Additional properties can be added if necessary
  };
  supplyChain?: string;
  receiver?: {
    address?: string;
    [key: string]: any; // Additional properties can be added if necessary
  };
  transporter?: string;
  vehicleNumber?: string;
  transporterMode?: string;
  transpotationDate?: string;
  transportationDistanceUnit?: string;
  remarks?: string;
  billOfLading?: string;
  products: any[];
  lineOfBusiness?: string;
}

export interface ProductionSOPSub extends ProductSubModule {
  start?: Date;
  end?: Date;
  workedTime?: number;
  user: string;
  remarks?: string;
}

export interface ProductionSOPTypes extends ProductProcess {
  submodule: ProductionSOPSub[];
  moduleName: string;
  order: number;
}

export interface FinishedGoodsInwards {
  product?: string;
  batchNumber?: string;
  productionQuantity?: number;
  uom?: string;
  rejected?: number;
  warehouse?: any;
  pick?: any;
  doc?: string;
  link?: any;
}
