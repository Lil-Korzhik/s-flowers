import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Router from "next/router";
import Input from "../../components/UI/Input";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import Swal from "sweetalert2";
import $api from "../../axios";

const EditContent: NextPage = () => {
    const [phoneValue, setPhoneValue] = useState<string>('');

    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!localStorage.isAuth) Router.push('/');
    }, []);

    const submitHandle = async e => {
        e.preventDefault();

        try {
            Swal.showLoading();

            const response = await $api.put('/content', {key: 'phone_number', value: phoneValue});

            Swal.fire({
                title: 'Контент обновлен',
                icon: 'success'
            })
        } catch (e) {
            Swal.fire({title: e.response.data.message, icon: 'error'});
        }
    }

    return (
        <div className="next-page">
            <Head>
                <title>Изменить контент | S-Flowers</title>
            </Head>

            <h2 className="section-title">Изменить контент</h2>
            <form className="edit-content" onSubmit={submitHandle}>
                <div className="row">
                    <h3 style={{marginBottom: 10}}>Номер телефона:</h3>
                    <Input 
                        type="text" 
                        placeholder="Значение" 
                        className="edit-content__input" 
                        setValue={setPhoneValue}
                        value={phoneValue} />
                </div>

                <button type="submit" className="edit-content__btn">Изменить</button>
            </form>
        </div>
    );
}

export default EditContent;