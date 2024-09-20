import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const Signout = async () => {
        await localStorage.removeItem("user");
        await navigate("/");
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src="" alt="Brand Logo" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                {!storedUser ? (
                                    <Link className="nav-link" to="/">Login</Link>
                                ) : (
                                    <Link className="nav-link" onClick={Signout}>Sign Out</Link>
                                )}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/createblog">Create Post</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Nav;
