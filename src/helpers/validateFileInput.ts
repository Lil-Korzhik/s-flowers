import Swal from 'sweetalert2';

const validateFileInput = file => {
    if(!file) {
        Swal.fire({
            title: 'Выберите картинку товара',
            icon: 'error' 
        });
        return false;
    }

    let isPicture = file.type.split('/')[0] == 'image';
    if(!isPicture) {
        Swal.fire({
            title: 'Вы выбрали не картинку',
            icon: 'error'
        });
        return false;
    }

    return true;
}

export default validateFileInput;