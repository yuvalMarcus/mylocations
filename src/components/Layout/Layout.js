import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({
                    children
                }) => (
    <div className={'flex flex-col h-screen justify-between'}>
        <Header />
        <main className={'mb-auto p-6'}>
            {children}
        </main>
        <Footer />
    </div>
);

export default Layout;