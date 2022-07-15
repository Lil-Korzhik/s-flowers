import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';

import config from '../../config';
import Input from '../../components/UI/Input';
import Router from 'next/router';

const API_URL = config.API_URL;

const Auth: NextPage = () => {
  const [loginValue, setLoginValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

  const submitHandle = async e => {
    e.preventDefault();

    try {
      Swal.showLoading();
      
      const response = await axios.post(API_URL + '/users/login', {
          login: loginValue,
          password: passwordValue
      });

      localStorage.isAuth = true;
      Swal.fire({
        title: 'Авторизация прошла успешно',
        icon: 'success'
      });

      setTimeout(() => Router.reload(), 1000);
    } catch (e) {
      Swal.fire({
        title: e.response?.data?.message,
        icon: 'error'
      });
    }
  } 

  useEffect(() => {
    localStorage.isAuth && Router.push('/');
  }, []);

  return (
    <div className="next-page">
      <Head>
        <title>Авторизация | S-Flowers</title>
      </Head>

      <h2 className="section-title">Авторизация</h2>
      <form className="auth" onSubmit={submitHandle}>
        <Input type="text" className="auth__input" placeholder="Логин" value={loginValue} setValue={setLoginValue} />
        <Input type="text" className="auth__input" placeholder="Пароль" value={passwordValue} setValue={setPasswordValue} />
        <button type="submit" className="auth__btn">Авторизоваться</button>
      </form>
    </div>
  );
}

export default Auth;