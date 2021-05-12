import React, { Fragment } from 'react';

import Header from '../../components/Header/Header';

const Layout = (props) => (
    <Fragment>
        <Header />
        <main className={'p-6'}>
            {props.children}
        </main>
    </Fragment>
);

export default Layout;