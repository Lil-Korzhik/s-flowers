import type { NextPage } from 'next';
import Router from 'next/router';
import Head from 'next/head';
import Image from 'next/image'

import ProductsList from '../components/Products/ProductsList';

const Home: NextPage = () => {
  return (
    <div className="next-page">
      <Head>
        <title>Список цветов | S-Flowers</title>
      </Head>
      
      <h2 className="section-title">Каталог цветов</h2>
      <ProductsList />
    </div>
  );
}

export default Home;