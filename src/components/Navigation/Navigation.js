import React from 'react';
import './Navigation.css';

const Navigation = props => {

    return (
        <nav className={'text-left'}>
            <a href="/add-todo">
                categories
            </a>
            <a href="/add-todo">
                location
            </a>
        </nav>
    )
};

export default Navigation;