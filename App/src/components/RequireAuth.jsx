import { Navigate,Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const RequireAuth = ({ allowedRoles }) =>{
    const {auth} = useAuth()
    const location = useLocation()
    return (
        allowedRoles?.includes(auth?.roleId) ?
        <Outlet /> 
        : auth?.email ? 
        <Navigate to="/unauthorized" state={{ from: location }} replace />
        :<Navigate to="/login" state={{ from: location }} replace />
    )
}