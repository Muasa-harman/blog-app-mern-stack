import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import ScrollToTop from "@src/components/ScrollToTop";
import {Header} from "@src/components/Header";
import {Home} from "@src/pages/Home";
import {About} from "@src/pages/About";
import {SignIn} from "@src/pages/SignIn";
import {SignUp} from "@src/pages/SignUp";
import Search from "@src/pages/Search";
import PrivateRoute from "@src/components/PrivateRoute";
import {Dashboard} from "@src/pages/Dashboard";
import OnlyAdminPrivateRoute from "@src/components/OnlyAdminPrivateRoute";
import CreatePost from "@src/pages/CreatePost";
import UpdatePost from "@src/pages/UpdatePost";
import {Projects} from "@src/pages/Projects";
import ProjectsPage from "@src/pages/ProjectsPage";
import PostPage from "@src/pages/PostPage";
import Footer from "@src/components/Footer";

function App() {

    return (
        <Router>
            <ScrollToTop/>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/sign-in" element={<SignIn/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Route>
                <Route element={<OnlyAdminPrivateRoute/>}>
                    <Route path="/dashboard/create-post" element={<CreatePost/>}/>
                    <Route path="/update-post/:postId" element={<UpdatePost/>}/>
                </Route>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/myprojects" element={<ProjectsPage/>}/>
                <Route path="/post/:postSlug" element={<PostPage/>}/>
            </Routes>
            <Footer/>
        </Router>
    )
}

export default App
