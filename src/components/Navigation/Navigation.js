import React from 'react';
import {Link} from "react-router-dom";

const Navigation = props => {

    return (
        <nav className={'text-left space-x-4'}>
            <Link to="/categories">
                Categories
            </Link>
        </nav>
    )
};

export default Navigation;