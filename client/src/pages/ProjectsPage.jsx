import React from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import Hotel from "../assets/kigali.jpg"
import Finance from "../assets/dashboard.jpg"
import Property from "../assets/Listing.jpg"
import Delivery from "../assets/landing.png"

const ProjectsPage = ({image,title,category}) => {
  return (
    <div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Projects</h2>
            <div className="flex flex-wrap gap-4 justify-center">
                <ProjectCard title={"Hotel Reservation System"} category={"Full-Stack application"} image={Hotel} link={"https://hotel-reservation-app-uesu.onrender.com/"}/>
                <ProjectCard title={"Financial Graphs Dashboard"} category={"React and Django"} image={Finance} link={"https://yala-finance-dashboard-demo.vercel.app/"}/>
                <ProjectCard title={"Property management System"} category={"Full-Stack application"} image={Property} link={"https://property-management-rh6h.onrender.com/"}/>
                <ProjectCard title={"Food Delivery Application"} category={"Full-Stack application"} image={Delivery} link={"https://donfiles-online-food-delivery-app.onrender.com"}/>
                <ProjectCard title={"Data visualisation Saas Application"} category={"Full-Stack application"} image={Delivery}/>
                <ProjectCard title={"Work in Progress"} category={"Django"} image={Property}/>
            </div>
            {/* <Link to={'/search'} className="text-lg text-teal-500 hover:underline text-center">View all posts</Link> */}
            </div>
      </div>
    </div>
  )
}

export default ProjectsPage