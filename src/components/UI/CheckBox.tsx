import { FC } from 'react';

type PropsType = {
    value: boolean,
    setValue: any
}

const CheckBox: FC<PropsType> = ({value, setValue}) => {
    return (
        <div className={`checkbox ${value ? 'selected' : ''}`} onClick={() => setValue(!value)}>
            {value ? 'В наличии' : 'Нет в наличии'}
        </div>
    );
}

export default CheckBox;