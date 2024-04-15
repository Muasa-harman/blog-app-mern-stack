import React from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import Hotel from "../assets/kigali.jpg"
import Finance from "../assets/dashboard.jpg"
import Property from "../assets/Listing.jpg"
import Delivery from "../assets/landing.png"
import Waste from "../assets/waste.jpg"
import Dashboard from "../assets/Dashboard.png"
import POS from "../assets/POS.png"
 
const ProjectsPage = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Projects</h2>
            <div className="flex flex-wrap gap-4 justify-center">
                <ProjectCard title={"Hotel Reservation System"}  image={Hotel} link={"https://hotel-reservation-app-uesu.onrender.com/"}/>
                <ProjectCard title={"Financial Graphs Dashboard"} image={Finance} link={"https://yala-finance-dashboard-demo.vercel.app/"}/>
                <ProjectCard title={"Property management System"}  image={Property} link={"https://property-management-rh6h.onrender.com/"}/>
                <ProjectCard title={"Food Delivery Application"}  image={Delivery} link={"https://donfiles-online-food-delivery-app.onrender.com"}/>
                <ProjectCard title={"Waste Management System comming soon!!"}  image={Waste}/>
                <ProjectCard title={"Work in Progress"}  image={Property}/>
                <ProjectCard title={"Data Dashboard"}  image={Dashboard} link={"https://savanna-test-beta.vercel.app/"}/>
                <ProjectCard title={"POS System"}  image={POS} link={"https://pointofsalesystem-pos.onrender.com/"}/>
            </div>
            {/* <Link to={'/search'} className="text-lg text-teal-500 hover:underline text-center">View all posts</Link> */}
            </div>
      </div>
    </div>
  )
}

export default ProjectsPage