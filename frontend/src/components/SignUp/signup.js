import { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import axios from "axios";
import api from "../webApi/api";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            setError("All fields are required");
            return;
        }
        setError("");
        try {
            let payload = {
                userName: username,
                email: email,
                password: password
            }
            const response = await axios.post(api.SIGNUP, payload);
            if (response.data.status) {
                setMessage("Signup successful! Please log in.");
            } else {
                setMessage(response.data.message || "Signup failed! Please try again.");
            }
        } catch (err) {
            setMessage("Error connecting to the server.");
        }
    };

    return (
        <>
            <div className="conter">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="txt_field">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <span />
                        <label>UserName</label>
                    </div>
                    <div className="txt_field">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <span />
                        <label>Email</label>
                    </div>
                    <div className="txt_field">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span />
                        <label>Password</label>
                    </div>
                    {error && <div className="error">{error}</div>}
                    {message && <div className="message">{message}</div>}
                    <input type="submit" value="Sign Up" />
                    <div className="signup_link">
                        Already a member? <Link to="/">Login</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signup;
