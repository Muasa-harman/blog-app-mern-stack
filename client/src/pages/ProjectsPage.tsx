import React from 'react'
import {Hotel} from "@mui/icons-material";
import ProjectCard from "@src/components/ProjectCard";
 
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
            </div>
            {/* <Link to={'/search'} className="text-lg text-teal-500 hover:underline text-center">View all posts</Link> */}
            </div>
      </div>
    </div>
  )
}

export default ProjectsPage