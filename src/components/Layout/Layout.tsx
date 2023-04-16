import React from 'react';
import NavBar from '../shared/NavBar';
import SEO from './SEO';

interface Layoutprops {
    seo: {
        title?: string,
        description?: string,
        keywords?: string,
        author?: string,
    },
    children: JSX.Element,
}

const Layout = ({seo,children}:Layoutprops):JSX.Element => {
    return (
        <>
            <SEO seo={seo}></SEO>
            <header>
                <NavBar />
            </header>
            <main className='mx-auto max-w-7xl py-6 px-4'>{children}</main>
            <footer></footer>
        </>
    );
};

export default Layout;