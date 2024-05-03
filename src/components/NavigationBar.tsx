import React, { useState } from 'react'
import demoprofile from "../assets/images/demoprofilepic.png"
import { useLocation, useNavigate } from 'react-router-dom'
import styles from "./NavigationBarStyle.module.scss"

function NavigationBar() {
    const location = useLocation()
    const [dropDown, setDropDown] = useState("")
    const [typeMaster, setTypeMaster] = useState(false)
    const navigate = useNavigate()

    console.log(styles)
    return (
        <div className='bg-[#5970F5] w-full px-10'>
            <div className='flex justify-between py-1 items-center'>
                <h1 className='text-[30px] text-white font-semibold '>Logo</h1>

                {/* search bar */}
                {/* <label htmlFor="" className='flex bg-[#F4F4F4] gap-5 rounded w-1/2 items-center px-2 py-1'>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5556 16.5556L21 21M1 9.88889C1 12.2464 1.93651 14.5073 3.6035 16.1743C5.27049 17.8413 7.53141 18.7778 9.88889 18.7778C12.2464 18.7778 14.5073 17.8413 16.1743 16.1743C17.8413 14.5073 18.7778 12.2464 18.7778 9.88889C18.7778 7.53141 17.8413 5.27049 16.1743 3.6035C14.5073 1.93651 12.2464 1 9.88889 1C7.53141 1 5.27049 1.93651 3.6035 3.6035C1.93651 5.27049 1 7.53141 1 9.88889Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <input type="text" placeholder='Search' className='outline-none border-none w-full placeholder:text-black bg-transparent' />
                </label> */}

                <div className='flex gap-3'>
                    {/*call support button */}
                    <button className=' bg-[#F4F4F4] p-1 rounded'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0C4.486 0 0 4.486 0 10V14.143C0 15.167 0.897 16 2 16H3C3.26522 16 3.51957 15.8946 3.70711 15.7071C3.89464 15.5196 4 15.2652 4 15V9.857C4 9.59178 3.89464 9.33743 3.70711 9.14989C3.51957 8.96236 3.26522 8.857 3 8.857H2.092C2.648 4.987 5.978 2 10 2C14.022 2 17.352 4.987 17.908 8.857H17C16.7348 8.857 16.4804 8.96236 16.2929 9.14989C16.1054 9.33743 16 9.59178 16 9.857V16C16 17.103 15.103 18 14 18H12V17H8V20H14C16.206 20 18 18.206 18 16C19.103 16 20 15.167 20 14.143V10C20 4.486 15.514 0 10 0Z" fill="black" />
                        </svg>
                    </button>
                    {/* chat support button */}
                    {/* <button className=' bg-[#F4F4F4] p-1 rounded'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.66705 8.33116C6.66705 8.11015 6.75484 7.89819 6.91112 7.74192C7.06739 7.58564 7.27935 7.49785 7.50035 7.49785H12.5002C12.7212 7.49785 12.9332 7.58564 13.0894 7.74192C13.2457 7.89819 13.3335 8.11015 13.3335 8.33116C13.3335 8.55216 13.2457 8.76412 13.0894 8.92039C12.9332 9.07667 12.7212 9.16447 12.5002 9.16447H7.50035C7.27935 9.16447 7.06739 9.07667 6.91112 8.92039C6.75484 8.76412 6.66705 8.55216 6.66705 8.33116ZM7.50035 10.8311C7.27935 10.8311 7.06739 10.9189 6.91112 11.0752C6.75484 11.2314 6.66705 11.4434 6.66705 11.6644C6.66705 11.8854 6.75484 12.0974 6.91112 12.2536C7.06739 12.4099 7.27935 12.4977 7.50035 12.4977H10.8336C11.0546 12.4977 11.2666 12.4099 11.4228 12.2536C11.5791 12.0974 11.6669 11.8854 11.6669 11.6644C11.6669 11.4434 11.5791 11.2314 11.4228 11.0752C11.2666 10.9189 11.0546 10.8311 10.8336 10.8311H7.50035ZM0.000575426 9.99777C0.00100068 7.79625 0.727929 5.6564 2.0686 3.91017C3.40926 2.16394 5.28872 0.908941 7.41542 0.339863C9.54213 -0.229216 11.7972 -0.080566 13.8308 0.762753C15.8644 1.60607 17.5628 3.09692 18.6627 5.00403C19.7625 6.91113 20.2023 9.12789 19.9137 11.3104C19.6251 13.4929 18.6244 15.5192 17.0667 17.075C15.509 18.6307 13.4815 19.6289 11.2986 19.9148C9.1157 20.2006 6.89949 19.7581 4.99376 18.6558L1.09721 19.9558C0.953251 20.0039 0.7989 20.0117 0.650814 19.9785C0.502727 19.9452 0.36653 19.8722 0.256922 19.7672C0.147313 19.6622 0.0684559 19.5293 0.0288598 19.3828C-0.0107363 19.2363 -0.0095671 19.0817 0.0322412 18.9358L1.21887 14.7843C0.417257 13.3164 -0.00172976 11.6703 0.000575426 9.99777ZM10.0003 1.66469C8.52896 1.6646 7.08384 2.05406 5.81183 2.7935C4.53981 3.53293 3.48626 4.59598 2.75825 5.87456C2.03024 7.15315 1.65373 8.6017 1.66701 10.073C1.68028 11.5442 2.08286 12.9857 2.83383 14.251C2.8916 14.3487 2.9288 14.4572 2.94313 14.5699C2.95746 14.6825 2.94862 14.7969 2.91716 14.906L2.06885 17.8725L4.8321 16.9526C4.94945 16.9134 5.07406 16.9009 5.19686 16.9159C5.31966 16.9308 5.43759 16.973 5.54208 17.0392C6.63416 17.7304 7.87204 18.158 9.15785 18.2884C10.4437 18.4187 11.7422 18.2482 12.9508 17.7903C14.1593 17.3324 15.2448 16.5997 16.1214 15.65C16.9981 14.7004 17.6418 13.5598 18.0017 12.3185C18.3617 11.0773 18.428 9.76929 18.1953 8.49798C17.9627 7.22668 17.4376 6.02691 16.6615 4.9935C15.8854 3.96009 14.8795 3.12137 13.7234 2.54363C12.5673 1.9659 11.2927 1.66499 10.0003 1.66469Z" fill="black" />
                        </svg>
                    </button> */}
                    {/* settings button */}
                    <button className=' bg-[#F4F4F4] p-1 rounded'>
                        <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.7491 12.5856L17.2819 11.3312C17.3513 10.9056 17.3872 10.471 17.3872 10.0365C17.3872 9.60192 17.3513 9.16735 17.2819 8.74174L18.7491 7.48732C18.8598 7.39258 18.939 7.2664 18.9762 7.12555C19.0134 6.9847 19.0069 6.83587 18.9574 6.69883L18.9373 6.64059C18.5333 5.51167 17.9285 4.46514 17.152 3.55158L17.1116 3.50454C17.0174 3.39377 16.8919 3.31415 16.7515 3.27616C16.6112 3.23817 16.4626 3.2436 16.3254 3.29173L14.5042 3.9391C13.8322 3.38805 13.0818 2.95349 12.2709 2.64884L11.9192 0.744812C11.8927 0.601544 11.8232 0.469741 11.72 0.366913C11.6168 0.264085 11.4847 0.1951 11.3413 0.169123L11.2808 0.157923C10.1138 -0.0526408 8.88623 -0.0526408 7.71917 0.157923L7.65869 0.169123C7.51532 0.1951 7.38325 0.264085 7.28002 0.366913C7.17679 0.469741 7.10729 0.601544 7.08076 0.744812L6.72684 2.6578C5.92241 2.96251 5.1733 3.39685 4.5092 3.94358L2.67461 3.29173C2.53744 3.24322 2.38876 3.23759 2.24832 3.2756C2.10788 3.31362 1.98233 3.39346 1.88836 3.50454L1.84803 3.55158C1.07241 4.46579 0.46767 5.51214 0.0627256 6.64059L0.0425652 6.69883C-0.0582365 6.97883 0.024645 7.29244 0.250889 7.48732L1.73603 8.75518C1.66659 9.17631 1.63299 9.60639 1.63299 10.0342C1.63299 10.4643 1.66659 10.8944 1.73603 11.3133L0.250889 12.5812C0.140221 12.6759 0.0610152 12.8021 0.0238026 12.9429C-0.0134099 13.0838 -0.00686572 13.2326 0.0425652 13.3697L0.0627256 13.4279C0.468172 14.5569 1.0685 15.5985 1.84803 16.5169L1.88836 16.5639C1.98256 16.6747 2.10811 16.7543 2.24847 16.7923C2.38883 16.8303 2.5374 16.8249 2.67461 16.7768L4.5092 16.1249C5.17673 16.6737 5.92266 17.1083 6.72684 17.4107L7.08076 19.3237C7.10729 19.4669 7.17679 19.5987 7.28002 19.7016C7.38325 19.8044 7.51532 19.8734 7.65869 19.8994L7.71917 19.9106C8.89695 20.1223 10.103 20.1223 11.2808 19.9106L11.3413 19.8994C11.4847 19.8734 11.6168 19.8044 11.72 19.7016C11.8232 19.5987 11.8927 19.4669 11.9192 19.3237L12.2709 17.4196C13.0815 17.1158 13.8361 16.6798 14.5042 16.1294L16.3254 16.7768C16.4626 16.8253 16.6112 16.8309 16.7517 16.7929C16.8921 16.7549 17.0177 16.675 17.1116 16.5639L17.152 16.5169C17.9315 15.5963 18.5318 14.5569 18.9373 13.4279L18.9574 13.3697C19.0582 13.0941 18.9754 12.7805 18.7491 12.5856ZM15.6915 9.00607C15.7475 9.34431 15.7766 9.69152 15.7766 10.0387C15.7766 10.3859 15.7475 10.7331 15.6915 11.0714L15.5436 11.9696L17.2169 13.401C16.9633 13.9854 16.6431 14.5386 16.2627 15.0497L14.1839 14.3127L13.4805 14.8906C12.9452 15.3297 12.3493 15.6747 11.7042 15.9166L10.8507 16.2369L10.4498 18.4097C9.81712 18.4814 9.1784 18.4814 8.54574 18.4097L8.14478 16.2324L7.29804 15.9076C6.65963 15.6657 6.06602 15.3207 5.53514 14.8839L4.83176 14.3038L2.73957 15.0474C2.35876 14.5345 2.04068 13.9812 1.78531 13.3988L3.47654 11.954L3.33094 11.0579C3.27718 10.7242 3.24806 10.3792 3.24806 10.0387C3.24806 9.696 3.27494 9.35327 3.33094 9.01951L3.47654 8.12349L1.78531 6.67867C2.03844 6.09402 2.35876 5.54297 2.73957 5.03L4.83176 5.77369L5.53514 5.19352C6.06602 4.75672 6.65963 4.41175 7.29804 4.16983L8.14702 3.8495L8.54799 1.67219C9.17743 1.60051 9.82033 1.60051 10.452 1.67219L10.853 3.84502L11.7064 4.16535C12.3493 4.40727 12.9474 4.75224 13.4828 5.19128L14.1862 5.76921L16.2649 5.03224C16.6457 5.54521 16.9638 6.0985 17.2192 6.68091L15.5459 8.11229L15.6915 9.00607ZM9.50224 5.87225C7.32492 5.87225 5.55978 7.6374 5.55978 9.81472C5.55978 11.992 7.32492 13.7572 9.50224 13.7572C11.6796 13.7572 13.4447 11.992 13.4447 9.81472C13.4447 7.6374 11.6796 5.87225 9.50224 5.87225ZM11.2764 11.5888C11.0437 11.8222 10.7671 12.0072 10.4627 12.1333C10.1582 12.2594 9.83179 12.3241 9.50224 12.3236C8.83247 12.3236 8.20302 12.0615 7.72813 11.5888C7.49477 11.3561 7.30972 11.0796 7.18363 10.7751C7.05754 10.4707 6.99289 10.1443 6.9934 9.81472C6.9934 9.14495 7.25548 8.5155 7.72813 8.04061C8.20302 7.56572 8.83247 7.30588 9.50224 7.30588C10.172 7.30588 10.8015 7.56572 11.2764 8.04061C11.5097 8.2733 11.6948 8.54984 11.8209 8.85431C11.9469 9.15878 12.0116 9.48517 12.0111 9.81472C12.0111 10.4845 11.749 11.1139 11.2764 11.5888Z" fill="black" />
                        </svg>
                    </button>
                    {/* notification button */}
                    <button className=' bg-[#F4F4F4] p-1 rounded'>
                        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3565 19.0194C13.3566 19.5839 13.1434 20.1276 12.7596 20.5415C12.3757 20.9555 11.8496 21.209 11.2867 21.2514L11.1189 21.257H8.8813C8.31679 21.2571 7.77307 21.0439 7.35914 20.6601C6.9452 20.2762 6.69166 19.7501 6.64932 19.1872L6.64372 19.0194H13.3565ZM10.0001 1.0674e-09C12.0307 -3.35021e-05 13.9819 0.788626 15.4421 2.19962C16.9024 3.61061 17.7575 5.53362 17.8271 7.563L17.8316 7.83151V12.0426L19.87 16.1195C19.959 16.2974 20.0035 16.4942 19.9998 16.693C19.9961 16.8919 19.9442 17.0869 19.8486 17.2613C19.753 17.4357 19.6166 17.5844 19.451 17.6946C19.2854 17.8047 19.0956 17.8731 18.8978 17.8939L18.7691 17.9006H1.23103C1.03207 17.9007 0.836061 17.8525 0.659801 17.7602C0.48354 17.6679 0.332284 17.5342 0.218994 17.3707C0.105703 17.2071 0.0337566 17.0185 0.00931879 16.8211C-0.015119 16.6236 0.00868087 16.4232 0.0786789 16.237L0.130143 16.1195L2.16857 12.0426V7.83151C2.16857 5.75447 2.99368 3.76249 4.46237 2.2938C5.93107 0.825103 7.92304 1.0674e-09 10.0001 1.0674e-09ZM10.0001 2.23757C8.55857 2.23766 7.17273 2.79422 6.13157 3.79119C5.09041 4.78816 4.47431 6.14858 4.41174 7.58874L4.40615 7.83151V12.0426C4.40616 12.3201 4.35457 12.5951 4.25399 12.8537L4.17009 13.0439L2.8611 15.663H17.1402L15.8312 13.0428C15.707 12.7948 15.63 12.5258 15.6041 12.2496L15.594 12.0426V7.83151C15.594 6.34791 15.0047 4.92507 13.9556 3.876C12.9065 2.82693 11.4837 2.23757 10.0001 2.23757Z" fill="black" />
                        </svg>
                    </button>
                    {/* profile button */}
                    <button className=' rounded'>
                        <img src={demoprofile} className='h-[30px]' alt="" />
                    </button>
                </div>
            </div>
            {/* navigation bar */}
            <div className='flex w-full mt-3'>
                <button onClick={()=>navigate("/dashboard")} className={' rounded-[20px_0_0_0] px-4 py-1 font-semibold transition-all duration-100 text-[15px] ' + (location.pathname.includes("/dashboard") ? " bg-white" : " bg-[#C3CBFF]")+" "}>Dashboard</button>
                <button id='dropMaster' className={' rounded-[20px_0_0_0] px-4 py-1 font-semibold  transition-all duration-100 text-[15px] z-[10]  relative' + (location.pathname.includes("/master") ? " bg-white" : " bg-[#C3CBFF]")} ><p onClick={() => setDropDown(dropDown === "master" ? "" : "master")}>Master</p> {dropDown==="master" && <div  className={'flex p-1 flex-col absolute shadow-md bg-white left-0 w-[150px] bottom-0 translate-y-[100%] justify-start shadow-[#00000034] text-sm font-normal '}>
                    {typeMaster ? <ul className='list-item'>
                        <dl onClick={() => setTypeMaster(!typeMaster)} className='flex justify-between text-[#5970F5]'>Type Master <span>-</span></dl>
                        <li className="text-start ms-5" onClick={()=>navigate("/master/type-master/customer-type")}>Customer Type</li>
                        <li className="text-start ms-5" onClick={()=>navigate("/master/type-master/account-type")}>Account Type</li>
                        <li className="text-start ms-5" onClick={()=>navigate("/master/type-master/payment-type")}>Payment Type</li>
                        <li className="text-start ms-5" onClick={()=>navigate("/master/type-master/discount-type")}>Discount Type</li>
                        <li className="text-start ms-5" onClick={()=>navigate("/master/type-master/document-type")}>Document Type</li>
                        <li className="text-start ms-5" onClick={()=>navigate("/master/type-master/certification-type")}>Certification Type</li>
                        <li className="text-start ms-5" onClick={()=>navigate("/master/type-master/uom-type")}>UOM Type</li>
                        <li className="text-start ms-5" onClick={()=>navigate("/master/type-master/tax-type")}>Tax Type</li>
                        <li className="text-start ms-5 text-xs" onClick={()=>navigate("/master/type-master/margin-setting-type")}>Margin Setting Type</li>
                        <li className="text-start ms-5" onClick={()=>navigate("/master/type-master/vendor-type")}>Vendor Type</li>
                    </ul> : <button onClick={() => setTypeMaster(!typeMaster)} className='flex justify-between text-[#5970F5]'>Type Master <span>+</span></button>}
                    <button className='text-start' onClick={()=>navigate("/master/customer-master")}>Customer Master</button>
                    <button className='text-start' onClick={()=>navigate("/master/vendor-master")}>Vendor Master</button>
                    <button className='text-start'  onClick={()=>navigate("/master/product-master")}>Product Master</button>
                    <button className='text-start'  onClick={()=>navigate("/master/profile-master")}>Profile Master</button>
                </div>}</button>

                
                <button className={' rounded-[20px_0_0_0]  px-4 py-1 font-semibold transition-all duration-100 text-[15px] relative ' + (location.pathname === "" ? " bg-white" : " bg-[#C3CBFF]")}><p onClick={() => setDropDown(dropDown === "inventory" ? "" : "inventory")}>Inventory Management</p>{dropDown==="inventory" && <div  className={'flex p-1 z-[10] bg-white flex-col absolute shadow-md left-0 w-full bottom-0 translate-y-[100%] justify-start shadow-[#00000034] text-sm font-normal '}>
                    <button className='text-start'  onClick={()=>navigate("/inventory/purchase-order")}>Purchase Order</button>
                    <button className='text-start'>Purchase Inward</button>
                    <button className='text-start'>Stock Check</button>
                    <button className='text-start'>Raw Material - Outward</button>
                    <button className='text-start'>Finished Goods - Inward</button>
                </div>}</button>
                <button className={' rounded-[20px_0_0_0] px-4 py-1 font-semibold transition-all duration-100 text-[15px] relative ' + (location.pathname === "" ? " bg-white" : " bg-[#C3CBFF]")}><p onClick={() => setDropDown(dropDown === "quality" ? "" : "quality")}>Quality Management</p>{dropDown==="quality" && <div  className={'flex p-1 flex-col absolute shadow-md left-0 w-full bottom-0 translate-y-[100%] justify-start shadow-[#00000034] text-sm font-normal '}>
                    <button className='text-start'>Quality Check - PO</button>
                    <button className='text-start'>Quality Check - FG</button>
                </div>}</button>
                <button className={' rounded-[20px_0_0_0] px-4 py-1 font-semibold transition-all duration-100 text-[15px] relative ' + (location.pathname === "" ? " bg-white" : " bg-[#C3CBFF]")}>Production Management</button>
                <button className={' rounded-[20px_0_0_0] px-4 py-1 font-semibold transition-all duration-100 text-[15px] relative' + (location.pathname === "" ? " bg-white" : " bg-[#C3CBFF]")}><p onClick={() => setDropDown(dropDown === "supply-chain" ? "" : "supply-chain")}>Supply Chain Management</p> {dropDown==="supply-chain" && <div  className={'flex p-1 flex-col absolute shadow-md left-0 w-full bottom-0 translate-y-[100%] justify-start shadow-[#00000034] text-sm font-normal '}>
                    <button className='text-start'>Finished Goods Outward</button>
                </div>}</button>
                <button onClick={()=>navigate("/order-management")} className={' rounded-[20px_0_0_0] px-4 py-1 font-semibold transition-all duration-100 text-[15px] ' + (location.pathname === "/order-management" ? " bg-white" : " bg-[#C3CBFF]")}>Order Management</button>
                <button className={' rounded-[20px_0_0_0] px-4 py-1 font-semibold transition-all duration-100 text-[15px] ' + (location.pathname === "" ? " bg-white" : " bg-[#C3CBFF]")}>More</button>

            </div>
        </div>
    )
}

export default NavigationBar