import type { NextPage } from 'next';
import Router from 'next/router';
import Head from 'next/head';
import Image from 'next/image'

import ProductsList from '../components/Products/ProductsList';
import { useState, useEffect } from 'react';
import { IProduct } from '../interfaces/IProduct';

import $api from '../axios';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { setProducts } from '../redux/slices/productsSlice';
import { setCategories } from '../redux/slices/categorySlice';
import axios from 'axios';
import SelectCategory from '../components/Category/SelectCategory';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const getInfo = async () => {
      Swal.showLoading();

      const response = await axios.all([
        $api.get('/products'),
        $api.get('/category'),
        $api.get('/content')
      ]);

      dispatch(setProducts(response[0].data));
      dispatch(setCategories(response[1].data));

      setPhoneNumber(response[2].data[0].value);

      Swal.close();
  }

  const selectCategory = async categoryName => {
    Swal.showLoading();

    try {
      const response = await $api.post('/products/category', {categoryName});
      dispatch(setProducts(response.data));

      Swal.close();
    } catch (e) {
      Swal.fire({title: e.response.data.message, icon: 'error'});
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="next-page">
      <Head>
        <title>Список цветов | S-Flowers</title>
      </Head>
      
      <h2 className="section-title">Каталог цветов</h2>

      <div className="wrapper">
        <SelectCategory onChangeHandle={e => selectCategory(e.target.value)} />
        <h3 className="phone-number">
          Номер телефона: 
          <a href={`tel:${phoneNumber}`} className="aqua-color">{phoneNumber}</a></h3>
      </div>
      <ProductsList />
    </div>
  );
}

export default Home;