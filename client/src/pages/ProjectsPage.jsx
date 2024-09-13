import React from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import Hotel from "../assets/kigali.jpg"
import Finance from "../assets/dashboard.jpg"
import Property from "../assets/Listing.jpg"
import Delivery from "../assets/landing.png"
import Ecommerce from "../assets/Ecommerce.png"
import Dashboard from "../assets/Dashboard.png"
import POS from "../assets/POS.png"
import Harman from "../assets/harman.png"
 
const ProjectsPage = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Projects</h2>
            <div className="flex flex-wrap gap-4 justify-center">
                <ProjectCard title={"ECommerce"}  image={Harman} link={"https://online-shopping-app-v46x.vercel.app/"}/>
                <ProjectCard title={"Data Dashboard"}  image={Dashboard} link={"https://savanna-test-beta.vercel.app/"}/>
                <ProjectCard title={"Financial Graphs Dashboard"} image={Finance} link={"https://yala-finance-dashboard-demo.vercel.app/"}/>
                <ProjectCard title={"E-commerce shop application"}  image={Ecommerce} link={'https://next-js-ecommerce-bspt103t6-yala-finance-dashboards-projects.vercel.app/'}/>
                <ProjectCard title={"Hotel Reservation System"}  image={Hotel} link={"https://hotel-reservation-app-uesu.onrender.com/"}/>
                <ProjectCard title={"Property management System"}  image={Property} link={"https://property-management-rh6h.onrender.com/"}/>
                <ProjectCard title={"Food Delivery Application"}  image={Delivery} link={"https://donfiles-online-food-delivery-app.onrender.com"}/>
                <ProjectCard title={"Work in Progress"}  image={Property}/>
                <ProjectCard title={"POS System"}  image={POS} link={"https://pointofsalesystem-pos.onrender.com/"}/>
            </div>
            {/* <Link to={'/search'} className="text-lg text-teal-500 hover:underline text-center">View all posts</Link> */}
            </div>
      </div>
    </div>
  )
}

export default ProjectsPage