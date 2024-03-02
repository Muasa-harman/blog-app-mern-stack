import React from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'

const ProjectsPage = ({image,title,category}) => {
  return (
    <div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Projects</h2>
            <div className="flex flex-wrap gap-4 justify-center">
                <ProjectCard title={"Hotel Reservation System"} category={"Full-Stack application"}/>
                <ProjectCard title={"Financial Graphs Dashboard"} category={"React and Django"}/>
                <ProjectCard title={"Property management System"} category={"Full-Stack application"}/>
                <ProjectCard title={"Food Delivery Application"} category={"Full-Stack application"}/>
                <ProjectCard title={"Data visualisation Saas Application"} category={"Full-Stack application"}/>
                <ProjectCard title={"Work in Progress"} category={"Django"}/>
            </div>
            {/* <Link to={'/search'} className="text-lg text-teal-500 hover:underline text-center">View all posts</Link> */}
            </div>
      </div>
    </div>
  )
}

export default ProjectsPage