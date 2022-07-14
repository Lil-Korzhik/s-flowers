import { FC, ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';

type PropsType = {
    children: ReactNode
}

const Layout: FC<PropsType> = ({children}) => {
    const [isAuth, setIsAuth] = useState('');
    useEffect(() => setIsAuth(localStorage.isAuth), []);

    const logout = () => {
        localStorage.removeItem('isAuth');
        setIsAuth('false');
        Router.reload();
    }

    return (
        <div className="container">
            {children}

            {isAuth && 
                <div className="buttons">
                    <Link href="/admin/create-product">
                        <button type="button" className="buttons__item aqua" >➕</button>
                    </Link>

                    <Link href="/admin/create-category">
                        <button type="button" className="buttons__item aqua" >+К</button>
                    </Link>

                    <Link href="/admin/edit-content">
                        <button type="button" className="buttons__item aqua" >✎</button>
                    </Link>
                    
                    <Link href="/">
                        <button type="button" className="buttons__item aqua" >🏠</button>
                    </Link>

                    <button type="button" className="buttons__item red" onClick={logout}>🚪</button>
                </div>
            }
        </div>
    );
}

export default Layout;