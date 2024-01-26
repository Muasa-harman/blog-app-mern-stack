import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'

export const Dashboard = () => {
  const Location = useLocation()
  const [tab,setTab] = useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
    <div className='bg-gray-300 md:w-56'>
      {/* sidebar */}
      <DashSidebar/>
    </div>
      {/* profile */}
     {tab === 'profile' && <DashProfile/>}
    </div>
  )
}
