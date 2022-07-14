import { FC } from 'react';

type PropsType = {
    type: string,
    className: string,
    placeholder: string,
    value?: string,
    setValue: any
}

const TextArea: FC<PropsType> = ({type, className, placeholder, value = '', setValue}) => {
    return (
        <textarea 
            className={className}
            placeholder={placeholder} 
            onChange={e => setValue(e.target.value)}
            value={value}
            required />
    );
}

export default TextArea;