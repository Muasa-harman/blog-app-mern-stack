import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from "@src/components/DashSidebar";
import DashProfile from "@src/components/DashProfile";
import {DashPosts} from "@src/components/DashPosts";
import {DashUsers} from "@src/components/DashUsers";
import DashComments from "@src/components/DashComments";
import DashbordCpm from "@src/components/DashbordCpm";

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

     {tab === 'dash' && <DashbordCpm props={null}/>}
    </div>
  )
}
