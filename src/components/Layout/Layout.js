import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({
                    children
                }) => (
    <div className={'flex flex-col min-h-screen w-full'}>
        <Header />
        <main className={'flex-grow p-6'}>
            {children}
        </main>
        <Footer />
    </div>
);

Layout.defaultProps = {
    children: null
}

export default Layout;