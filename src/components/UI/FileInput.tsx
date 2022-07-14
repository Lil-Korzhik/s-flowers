import { FC, useState } from 'react';

const FileInput: FC<any> = ({setValue}) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);

    const selectFile = file => {
        setValue(file);
        setIsSelected(true);
    }

    return (
        <div className="input-file">
            <input type="file" id="product-image" onChange={e => selectFile(e.target.files[0])} />
            <label htmlFor="product-image" className={isSelected ? 'selected' : ''}>
                {!isSelected ? 'Выбрать картинку товара' : 'Файл выбран'}
            </label>
        </div>
    );
}

export default FileInput;