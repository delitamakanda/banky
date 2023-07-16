import { useSelector } from "react-redux";
import { Outlet, Navigate }from "react-router-dom";


const Unauthorized = () => {
    const { token } = useSelector((state) => state.auth);
    return token ?  <Outlet /> : <Navigate to="/login" />;
    
}

export default Unauthorized;