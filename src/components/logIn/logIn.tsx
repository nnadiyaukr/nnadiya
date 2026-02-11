//@ts-nocheck
import classes from './logIn.module.scss';
import { AppInput } from '@/components/share/appInput';
import { useState } from 'react';
import { authService } from '@/services/auth.service';
import useErrorStore from '@/core/store/error.store';
import useUiActionsStore from '@/core/store/uiActions.store';
import localStorageService from '@/services/localStorage.service';
import { useLocation, useNavigate } from 'react-router';

export const LogIn = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const { setError } = useErrorStore();
    const { setIsLoading, setShowModal } = useUiActionsStore();
    const handleChange = (name: string, value: string): void => {
        setData((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            console.log('Отправка запроса c данными:', data);

            const response = await authService.login(data);
            console.log('response', response);
            if (response?.status === 200) {
                setIsLoading(false);
                localStorageService.setItem(
                    'accessToken',
                    response?.data?.accessToken
                );
                navigate('/profile');
                setShowModal(false);
            }
        } catch (e) {
            setIsLoading(false);
            // setShowLoginModal(false);
            setError(e);
        }
    };

    return (
        <div className={classes.login}>
            <div className={classes.title}>Вхід</div>
            <form className={classes.form} onSubmit={handleSubmit}>
                <AppInput
                    name="email"
                    placeholder="Введіть Email"
                    value={data.email}
                    onChange={handleChange}
                    additionalStyles={classes.input}
                />
                <AppInput
                    name="password"
                    placeholder="Введіть пароль"
                    value={data.password}
                    onChange={handleChange}
                    additionalStyles={classes.input}
                />

                <button>Надіслати</button>
            </form>
        </div>
    );
};
