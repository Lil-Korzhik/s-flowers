import { FC } from 'react';

type PropsType = {
    type: string,
    className: string,
    placeholder: string,
    value?: string,
    setValue: any
}

const Input: FC<PropsType> = ({type, className, placeholder, value = '', setValue}) => {
    return (
        <input 
            type={type} 
            className={className}
            placeholder={placeholder} 
            value={value}
            onChange={e => setValue(e.target.value)}
            required />
    );
}

export default Input;