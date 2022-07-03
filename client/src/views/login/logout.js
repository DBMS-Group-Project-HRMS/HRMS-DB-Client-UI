import { logout } from "./loginUtils";
import { useNavigate } from "react-router-dom";

export function Logout() {
    const navigate = useNavigate();
    logout();
    navigate("/login");
};