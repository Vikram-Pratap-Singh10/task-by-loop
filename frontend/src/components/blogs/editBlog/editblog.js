import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./editBlog.css";
import axios from "axios";
import api from "../../webApi/api";

const EditPost = () => {
    const { blogId } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));
    const navigation = useNavigate()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigation('/')
        }
    }, [])
    useEffect(() => {
        axios.interceptors.request.use(
            (config) => {
                const token = user.token;
                if (token) {
                    config.headers.authorization = `Bearer ${token}`;
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );
    }, [user]);
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(api.VIEW_BLOG_BY_ID + `${blogId}`);
                if (response.data.status) {
                    console.log(response.data.Blog)
                    setTitle(response.data.Blog.title);
                    setContent(response.data.Blog.content);
                } else {
                    setError("failed get blod");
                }
            } catch (err) {
                setError("Error fetching blog data");
            }
        };
        fetchPostData();
    }, [blogId]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            setError("all fields are required");
            return;
        }
        setError("");
        setMessage("");
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (file) formData.append("file", file);
        try {
            const response = await axios.put(api.UPDATED_BLOG + `${blogId}`, formData);
            console.log(response.data)
            if (response.data.status) {
                navigation("/home")
                setMessage("Blog post updated successfully!");
            } else {
                setError(response.data.message || "Failed to update blog post.");
            }
        } catch (err) {
            setError("Internal Server Error.");
        }
    };

    return (
        <div className="content">
            <h1>Edit Blog</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="input-group">
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <label htmlFor="title">Title</label>
                </div>
                <div className="input-group">
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                    <label htmlFor="content">Content</label>
                </div>
                <div className="input-group">
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>
                {error && <div className="error">{error}</div>}
                {message && <div className="message">{message}</div>}
                <input type="submit" value="Update" />
            </form>
        </div>
    );
}

export default EditPost;
