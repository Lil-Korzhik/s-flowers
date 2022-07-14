import { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import Input from "../../components/UI/Input";
import Swal from "sweetalert2";
import $api from "../../axios";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setCategories } from "../../redux/slices/categorySlice";
import { ICategory } from "../../interfaces/ICategory";

const CreateCategory: NextPage = () => {
    const [nameValue, setNameValue] = useState<string>('');

    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categorySlice.categories);

    useEffect(() => {
        if(!localStorage.isAuth) Router.push('/');
    }, []);

    const submitHandle = async e => {
        e.preventDefault();

        try {
            Swal.showLoading();

            const response = await $api.post('/category', {name: nameValue});
            const newCategories = [...categories, response.data];
            dispatch(setCategories(newCategories));

            Swal.fire({
                title: 'Категория создана',
                icon: 'success'
            });
        } catch (e) {
            Swal.fire({title: e.response.data.message, icon: 'error'});
        }
    }

    const removeCategory = async categoryId => {
        try {
            Swal.showLoading();

            const response = await $api.delete('/category', {data: {categoryId}});
            const newCategories = categories.filter(item => item._id != response.data._id);
            dispatch(setCategories(newCategories));

            Swal.fire({
                title: 'Категория удалена',
                icon: 'success'
            });
        } catch (e) {
            Swal.fire({title: e.response.data.message, icon: 'error'});
        }
    }

    return (
        <div className="next-page">
            <Head>
                <title>Создание категории | S-Flowers</title>
            </Head>

            <h2 className="section-title">Создание категории</h2>
            <form className="create-category" onSubmit={submitHandle}>
                <Input 
                    type="text"
                    placeholder="Название категории" 
                    className="create-category__input" 
                    value={nameValue} 
                    setValue={setNameValue} />

                <button type="submit" className="create-category__btn">Создать категорию</button>
            </form>

            <ul className="categories">
                {categories && categories.map(({_id, name}: ICategory, index) => (
                    <li className="categories__item" key={index}>
                        {name}
                        <button type="button" className="categories__item-remove" onClick={() => removeCategory(_id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CreateCategory;