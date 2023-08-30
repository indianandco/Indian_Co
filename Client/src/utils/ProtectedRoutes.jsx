import { useContext } from "react";
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../services/AuthContext";

// eslint-disable-next-line react/prop-types
const ProtectedRoutes = ({ children }) => {

    const { user } = useContext(AuthContext);

    if (user?.role !== "admin") {
        return <Navigate to="/" />
    }


    return children
}

export default ProtectedRoutes;