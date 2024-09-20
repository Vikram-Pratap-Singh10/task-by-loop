import "./bloglist.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from "../../webApi/api";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [expanded, setExpanded] = useState({});
    const navigation = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        axios.interceptors.request.use(
            (config) => {
                const token = !!user?.token;
                if (token) {
                    config.headers.authorization = `Bearer ${user?.token}`;
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );
    }, [user]);
    const fetchBlog = async () => {
        try {
            const response = await axios.get(api.VIEW_BLOG);
            if (response.data.status) {
                const blogsWithTime = response.data.Blog.map((item) => {
                    const utcDate = new Date(item.createdAt);
                    const options = { timeZone: "Asia/Kolkata", timeZoneName: "short" };
                    const istDate = utcDate.toLocaleString("en-US", options);
                    const now = new Date();
                    const diffInMs = now - utcDate;

                    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
                    const diffInDays = Math.floor(diffInHours / 24);
                    const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
                    let timeMessage;
                    if (diffInDays > 0) {
                        timeMessage = `${diffInDays}day${diffInDays > 1 ? 's' : ''}ago`;
                    } else if (diffInHours > 0) {
                        timeMessage = `${diffInHours} h${diffInHours > 1 ? 's' : ''} ago`;
                    } else {
                        timeMessage = `${diffInMinutes}m ${diffInMinutes > 1 ? 's' : ''} ago`;
                    }

                    return {
                        ...item,
                        timeMessage,
                        istDate,
                    };
                });

                setBlogs(blogsWithTime);
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchBlog();
    }, []);
    const toggleExpand = (index) => {
        setExpanded((prev) => ({
            ...prev,
            [index]: !prev[index] // toggle between true and false
        }));
    };
    const editBlog = (index) => {
        navigation(`/update-blog/${index}`)
    };
    const deleteBlog = async (id) => {
        const status = await window.confirm("are you sure")
        if (status) {
            const response = await axios.delete(api.DELETE_BLOG + `${id}`)
            if (response.data.status) {
                fetchBlog()
            }
        }
    };
    const previewContent = (content) => {
        return content.length > 100 ? content.substring(0, 100) + '...' : content;
    };
    return (
        <div className="container">
            {blogs.map((item, index) => (
                <div className="card" key={index}>
                    <div className="card__header">
                        <img
                            src={item.image}
                            alt="card__image"
                            className="card__image"
                            width={600}
                        />
                    </div>
                    <div className="card__body">
                        <span className="tag tag-blue">Blog</span>
                        <h4>Title: {item.title}</h4>
                        <p>
                            {expanded[index] ? item.content : previewContent(item.content)}
                        </p>
                        <div className="button-group">
                            <button className="tag tag-blue" id="button" onClick={() => toggleExpand(index)}>
                                {expanded[index] ? 'Hide' : 'View'}
                            </button>
                            <button className="tag tag-blue" id="button" onClick={() => editBlog(item._id)}>
                                Edit
                            </button>
                            <button className="tag tag-blue" id="button" onClick={() => deleteBlog(item._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className="card__footer">
                        <div className="user">
                            <h4 className="user__image">Author:</h4>
                            <div className="user__info">
                                <h5>{item.author.userName}</h5>
                                <small>{item.timeMessage}</small>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
