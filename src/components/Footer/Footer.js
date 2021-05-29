import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <footer className={'flex space-x-4 bg-gray-700 text-white p-2'}>
            <Link className={'bg-gray-500 text-white rounded p-1 px-2 hover:bg-gray-600'} to="/locations">
                Locations
            </Link>
            <Link className={'bg-gray-500 text-white rounded p-1 px-2 hover:bg-gray-600'} to="/categories">
                Categories
            </Link>
        </footer>
    )
}

export default Footer;