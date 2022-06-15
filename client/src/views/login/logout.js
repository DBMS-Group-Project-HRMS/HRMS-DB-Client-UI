import { logout } from "./loginUtils";
import { useNavigate } from "react-router-dom";

export function Logout() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        logout();
        navigate("/login");
    };

    return(
        
        <form onSubmit={handleSubmit}>
            <input type="submit"  value="Logout"  className="btn btn-primary" name="logout"/>
        </form>
    )
}