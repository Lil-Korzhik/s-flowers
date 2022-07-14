import { useState, useEffect } from "react";
import { NextPage } from "next";

import Head from 'next/head';
import Router, { useRouter } from "next/router";

import config from '../../config';

import Input from "../../components/UI/Input";
import TextArea from "../../components/UI/TextArea";
import FileInput from "../../components/UI/FileInput";
import CheckBox from "../../components/UI/CheckBox";

import Swal from 'sweetalert2';
import axios from 'axios';
import { IProduct } from "../../interfaces/IProduct";
import SelectCategory from "../../components/Category/SelectCategory";

import $api from "../../axios";

const API_URL = config.API_URL;

const EditProduct: NextPage = () => {
    const router = useRouter();
    const {productId} = router.query;
    
    const [titleValue, setTitleValue] = useState<string>('');
    const [descriptionValue, setDescriptionValue] = useState<string>('');
    const [priceValue, setPriceValue] = useState<string>('');
    const [isExistsValue, setIsExistsValue] = useState<boolean>(true);
    const [categoryValue, setCategoryValue] = useState<string>('Все');
    const [imageValue, setImageValue] = useState('');

    const getProduct = async () => {
        Swal.showLoading();

        const response = await axios.get(API_URL + '/products/' + productId);
        const product = response.data;
        setTitleValue(product.title);
        setDescriptionValue(product.description);
        setPriceValue(product.price);
        setIsExistsValue(product.isExists);
        setCategoryValue(product.categoryName);

        Swal.close();
    }

    useEffect(() => {
        if(!localStorage.isAuth || !productId) Router.push('/');
        getProduct();
    }, []);

    const submitHandle = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productId', productId.toString());
        formData.append('title', titleValue);
        formData.append('description', descriptionValue);
        formData.append('price', priceValue);
        formData.append('isExists', isExistsValue.toString());
        formData.append('categoryName', categoryValue);
        if(imageValue != '') formData.append('image', imageValue);
        
        try {
            Swal.showLoading();
            const response = await $api.put('/products', formData);
            Swal.fire({
                title: 'Товар был обновлён!',
                icon: 'success'
            });
        } catch (e) {
            Swal.fire({
                title: e.response?.data?.message,
                icon: 'error'
            });
        }
    }

    return (
        <div className="next-page">
            <Head>
                <title>Обновление товара | S-Flowers</title>
            </Head>

            <h2 className="section-title">Обновление товара</h2>
            <form className="edit-product" onSubmit={submitHandle}>
                <Input 
                    type="text" 
                    placeholder="Название товара" 
                    className="edit-product__input" 
                    setValue={setTitleValue} 
                    value={titleValue} />

                <TextArea 
                    type="text" 
                    placeholder="Описание товара" 
                    className="edit-product__input" 
                    setValue={setDescriptionValue}
                    value={descriptionValue} />

                <Input 
                    type="text" 
                    placeholder="Стоимость товара" 
                    className="edit-product__input" 
                    setValue={setPriceValue}
                    value={priceValue} />

                <SelectCategory onChangeHandle={e => setCategoryValue(e.target.value)} optionName={categoryValue} />
                <CheckBox value={isExistsValue} setValue={setIsExistsValue} />

                <FileInput setValue={setImageValue} />

                <button type="submit" className="create-product__btn">Обновить товар</button>
            </form> 
        </div>
    );
}

export default EditProduct;