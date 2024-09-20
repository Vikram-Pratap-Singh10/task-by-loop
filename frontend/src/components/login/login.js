import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import api from "../webApi/api";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("All fields are required");
            return;
        }
        setError("");
        try {
            let payload = {
                email: email,
                password: password
            }
            const response = await axios.post(api.LOGIN, payload)
            if (response?.data?.status) {
                localStorage.setItem("user", JSON.stringify(response?.data?.user));
                navigation("/home")
            } else {
                setMessage(response.data.message || "Login failed! Please try again.");
            }
        } catch (err) {
            setMessage("Error connecting to the server.");
        }
    };
    return <>
        <div className="conter">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="txt_field">
                    <input type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    <span />
                    <label>Email or UserName</label>
                </div>
                <div className="txt_field">
                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <span />
                    <label>Password</label>
                </div>
                {error && <div className="error">{error}</div>}
                {message && <div className="message">{message}</div>}
                <input type="submit" defaultValue="Login" />
                <div className="signup_link">
                    No a member?
                    <Link to="/signup">signup</Link>
                </div>
            </form>
        </div>
    </>
}

export default Login