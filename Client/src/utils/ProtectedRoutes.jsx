import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoutes = ({ children }) => {

    const user = JSON.parse(localStorage.getItem("sessions"));

    if (user?.role !== "admin") {
        return <Navigate to="/" />
    }


    return children
}

export default ProtectedRoutes;