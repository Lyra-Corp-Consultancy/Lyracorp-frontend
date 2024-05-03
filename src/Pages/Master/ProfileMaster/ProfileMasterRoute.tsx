import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NavigationBar from '../../../components/NavigationBar'
import ProfileMaster from './ProfileMaster'
import AddProfile from './AddProfile/AddProfile'
import ViewProfile from './ViewProfile/ViewProfile'
import EditProfile from './EditProfile/EditProfile'

function ProfileMasterRoute() {
  return (
    <div className='overflow-x-hidden'>
    <NavigationBar/>
    <Routes>
        <Route path='/' element={<ProfileMaster/>} />
        <Route path='/add-profile' element={<AddProfile/>} />
        <Route path='/view-profile/:id' element={<ViewProfile/>} />
        <Route path='/edit-profile/:id' element={<EditProfile/>} />
    </Routes>
    </div>
  )
}

export default ProfileMasterRoute