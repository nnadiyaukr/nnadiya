//@ts-nocheck
import classes from './problemsTicket.module.scss';
import { AppInput } from '@/components/share/appInput';
import { useState } from 'react';
import { reviewService } from '@/services/review.service';
import useErrorStore from '@/core/store/error.store';
import useUiActionsStore from '@/core/store/uiActions.store';
import { useLogger } from 'react-use';

export const ProblemsTicket = () => {
    const [data, setData] = useState({
        fullName: '',
        feedbackType: '',
        text: '',
    });

    const [errors, setErrors] = useState({
        fullName: '',
        feedbackType: '',
        text: '',
    });

    const { setError } = useErrorStore();
    const { setIsLoading, setShowModal } = useUiActionsStore();

    const validators = {
        fullName: (v) => {
            if (!v || !v.trim()) return "ПІБ обов'язкове";
            if (v.trim().length < 3) return 'ПІБ має містити хоча б 3 символи';
            return '';
        },
        feedbackType: (v) => {
            if (!v || !v.trim()) return "Контактні дані обов'язкові";
            if (v.trim().length < 3) return 'Введіть коректні контактні дані';
            return '';
        },
        text: (v) => {
            if (!v || !v.trim()) return "Опис проблеми обов'язковий";
            if (v.trim().length < 10)
                return 'Опис має містити хоча б 10 символів';
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
            console.log('Отправка запроса с данными:', data);

            const response = await reviewService.submitReview(data);
            console.log('response', response);

            if (response?.data?.success) {
                // Очищаем форму после успешной отправки
                setData({
                    fullName: '',
                    feedbackType: '',
                    text: '',
                });
                setErrors({
                    fullName: '',
                    feedbackType: '',
                    text: '',
                });
                setIsLoading(false);
                setShowModal('success'); // или любой другой модальный компонент
            } else {
                setIsLoading(false);
                setShowModal('error');
            }
        } catch (e) {
            setIsLoading(false);
            setError(e);
            setShowModal('error');
        }
    };

    return (
        <div className={classes.problems}>
            <div className="_container-default">
                <div className={classes.title}>Повідомити про проблему</div>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <AppInput
                        value={data.fullName}
                        name="fullName"
                        placeholder="ПІБ"
                        type="text"
                        additionalStyles={classes.input}
                        onChange={handleChange}
                    />
                    {errors.fullName && (
                        <div role="alert" className={classes.error}>
                            {errors.fullName}
                        </div>
                    )}

                    <AppInput
                        value={data.feedbackType}
                        name="feedbackType"
                        placeholder="Як зв'язатися з вами? (телефон, email, соцмережі)"
                        type="text"
                        additionalStyles={classes.input}
                        onChange={handleChange}
                    />
                    {errors.feedbackType && (
                        <div role="alert" className={classes.error}>
                            {errors.feedbackType}
                        </div>
                    )}

                    <AppInput
                        value={data.text}
                        name="text"
                        placeholder="Опишіть проблему"
                        type="text"
                        additionalStyles={classes.input}
                        onChange={handleChange}
                    />
                    {errors.text && (
                        <div role="alert" className={classes.error}>
                            {errors.text}
                        </div>
                    )}

                    <button type="submit">Відправити</button>
                </form>
            </div>
        </div>
    );
};
