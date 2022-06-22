import { Fragment, Navigate, useEffect } from "react";
import {getUserLevel} from "./getUserLevel";
import { useNavigate } from "react-router-dom";

export function LevelAuthRoute({ children, levels}) {
    const navigate = useNavigate();
    const userLevel = getUserLevel();
    const canAccess = levels.includes(userLevel);

    useEffect(() => {
        if (!canAccess){
            navigate('/login');
        } else {
            
        }
    }, [canAccess]);

    if (canAccess){
        return (
            <Fragment>
                {children}
            </Fragment>
        );
    }
}