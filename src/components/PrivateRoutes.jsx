import React from "react";
import { useAuth } from "../utils/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
const PrivateRoutes = () => {
    const { user } = useAuth()
    return (
        <div>
            {user ? <Outlet /> : <Navigate to='/login' />}
        </div>
    )
}

export default PrivateRoutes
