import Swal from "sweetalert2";

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
        setProducts(newProductsList);
    } catch (e) {
        Swal.fire({
            title: e.response?.data?.message,
            icon: 'error'
        });
    }
}

export default removeProduct;