import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");

    // A more robust check could verify token expiration or fetch /api/auth/me
    // For now, presence of token is the basic check. axios interceptor handles 401.

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
