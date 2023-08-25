import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoutes = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("sessions")))

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem("sessions")))
    }, [user])

    if (user?.role !== "admin") {
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoutes;