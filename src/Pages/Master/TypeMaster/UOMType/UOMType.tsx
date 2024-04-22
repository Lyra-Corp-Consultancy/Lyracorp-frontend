/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import NavigationBar from '../../../../components/NavigationBar'
import { useDispatch } from 'react-redux'
import { deleteTypeMaster, getType, postType, updateType } from '../../../../utils/redux/actions'

function UOMType() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatch: any = useDispatch()
    const [input, setInput] = useState({ name: "", des: "" })
    const [confirmation, setConfirmation] = useState("")
    const [values, setValues] = useState<any[]>()
    const [search, setSearch] = useState<any[]>()
    const [deleteType, setDelete] = useState<string[]>([])

    const fetchUOMType = () => {
        const res = dispatch(getType("uom"))
        res.then((res: any) => {
            setValues(res.payload[0].uomType)
            setSearch(res.payload[0].uomType)
            setInput({ name: "", des: "" })
        })
    }
    useEffect(() => {
        fetchUOMType()
    }, [])

    useEffect(() => {
        if (deleteType.length === 1) {
            setInput(values?.filter((x) => x._id === deleteType[0])[0].value)
        } else {
            setInput({ des: "", name: "" })
        }
    }, [deleteType])

    const removeUOMType = () => {
        const res = dispatch(deleteTypeMaster({ values: deleteType, type: "uom" }))
        res.then(() => {
            setDelete([])
            fetchUOMType()
        })
        setConfirmation("")
    }

    const addUOMType = () => {
        const res = dispatch(postType({ value: input, type: "uom" }))
        res.then(() => {
            fetchUOMType()
        })
        setConfirmation("")
    }

    const editUOMType = () => {
        const res = dispatch(updateType({ id: deleteType[0], val: input, type: "uom" }))
        res.then(() => {
            setDelete([])
            setInput({ des: "", name: "" })
            fetchUOMType()
        })
        setConfirmation("")
    }
    return (
        <div className='min-h-screen'>
            <NavigationBar />
            <div className='px-10 pt-4'>
                <h1 className='text-[20px] roboto-bold'>UOM Type Master</h1>
                <div className='w-full  justify-between rounded-lg shadow-md shadow-[#00000055] pt-2 px-5 pb-16 bg-[#F1F3FF] h-[60vh]'>
                    <div className='bg-[#ffffff] w-full flex justify-between  shadow-md shadow-[#00000055] h-full rounded-lg '>
                        <div className='w-1/2 h-full px-5 py-2'>
                            <h2 className='text-black font-semibold'>UOM Type List</h2>
                            <div className='w-full rounded-lg h-[85%] shadow-md shadow-[#00000055]'>
                                <div className='flex justify-between px-3 py-2 items-center'>
                                    <label className='flex px-3 w-3/5 rounded-md py-1 shadow-md shadow-[#00000055] items-center gap-3' htmlFor="">
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.625 10.625L13.125 13.125M1.875 6.875C1.875 8.20108 2.40178 9.47285 3.33947 10.4105C4.27715 11.3482 5.54892 11.875 6.875 11.875C8.20108 11.875 9.47285 11.3482 10.4105 10.4105C11.3482 9.47285 11.875 8.20108 11.875 6.875C11.875 5.54892 11.3482 4.27715 10.4105 3.33947C9.47285 2.40178 8.20108 1.875 6.875 1.875C5.54892 1.875 4.27715 2.40178 3.33947 3.33947C2.40178 4.27715 1.875 5.54892 1.875 6.875Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <input type="text" placeholder='Search' onChange={(e) => {
                                            const filteredValues = values?.filter(x =>
                                                x?.value?.toLowerCase().startsWith(e.target.value.toLowerCase())
                                            );

                                            // Update the search state with the filtered values
                                            setSearch(filteredValues || []);

                                        }} className='placeholder:text-black outline-none border-none' />
                                    </label>
                                    {deleteType.length > 0 ?
                                        <svg onClick={() => setConfirmation("delete")} width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.58722 13.4234C2.19566 13.4234 1.8688 13.2923 1.60663 13.0302C1.3439 12.7674 1.21253 12.4403 1.21253 12.0487V1.50662H0.361328V0.655424H3.76613V0H8.87333V0.655424H12.2781V1.50662H11.4269V12.0487C11.4269 12.4403 11.2958 12.7671 11.0337 13.0293C10.7709 13.2921 10.4438 13.4234 10.0522 13.4234H2.58722ZM4.4539 10.8698H5.3051V3.20902H4.4539V10.8698ZM7.33436 10.8698H8.18556V3.20902H7.33436V10.8698Z" fill="#5970F5" />
                                        </svg>

                                        :
                                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.5" d="M2.22589 13.4234C1.83434 13.4234 1.50748 13.2923 1.24531 13.0302C0.982568 12.7674 0.8512 12.4403 0.8512 12.0487V1.50662H0V0.655424H3.4048V0H8.512V0.655424H11.9168V1.50662H11.0656V12.0487C11.0656 12.4403 10.9345 12.7671 10.6723 13.0293C10.4096 13.2921 10.0825 13.4234 9.69091 13.4234H2.22589ZM4.09257 10.8698H4.94377V3.20902H4.09257V10.8698ZM6.97303 10.8698H7.82423V3.20902H6.97303V10.8698Z" fill="#5970F5" />
                                        </svg>
                                    }
                                </div>
                                <div className='flex gap-5 items-center bg-[#5970F5] px-2 py-1'>
                                    {deleteType.length === values?.length && deleteType.length > 0 ? <div onClick={() => {
                                        setDelete([])
                                    }} className='h-3 w-3 border cursor-pointer border-white bg-none'> <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 5.19048L4.66667 8.85714L12 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                        : <div onClick={() => {
                                            const allValues = values?.map((x) => { return x?._id })
                                            if (allValues) {
                                                setDelete([...allValues])
                                            }
                                        }} className='h-3 cursor-pointer w-3 border border-white bg-none'></div>}
                                        <div className='grid grid-cols-2 w-1/2 items-center'>
                                    <p className='text-white '>UOM Type</p>
                                    <p className='text-white'>UOM Description</p>
                                        </div>
                                </div>
                                <div className='overflow-auto h-[70%] rounded-[0_0_10px_10px]'>

                                    {search?.map((x: any) => (

                                        <div className='flex gap-5 items-center bg-white px-2 py-1'>
                                            {deleteType.includes(x?._id) ? <div onClick={() => {
                                                const filter = [...deleteType]
                                                const index = filter.indexOf(x?._id)
                                                filter.splice(index, 1)
                                                setDelete([...filter])
                                            }} className='h-3 w-3 border cursor-pointer border-[#5970f5] bg-none'> <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 5.19048L4.66667 8.85714L12 1" stroke="#5970F5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg></div>
                                                : <div onClick={() => setDelete((prev) => [...prev, x?._id])} className='h-3 cursor-pointer w-3 border border-[#5970f5] bg-none'></div>}
                                            <div className=" grid grid-cols-2 w-1/2  items-center"><p className='text-black '>{x?.value?.name}</p><p>{x?.value?.des}</p></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='w-1/2 h-full px-5 py-2'>
                            <h2 className='text-black font-semibold'>{deleteType.length === 1 ? "Edit" : "Add"} UOM Type</h2>
                            <div className='w-full flex flex-col justify-between rounded-lg h-[85%] shadow-md shadow-[#00000055]'>
                                <div>

                                    <div className='flex gap-28 px-5 pt-5 items-center'>
                                        <label htmlFor="" className='font-semibold text-[14px]'>
                                            Type Name
                                        </label>
                                        <input type="text" onChange={(e) => setInput({ ...input, name: e.target.value })} value={input.name} className='rounded-md w-1/3 shadow-[0px_0px_4px_rgba(0,0,0,0.685)] outline-none border-none px-3 shadow-[#00000037]' />
                                    </div>
                                    <div className='flex gap-[4.9rem] px-5 pt-5 items-center'>
                                        <label htmlFor="" className='font-semibold text-[14px]'>
                                            Type Description
                                        </label>
                                        <input type="text" onChange={(e) => setInput({ ...input, des: e.target.value })} value={input.des} className='rounded-md w-1/3 shadow-[0px_0px_4px_rgba(0,0,0,0.685)] outline-none border-none px-3 shadow-[#00000037]' />
                                    </div>
                                </div>
                                <div className='flex gap-3 items-center justify-end px-3 py-5'>
                                    <button className='border border-[#5970F5] text-[#5970F5] px-4 py-2 rounded-md font-semibold' onClick={() => {
                                        setInput({ des: "", name: "" })
                                    }}>Reset</button>
                                    <button className=' bg-[#5970F5] text-white px-4 py-2 rounded-md font-semibold' onClick={() => setConfirmation(deleteType.length === 1 ? "edit" : "add")}>{deleteType.length === 1 ? "Update" : "Save"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {confirmation === "add" && <div className='fixed h-screen w-screen bg-[#00000077] z-50 top-0 left-0 flex justify-center items-center'>
                <div className='bg-white relative w-[400px] h-[200px] rounded-[20px_0_0_0] flex flex-col justify-center items-center gap-10'>
                    <button onClick={() => setConfirmation("")} className='text-[#5970F5] font-semibold right-3 top-3 absolute'><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6678 0.343621C14.5625 0.238148 14.4375 0.15447 14.2998 0.0973768C14.1622 0.0402834 14.0147 0.0108954 13.8657 0.0108954C13.7166 0.0108954 13.5691 0.0402834 13.4315 0.0973768C13.2938 0.15447 13.1688 0.238148 13.0635 0.343621L7.5 5.89579L1.93646 0.332243C1.83112 0.226909 1.70607 0.143353 1.56845 0.0863469C1.43082 0.0293405 1.28331 1.10987e-09 1.13435 0C0.985385 -1.10988e-09 0.837878 0.0293405 0.700252 0.0863469C0.562627 0.143353 0.437577 0.226909 0.332243 0.332243C0.226909 0.437577 0.143353 0.562627 0.0863469 0.700252C0.0293405 0.837878 -1.10987e-09 0.985385 0 1.13435C1.10988e-09 1.28331 0.0293405 1.43082 0.0863469 1.56845C0.143353 1.70607 0.226909 1.83112 0.332243 1.93646L5.89579 7.5L0.332243 13.0635C0.226909 13.1689 0.143353 13.2939 0.0863469 13.4316C0.0293405 13.5692 0 13.7167 0 13.8657C0 14.0146 0.0293405 14.1621 0.0863469 14.2997C0.143353 14.4374 0.226909 14.5624 0.332243 14.6678C0.437577 14.7731 0.562627 14.8566 0.700252 14.9137C0.837878 14.9707 0.985385 15 1.13435 15C1.28331 15 1.43082 14.9707 1.56845 14.9137C1.70607 14.8566 1.83112 14.7731 1.93646 14.6678L7.5 9.10421L13.0635 14.6678C13.1689 14.7731 13.2939 14.8566 13.4316 14.9137C13.5692 14.9707 13.7167 15 13.8657 15C14.0146 15 14.1621 14.9707 14.2997 14.9137C14.4374 14.8566 14.5624 14.7731 14.6678 14.6678C14.7731 14.5624 14.8566 14.4374 14.9137 14.2997C14.9707 14.1621 15 14.0146 15 13.8657C15 13.7167 14.9707 13.5692 14.9137 13.4316C14.8566 13.2939 14.7731 13.1689 14.6678 13.0635L9.10421 7.5L14.6678 1.93646C15.1001 1.50411 15.1001 0.775962 14.6678 0.343621Z" fill="#5970F5" />
                    </svg>
                    </button>
                    <p className='font-semibold text-lg'>Are You sure Want to Save?</p>
                    <div className="flex gap-8">
                        <button className='border border-[#5970F5]  text-[#5970F5] px-5 py-1 rounded-md font-semibold' onClick={() => setConfirmation("")}>Cancel</button>
                        <button className=' bg-[#5970F5]  text-white px-5 py-1 rounded-md font-semibold ' onClick={addUOMType}>Save</button>
                    </div>
                </div>
            </div>}

            {confirmation === "edit" && <div className='fixed h-screen w-screen bg-[#00000077] z-50 top-0 left-0 flex justify-center items-center'>
                <div className='bg-white relative w-[400px] h-[200px] rounded-[20px_0_0_0] flex flex-col justify-center items-center gap-10'>
                    <button onClick={() => setConfirmation("")} className='text-[#5970F5] font-semibold right-3 top-3 absolute'><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6678 0.343621C14.5625 0.238148 14.4375 0.15447 14.2998 0.0973768C14.1622 0.0402834 14.0147 0.0108954 13.8657 0.0108954C13.7166 0.0108954 13.5691 0.0402834 13.4315 0.0973768C13.2938 0.15447 13.1688 0.238148 13.0635 0.343621L7.5 5.89579L1.93646 0.332243C1.83112 0.226909 1.70607 0.143353 1.56845 0.0863469C1.43082 0.0293405 1.28331 1.10987e-09 1.13435 0C0.985385 -1.10988e-09 0.837878 0.0293405 0.700252 0.0863469C0.562627 0.143353 0.437577 0.226909 0.332243 0.332243C0.226909 0.437577 0.143353 0.562627 0.0863469 0.700252C0.0293405 0.837878 -1.10987e-09 0.985385 0 1.13435C1.10988e-09 1.28331 0.0293405 1.43082 0.0863469 1.56845C0.143353 1.70607 0.226909 1.83112 0.332243 1.93646L5.89579 7.5L0.332243 13.0635C0.226909 13.1689 0.143353 13.2939 0.0863469 13.4316C0.0293405 13.5692 0 13.7167 0 13.8657C0 14.0146 0.0293405 14.1621 0.0863469 14.2997C0.143353 14.4374 0.226909 14.5624 0.332243 14.6678C0.437577 14.7731 0.562627 14.8566 0.700252 14.9137C0.837878 14.9707 0.985385 15 1.13435 15C1.28331 15 1.43082 14.9707 1.56845 14.9137C1.70607 14.8566 1.83112 14.7731 1.93646 14.6678L7.5 9.10421L13.0635 14.6678C13.1689 14.7731 13.2939 14.8566 13.4316 14.9137C13.5692 14.9707 13.7167 15 13.8657 15C14.0146 15 14.1621 14.9707 14.2997 14.9137C14.4374 14.8566 14.5624 14.7731 14.6678 14.6678C14.7731 14.5624 14.8566 14.4374 14.9137 14.2997C14.9707 14.1621 15 14.0146 15 13.8657C15 13.7167 14.9707 13.5692 14.9137 13.4316C14.8566 13.2939 14.7731 13.1689 14.6678 13.0635L9.10421 7.5L14.6678 1.93646C15.1001 1.50411 15.1001 0.775962 14.6678 0.343621Z" fill="#5970F5" />
                    </svg>
                    </button>
                    <p className='font-semibold text-lg'>Are You sure Want to Change?</p>
                    <div className="flex gap-8">
                        <button className='border border-[#5970F5]  text-[#5970F5] px-5 py-1 rounded-md font-semibold' onClick={() => setConfirmation("")}>No</button>
                        <button className=' bg-[#5970F5]  text-white px-5 py-1 rounded-md font-semibold ' onClick={editUOMType}>Yes</button>
                    </div>
                </div>
            </div>}

            {confirmation === "delete" && <div className='fixed h-screen w-screen bg-[#00000077] z-50 top-0 left-0 flex justify-center items-center'>
                <div className='bg-white relative w-[400px] h-[200px] rounded-[20px_0_0_0] flex flex-col justify-center items-center gap-10'>
                    <button onClick={() => setConfirmation("")} className='text-[#5970F5] font-semibold right-3 top-3 absolute'><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6678 0.343621C14.5625 0.238148 14.4375 0.15447 14.2998 0.0973768C14.1622 0.0402834 14.0147 0.0108954 13.8657 0.0108954C13.7166 0.0108954 13.5691 0.0402834 13.4315 0.0973768C13.2938 0.15447 13.1688 0.238148 13.0635 0.343621L7.5 5.89579L1.93646 0.332243C1.83112 0.226909 1.70607 0.143353 1.56845 0.0863469C1.43082 0.0293405 1.28331 1.10987e-09 1.13435 0C0.985385 -1.10988e-09 0.837878 0.0293405 0.700252 0.0863469C0.562627 0.143353 0.437577 0.226909 0.332243 0.332243C0.226909 0.437577 0.143353 0.562627 0.0863469 0.700252C0.0293405 0.837878 -1.10987e-09 0.985385 0 1.13435C1.10988e-09 1.28331 0.0293405 1.43082 0.0863469 1.56845C0.143353 1.70607 0.226909 1.83112 0.332243 1.93646L5.89579 7.5L0.332243 13.0635C0.226909 13.1689 0.143353 13.2939 0.0863469 13.4316C0.0293405 13.5692 0 13.7167 0 13.8657C0 14.0146 0.0293405 14.1621 0.0863469 14.2997C0.143353 14.4374 0.226909 14.5624 0.332243 14.6678C0.437577 14.7731 0.562627 14.8566 0.700252 14.9137C0.837878 14.9707 0.985385 15 1.13435 15C1.28331 15 1.43082 14.9707 1.56845 14.9137C1.70607 14.8566 1.83112 14.7731 1.93646 14.6678L7.5 9.10421L13.0635 14.6678C13.1689 14.7731 13.2939 14.8566 13.4316 14.9137C13.5692 14.9707 13.7167 15 13.8657 15C14.0146 15 14.1621 14.9707 14.2997 14.9137C14.4374 14.8566 14.5624 14.7731 14.6678 14.6678C14.7731 14.5624 14.8566 14.4374 14.9137 14.2997C14.9707 14.1621 15 14.0146 15 13.8657C15 13.7167 14.9707 13.5692 14.9137 13.4316C14.8566 13.2939 14.7731 13.1689 14.6678 13.0635L9.10421 7.5L14.6678 1.93646C15.1001 1.50411 15.1001 0.775962 14.6678 0.343621Z" fill="#5970F5" />
                    </svg>
                    </button>
                    <p className='font-semibold text-lg'>Are You sure Want to delete?</p>
                    <div className="flex gap-8">
                        <button className='border border-[#5970F5]  text-[#5970F5] px-5 py-1 rounded-md font-semibold' onClick={() => setConfirmation("")}>Cancel</button>
                        <button className=' bg-[#FF0000]  text-white px-5 py-1 rounded-md font-semibold ' onClick={removeUOMType}>Delete</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default UOMType