import React from 'react';
import './header.css';

import Navigation from '../Navigation/Navigation';

const Header = props => {

    return (
        <header className={'global'}>
            <div className={'Logo'}>
                <a href="/">
                    <i className="fa fa-list-ol" aria-hidden="true"></i>&nbsp;&nbsp;Todo List
                </a>
            </div>
            <Navigation />
        </header>
    )
};

export default Header;