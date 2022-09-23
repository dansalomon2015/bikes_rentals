import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks/";
import { ROLE } from "utils/";

export const RequireAuth: React.FC<{ allowedRoles: ROLE[] }> = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.roles?.find((role: ROLE) => allowedRoles?.includes(role)) ? (
        <Outlet />
    ) : auth?.user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};
