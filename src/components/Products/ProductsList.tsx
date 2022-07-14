import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import ProductItem from './ProductItem';
import { IProduct } from '../../interfaces/IProduct';
import Swal from 'sweetalert2';

const API_URL = config.API_URL;
const PRODUCTS_STATIC_URL = config.PRODUCTS_STATIC_URL;

const ProductsList: FC = () => {
    const [products, setProducts] = useState<IProduct[] | []>([]);

    const getProducts = async () => {
        const response = await axios.get(API_URL + '/products');
        setProducts(response.data);
    }

    const removeProduct = async productId => {
        try { 
            const response = await axios.delete(API_URL + '/products', {
                data: {productId}
            });
    
            Swal.fire({
                title: 'Товар успешно удалён',
                icon: 'success'
            });

            const newProductsList = products.filter(({_id}) => _id != productId);
            setProducts(newProductsList);
        } catch (e) {
            Swal.fire({
                title: e.response?.data?.message,
                icon: 'error'
            });
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <ul className="products">
            {products && products.map(({_id, title, description, price, image, isExists}: IProduct, index) => (
                <ProductItem 
                    _id={_id}
                    title={title} 
                    description={description} 
                    price={price}
                    image={PRODUCTS_STATIC_URL + image} 
                    isExists={isExists} 
                    removeProduct={removeProduct}
                    key={index} />
            ))}

            {products.length <= 0 && <h3>Пока что нету никаких товаров.</h3>}
        </ul>
    );
}

export default ProductsList;