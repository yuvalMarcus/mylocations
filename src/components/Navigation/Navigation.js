import React from 'react';
import {Link} from "react-router-dom";

const Navigation = () => {

    return (
        <nav className={'text-left space-x-4'}>
            <Link className={'bg-gray-500 text-white rounded p-1 px-2 hover:bg-gray-600'} to="/categories">
                Categories
            </Link>
            <Link className={'bg-gray-500 text-white rounded p-1 px-2 hover:bg-gray-600'} to="/locations">
                Locations
            </Link>
        </nav>
    )
};

export default Navigation;