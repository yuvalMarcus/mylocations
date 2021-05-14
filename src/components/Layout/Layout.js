import React from 'react';

import Header from '../../components/Header/Header';

const Layout = (props) => (
    <>
        <Header />
        <main className={'p-6'}>
            {props.children}
        </main>
    </>
);

export default Layout;