import Head from 'next/head';
import React from 'react';

const defaultSEO = {
    title:"Movie Searcher",
    description: "Search your favourite movie here",
    keywords: "movie, latest films, drama, fun, action movies",
    author: "Shuvo Haldar",
    // add more what ever meta tag you want
}

interface SEOprops {
    seo: {
        title?: string,
        description?: string,
        keywords?: string,
        author?: string,
    },
}
const SEO = ({seo=defaultSEO}:SEOprops):JSX.Element => {  
    return <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta name="author" content={seo.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
};

export default SEO;