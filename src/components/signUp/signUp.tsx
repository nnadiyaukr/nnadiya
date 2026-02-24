//@ts-nocheck
import classes from './signUp.module.scss';
import { AppInput } from '@/components/share/appInput';
import { useState } from 'react';
import { authService } from '@/services/auth.service';
import useAuthStore from '@/core/store/auth.store';
import useErrorStore from '@/core/store/error.store';
import useUiActionsStore from '@/core/store/uiActions.store';

export const SignUp = () => {
    const [data, setData] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
    });

    const { setError } = useErrorStore();
    const { setEmail } = useAuthStore();
    const { setIsLoading, setShowModal } = useUiActionsStore();

    const validators = {
        name: (v) => (v && v.trim() ? '' : 'Імʼя обовʼязкове'),
        email: (v) => {
            if (!v || !v.trim()) return 'Email обовʼязковий';
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(v) ? '' : 'Невірний формат email';
        },
        password: (v) => {
            if (!v) return 'Пароль обовʼязковий';
            if (v.length < 6) return 'Пароль має бути не менше 6 символів';
            return '';
        },
        confirmPassword: (v, all) => {
            if (!v) return 'Підтвердження пароля обовʼязкове';
            if (v !== all.password) return 'Паролі не співпадають';
            return '';
        },
    };

    const validateField = (name, value) => {
        const validator = validators[name];
        if (!validator) return '';
        const val = typeof value !== 'undefined' ? value : data[name];
        const err = validator(val, { ...data, [name]: val });
        setErrors((prev) => ({ ...prev, [name]: err }));
        return err;
    };

    const validateAll = () => {
        const nextErrors = {};
        let ok = true;
        for (const key of Object.keys(validators)) {
            const val = data[key];
            const err = validators[key](val, data);
            nextErrors[key] = err;
            if (err) ok = false;
        }
        setErrors(nextErrors);
        return ok;
    };

    const handleChange = (name: string, value: string): void => {
        setData((prevState) => {
            const next = {
                ...prevState,
                [name]: value,
            };
            if (name === 'password' && next.confirmPassword) {
                const confirmErr = validators.confirmPassword(
                    next.confirmPassword,
                    next
                );
                setErrors((prev) => ({ ...prev, confirmPassword: confirmErr }));
            }
            validateField(name, value);
            return next;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateAll()) {
            const firstInvalid =
                Object.keys(errors).find((k) => errors[k]) ||
                Object.keys(validators).find((k) =>
                    validators[k](data[k], data)
                );
            if (firstInvalid) {
                const el = document.querySelector(`[name="${firstInvalid}"]`);
                if (el && typeof el.focus === 'function') el.focus();
            }
            return;
        }

        try {
            setIsLoading(true);
            console.log('Отправка запроса c данными:', data);

            const response = await authService.signUp(data);

            if (response?.status === 200) {
                setIsLoading(false);
                setShowModal('confirmReg');
                setEmail(data.email);
            } else {
                setIsLoading(false);
            }
        } catch (e) {
            setIsLoading(false);
            setError(e);
            setShowModal('error');
        }
    };

    return (
        <div className={classes.signup}>
            <div className={classes.title}>Реєстрація</div>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <AppInput
                    type="text"
                    name="name"
                    placeholder="Введіть Ваше ім'я"
                    value={data.name}
                    onChange={handleChange}
                    additionalStyles={classes.input}
                />
                {errors.name && (
                    <div role="alert" className={classes.error}>
                        {errors.name}
                    </div>
                )}

                <AppInput
                    type="text"
                    name="email"
                    placeholder="Введіть Email"
                    value={data.email}
                    onChange={handleChange}
                    additionalStyles={classes.input}
                />
                {errors.email && (
                    <div role="alert" className={classes.error}>
                        {errors.email}
                    </div>
                )}

                <AppInput
                    name="password"
                    type="password"
                    placeholder="Введіть пароль"
                    value={data.password}
                    onChange={handleChange}
                    additionalStyles={classes.input}
                />
                {errors.password && (
                    <div role="alert" className={classes.error}>
                        {errors.password}
                    </div>
                )}

                <AppInput
                    name="confirmPassword"
                    type="password"
                    placeholder="Повторіть введення пароля"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    additionalStyles={classes.input}
                />
                {errors.confirmPassword && (
                    <div role="alert" className={classes.error}>
                        {errors.confirmPassword}
                    </div>
                )}

                <button type="submit">Надiслати</button>
            </form>
        </div>
    );
};
