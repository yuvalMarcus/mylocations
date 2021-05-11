import React, { Fragment } from 'react';
import './Layout.css';

import Header from '../../components/Header/Header';

const Layout = (props) => (
    <Fragment>
        <div className={'BackgroundPurple'}>
        </div>
        <Header />
        <main className={'Main'}>
            {props.children}
        </main>
    </Fragment>
);

export default Layout;