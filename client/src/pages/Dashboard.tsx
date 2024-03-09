import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar.js'
import DashProfile from '../components/DashProfile.js'
import { DashPosts } from '../components/DashPosts.js'
import { DashUsers } from '../components/DashUsers.js'
import DashComments from '../components/DashComments.js'
import DashbordCpm from '../components/DashbordCpm.js'

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

     {/* posts */}
     {tab === 'posts' && <DashPosts/>}

     {/* users */}
     {tab === 'users' && <DashUsers/>}

     {/* comments */}
     {tab === 'comments' && <DashComments/>}

     {/* dashoard comp */}

     {tab === 'dash' && <DashbordCpm/>}
    </div>
  )
}
