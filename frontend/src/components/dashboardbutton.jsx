import React from "react";
import { Link, useLocation } from "react-router-dom";

const ButtonDashboard = () => {
    const location = useLocation();

    console.log("Path : ", location.pathname);

    return location.pathname === "/admin" ? null : (
        <Link to={"/admin"}>
            <button>dashboard</button>
        </Link>
    );
};

export default ButtonDashboard;
