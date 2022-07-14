import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '../../interfaces/IProduct';
import config from '../../config';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = config.API_URL;

const ProductItem: FC<IProduct> = ({_id, title, description, price, isExists, image, removeProduct}) => {
    return (
        <li className="products__item">
            <img src={image} className="products__item-img" />
            <div className="products__item-info">
                <h3 className="products__item-title">{title}</h3>
                <p className="products__item-desc">{description}</p>
                <span className="products__item-price">{price} ₴</span>

                <div className="products__item-status">
                    <p className={`products__item-status-text ${!isExists && 'not-exists'}`}>
                        {isExists ? 'В наличии' : 'Нет в наличии'}
                    </p>
                    {localStorage.isAuth && 
                        <div className="products__item-buttons">
                            <Link href={{pathname: 'admin/edit-product', query: { productId: _id}}}>
                                <button className="products__item-edit">Р</button>
                            </Link>
                            <button className="products__item-remove" onClick={() => removeProduct(_id)}>X</button>
                        </div>
                    }
                </div>
            </div>
        </li>
    );
}

export default ProductItem;