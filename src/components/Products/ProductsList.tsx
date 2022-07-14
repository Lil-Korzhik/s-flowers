import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import ProductItem from './ProductItem';
import { IProduct } from '../../interfaces/IProduct';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { setProducts } from '../../redux/slices/productsSlice';

const API_URL = config.API_URL;
const PRODUCTS_STATIC_URL = config.PRODUCTS_STATIC_URL;

const ProductsList: FC = () => {  
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.productsSlice.products);

    const removeProduct = async productId => {
      try { 
          Swal.showLoading();
  
          const response = await axios.delete(API_URL + '/products', {
              data: {productId}
          });
          
          Swal.fire({
              title: 'Товар успешно удалён',
              icon: 'success'
          });
  
          const newProductsList = products.filter(({_id}) => _id != productId);
          dispatch(setProducts(newProductsList));
      } catch (e) {
          Swal.fire({
              title: e.response?.data?.message,
              icon: 'error'
          });
      }
    }

    return (
        <ul className="products">
            {products && products.map(({_id, title, description, price, image, isExists, categoryName}: IProduct, index) => (
                <ProductItem 
                    _id={_id}
                    title={title} 
                    description={description} 
                    price={price}
                    image={PRODUCTS_STATIC_URL + image} 
                    isExists={isExists}
                    categoryName={categoryName}
                    removeProduct={removeProduct}
                    key={index} />
            ))}

            {products.length <= 0 && <h3>Пока что нету никаких товаров.</h3>}
        </ul>
    );
}

export default ProductsList;