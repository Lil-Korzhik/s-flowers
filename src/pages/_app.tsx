import type { AppProps } from 'next/app';
import Layout from '../components/Global/Layout';

import { Provider } from 'react-redux';
import store from '../redux/store';

import '../styles/specification.scss';
import '../styles/products.scss';
import '../styles/responsive.scss';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <Layout>
            <Provider store={store}>
                <Component {...pageProps} i/>
            </Provider>
        </Layout>
    );
}

export default App;