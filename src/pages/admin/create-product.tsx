import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';

import config from '../../config';
import validateFileInput from '../../helpers/validateFileInput';

import Input from '../../components/UI/Input';
import FileInput from '../../components/UI/FileInput';
import TextArea from '../../components/UI/TextArea';

import Swal from 'sweetalert2';
import axios from 'axios';
import CheckBox from '../../components/UI/CheckBox';
import $api from '../../axios';
import SelectCategory from '../../components/Category/SelectCategory';

const API_URL = config.API_URL;

const CreateProduct: NextPage = () => {
    const [titleValue, setTitleValue] = useState<string>('');
    const [descriptionValue, setDescriptionValue] = useState<string>('');
    const [priceValue, setPriceValue] = useState<string>('');
    const [categoryValue, setCategoryValue] = useState<string>('');
    const [imageValue, setImageValue] = useState(null);

    useEffect(() => {
        if(!localStorage.isAuth) Router.push('/');
    }, []);

    const submitHandle = async e => {
        e.preventDefault();

        const validateResult = validateFileInput(imageValue);
        if(!validateResult) return;

        const formData = new FormData();
        formData.append('title', titleValue);
        formData.append('description', descriptionValue);
        formData.append('price', priceValue);
        formData.append('categoryName', categoryValue);
        formData.append('image', imageValue);

        try {
            Swal.showLoading();
            const response = await $api.post('/products', formData);
            Swal.fire({
                title: 'Товар создан!',
                icon: 'success'
            });

            setTitleValue('');
            setDescriptionValue('');
            setPriceValue('');
            setImageValue('');
        } catch (e) {
            Swal.fire({
                title: e.response.data.message,
                icon: 'error'
            });
        }
    }

    return (
        <div className="next-page">
            <Head>
                <title>Добавление товара | S-Flowers</title>
            </Head>

            <h2 className="section-title">Добавление товара</h2>
            <form className="create-product" encType="multipart/form-data" onSubmit={submitHandle}>
                <Input 
                    type="text"
                    placeholder="Название товара" 
                    className="create-product__input" 
                    value={titleValue} 
                    setValue={setTitleValue} />

                <TextArea 
                    type="text" 
                    placeholder="Описание товара" 
                    className="create-product__input" 
                    value={descriptionValue} 
                    setValue={setDescriptionValue} />
                     
                <Input 
                    type="text" 
                    placeholder="Стоимость товара" 
                    className="create-product__input" 
                    value={priceValue} 
                    setValue={setPriceValue} />

                <SelectCategory onChangeHandle={e => setCategoryValue(e.target.value)} />

                <FileInput setValue={setImageValue} />

                <button type="submit" className="create-product__btn">Добавить товар</button>
            </form>
        </div>
    );
}

export default CreateProduct;