import { useSelector } from "react-redux";
import { Outlet, Navigate }from "react-router-dom";

type RootState = {
    auth: {
        token: string;
    }
}
const Unauthorized = () => {
    const { token } = useSelector<RootState, { token: string }>((state) => state.auth);
    return token ?  <Outlet /> : <Navigate to="/login" />;
    
}

export default Unauthorized;