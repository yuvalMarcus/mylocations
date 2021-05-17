import React from 'react';
import {Link} from "react-router-dom";
import Navigation from '../Navigation/Navigation';
import { ReactComponent as HomeIcon } from '../../asset/img/home.svg';

const Header = () => {

    return (
        <header className={'flex space-x-4 bg-gray-700 text-white border-gray-300 border-b-2 shadow p-2'}>
            <Link className={'flex font-bold'} to="/">
                <HomeIcon />
                &nbsp;&nbsp;myLocations
            </Link>
            <Navigation />
        </header>
    )
};

export default Header;