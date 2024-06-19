/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from 'react'
import cookie from "js-cookie"
import instance from '../../utils/axios/instance'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Login() {
    const [data,setData] = useState({username:"",password:""})
    const navigate = useNavigate()
    const pathToGo = useSelector((state:any)=>state.data.pathToGo)
    return (
        <div className='w-screen'>
            {/* <a href="https://accounts.zoho.com/oauth/v2/auth?scope=ZohoBooks.fullaccess.all&client_id=1000.D453MLS1XLTLAN66HUDCNLJNEV0MAR&state=testing&response_type=code&redirect_uri=http://localhost:5173">login</a> */}
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                 
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Log up to your account
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={(e)=>{
                                e.preventDefault()
                                instance.post('/login',data)
                               .then((res)=>{
                                cookie.set("token",res.data)
                                navigate(pathToGo || "/dashboard",{replace:true})
                               })
                            }}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="text" onChange={(e)=>setData({...data,username:e.target.value})} value={data.username} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" onChange={(e)=>setData({...data,password:e.target.value})} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                        </div>
                                       
                                    </div>
                                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
                                </div>
                                <button type="submit" className="w-full  bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Login