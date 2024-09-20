import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;

    if (!user) return <Navigate to="/" replace />
    return children;
}
export default ProtectedRoute;