import React from "react";
import { Link, useLocation } from "react-router-dom";

const HomeButton = () => {
    const location = useLocation();

    console.log("Path : ", location.pathname);

    return location.pathname === "/" ? null : (
        <Link to={"/"}>
            <button>Home</button>
        </Link>
    );
};

export default HomeButton;
