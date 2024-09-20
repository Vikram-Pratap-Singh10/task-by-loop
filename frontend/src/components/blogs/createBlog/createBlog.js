import { useState, useEffect } from "react";
import "./createBlog.css";
import axios from "axios";
import api from "../../webApi/api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigation('/')
        }
    }, [])
    useEffect(() => {
        if (user && user._id) {
            setAuthor(user._id);
        }
    }, [user]);
    useEffect(() => {
        axios.interceptors.request.use(
            (config) => {
                const token = user.token;
                if (token) {
                    config.headers.authorization = `Bearar ${token}`;
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );
    }, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content || !file) {
            setError("All fields are required!");
            return;
        }
        setError("");
        setMessage("");
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("content", content);
        formData.append("file", file);
        try {
            const response = await axios.post(api.CREATE_BLOG, formData);
            console.log(response.data)
            if (response.data.status) {
                setMessage("Blog post created successfully!");
                setTitle("");
                setContent("");
                setFile(null);
                navigation("/home")
            } else {
                setError(response.data.message || "Failed to create blog post.");
            }
        } catch (err) {
            setError("Error connecting to the server.");
        }
    };

    return (
        <div className="content">
            <h1>Create Blog</h1>
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
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                {message && <div className="message">{message}</div>}
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default CreatePost;
