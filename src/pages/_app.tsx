import type { AppProps } from 'next/app';
import Layout from '../components/Global/Layout';

import '../styles/specification.scss';
import '../styles/products.scss';
import '../styles/responsive.scss';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Layout>
            <Component {...pageProps} i/>
        </Layout>
    );
}

export default App;