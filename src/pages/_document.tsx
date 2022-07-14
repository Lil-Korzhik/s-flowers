import { Html, Head, Main, NextScript } from 'next/document'

import config from '../config';

const Document = () => {
    return (
        <Html>
            <Head>
                {/* Charset */}
                <meta charSet="UTF-8" />
                {/* Responsive */}
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                {/* SEO Tags */}
                <meta name="description" content="Каталог цветов S-Flowers" />
                <meta name="keywords" content="каталог, цветы, товары" />
                {/* Styling */}
                <meta name="theme-color" content="#AF48F4" />
                <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                {/* OG Tags */}
                <meta property="og:title" content="S-Flowers" />
                <meta property="og:description" content="Каталог цветов" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={config.PREVIEW_URL} />
                <meta property="og:site_name" content="S-Flowers" />
                {/* Fonts */}
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default Document;