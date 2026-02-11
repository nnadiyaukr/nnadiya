//@ts-nocheck
import classes from './confirmRegistration.module.scss';
import { AppInput } from '@/components/share/appInput';
import { useState } from 'react';
import { authService } from '@/services/auth.service';
import useAuthStore from '@/core/store/auth.store';
import localStorageService from '@/services/localStorage.service';
import useUiActionsStore from '@/core/store/uiActions.store';
import useErrorStore from '@/core/store/error.store';
import {useLocation, useNavigate} from "react-router";

export const ConfirmRegistration = () => {
    const [data, setData] = useState({
        code: '',
    });
    const { email } = useAuthStore();
    const {setIsLoading, setShowModal} = useUiActionsStore();
    const {setError} = useErrorStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            setIsLoading(true);
            e.preventDefault();
            const response = await authService.confirm({
                code: data.code,
                email,
            });
            if (response.data.success) {
                localStorageService.setItem(
                    'accessToken',
                    response.data.accessToken
                );

                navigate("/profile")
                setShowModal(false);
            }

        } catch (e) {
            setIsLoading(false);
            setError(e);
            setShowModal('error');
        }
        finally {
            setIsLoading(false)
        }
    };
    const handleChange = (name, value) => {
        setData((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    return (
        <div className={classes.confirmRegistration}>
            <div className={classes.title}>Подтверждение</div>
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
                <AppInput
                    value={data.code}
                    name="code"
                    placeholder="Введите код подтверждения"
                    onChange={handleChange}
                />
                <button>Подтвердить</button>
            </form>
        </div>
    );
};
