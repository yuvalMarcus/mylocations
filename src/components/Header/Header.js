import React from 'react';

import Navigation from '../Navigation/Navigation';

const Header = props => {

    return (
        <header className={'flex bg-white border-gray-300 border-b-2 shadow'}>
            <div className={''}>
                <a href="/">
                    <i className="fa fa-list-ol" aria-hidden="true"></i>&nbsp;&nbsp;MyL
                </a>
            </div>
            <Navigation />
        </header>
    )
};

export default Header;