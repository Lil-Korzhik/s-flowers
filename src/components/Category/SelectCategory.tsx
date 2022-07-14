import { FC } from 'react';
import { ICategory } from '../../interfaces/ICategory';
import { useAppSelector } from '../../redux/hook';

type PropsType = {
    onChangeHandle: any,
    optionName?: string
}

const SelectCategory: FC<PropsType> = ({onChangeHandle, optionName = false}) => {
    const categories = useAppSelector(state => state.categorySlice.categories);

    return (
        <select onChange={onChangeHandle}>
            {categories && categories.map(({name}: ICategory, index) => (
                <option value={name} key={index} selected={optionName == name ? true : false}>
                    {name}
                </option>
            ))}
        </select>
    );
}

export default SelectCategory;