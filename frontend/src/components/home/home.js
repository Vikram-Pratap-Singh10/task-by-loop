import { useNavigate } from "react-router-dom";
import BlogList from "../blogs/bloglist/blogList";
import { useEffect } from "react";

const Home = () => {
    const navigation = useNavigate()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigation('/')
        }
    }, [])
    return <>
        <div>
            <h1>Welcome to our blog!</h1>
            <BlogList />
        </div>
    </>
}

export default Home;