//@ts-nocheck
import classes from './invite.module.scss';
import img01 from '@img/invite/01.png';
import { AppInput } from '@/components/share/appInput';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import httpService from '@/services/http.service';
import { ticketService } from '@/services/ticket.service';
import useUiActionsStore from '@/core/store/uiActions.store';

const validationSchema = yup.object().shape({
    fullName: yup
        .string()
        .required("Поле ФІО обов'язкове")
        .min(5, 'ФІО має містити мінімум 5 символів')
        .matches(
            /^[а-яА-ЯёЁa-zA-Z\s]+$/,
            'ФІО має містити лише літери та пробіли'
        )
        .test('two-words', "Введіть повне ФІО (ім'я та прізвище)", (value) => {
            return value && value.trim().split(/\s+/).length >= 2;
        }),

    email: yup
        .string()
        .required("Поле email обов'язкове")
        .email('Введіть коректний email')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Невірний формат email'),

    phone: yup
        .string()
        .required("Поле телефон обов'язкове")
        .matches(
            /^\+?\d[\d\s\-\(\)]{7,}\d$/,
            'Введіть коректний номер телефону'
        )
        .test('phone-length', 'Номер має містити мінімум 10 цифр', (value) => {
            const digits = value?.replace(/\D/g, '') || '';
            return digits.length >= 10;
        }),

    about: yup
        .string()
        .max(500, 'Розповідь про себе не повинна перевищувати 500 символів')
        .optional(),

    photo: yup
        .array()
        .of(
            yup
                .mixed()
                .test(
                    'file-size',
                    'Файл занадто великий (макс. 5MB)',
                    (value) => {
                        if (!value) return true;
                        return value.size <= 5 * 1024 * 1024;
                    }
                )
                .test(
                    'file-type',
                    'Непідтримуваний тип файлу (jpg, png, pdf)',
                    (value) => {
                        if (!value) return true;
                        return [
                            'image/jpeg',
                            'image/png',
                            'application/pdf',
                        ].includes(value.type);
                    }
                )
        )
        .min(1, 'Будь ласка, прикріпіть хоча б один файл') // Добавлена проверка на минимум 1 файл
        .max(2, 'Максимум 2 файли')
        .nullable(),
});

export const Invite = () => {
    const [data, setData] = useState({
        fullName: '',
        email: '',
        phone: '',
        about: '',
        photo: [],
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setShowModal } = useUiActionsStore();

    useEffect(() => {
        if (Object.keys(touched).length > 0) {
            validateField();
        }
    }, [data, touched]);

    const validateField = async (fieldName) => {
        try {
            if (fieldName) {
                await validationSchema.validateAt(fieldName, data);
                setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[fieldName];
                    return newErrors;
                });
            } else {
                await validationSchema.validate(data, { abortEarly: false });
                setErrors({});
            }
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const newErrors = {};
                err.inner.forEach((error) => {
                    if (fieldName && error.path === fieldName) {
                        newErrors[fieldName] = error.message;
                    } else if (!fieldName) {
                        newErrors[error.path] = error.message;
                    }
                });
                setErrors((prev) => ({ ...prev, ...newErrors }));
            }
        }
    };

    const handleChange = async (name, value) => {
        // Для поля телефона оставляем только цифры
        if (name === 'phone') {
            value = value.replace(/\D/g, '');
        }

        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (touched[name]) {
            await validateField(name);
        }
    };

    const handleBlur = (fieldName) => {
        setTouched((prev) => ({
            ...prev,
            [fieldName]: true,
        }));
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);

        // Ограничиваем количество файлов до 2
        const newFiles = files.slice(0, 2);

        // Если уже есть выбранные файлы, добавляем новые (но не более 2 всего)
        const existingFiles = data.photo || [];
        const allFiles = [...existingFiles, ...newFiles].slice(0, 2);

        await handleChange('photo', allFiles);

        // Автоматически помечаем поле как touched после выбора файла
        if (!touched.photo) {
            setTouched((prev) => ({
                ...prev,
                photo: true,
            }));
        }
    };

    const removeFile = async (index) => {
        const updatedFiles = data.photo.filter((_, i) => i !== index);
        await handleChange('photo', updatedFiles);

        // Если после удаления файлов не осталось, валидация покажет ошибку
        if (updatedFiles.length === 0 && touched.photo) {
            await validateField('photo');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allTouched = {
            fullName: true,
            email: true,
            phone: true,
            about: true,
            photo: true,
        };
        setTouched(allTouched);

        try {
            await validationSchema.validate(data, { abortEarly: false });

            setIsSubmitting(true);

            // const formData = new FormData();
            // formData.append('fullName', data.fullName);
            // formData.append('email', data.email);
            // formData.append('phone', data.phone);
            // formData.append('about', data.about);
            //
            // data.photo.forEach((file) => {
            //     formData.append('photos', file);
            // });

            const resp = await ticketService.invite({
                ...data,
                photo: data.photo.map((file) => ({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                })),
            });

            if (resp?.data?.success) {
                setShowModal('success');
            }

            // const res = await httpService.post(
            //     'invite',
            //     { formData },
            //     {
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //         },
            //     }
            // );

            // Здесь будет реальный запрос к API

            setData({
                fullName: '',
                email: '',
                phone: '',
                about: '',
                photo: [],
            });
            setErrors({});
            setTouched({});
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const newErrors = {};
                err.inner.forEach((error) => {
                    newErrors[error.path] = error.message;
                });
                setErrors(newErrors);

                const firstErrorField = Object.keys(newErrors)[0];
                const errorElement = document.querySelector(
                    `[name="${firstErrorField}"]`
                );
                if (errorElement) {
                    errorElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                }
            } else {
                console.error('Ошибка при отправке:', err);
                alert('Помилка при відправці форми. Спробуйте ще раз.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = () => {
        return Object.keys(errors).length === 0 && data.photo?.length > 0;
    };

    return (
        <div className={classes.invite}>
            <div className="_container-default">
                <div className={classes.title}>Приєднуйся</div>
                <div className={classes.row}>
                    <div className={classes.img}>
                        <img src={img01} alt="invite" />
                    </div>
                    <div className={classes.body}>
                        <div className={classes.text}>
                            Якщо ви хочете допомогти нам порадою, інформацією
                            або участю
                        </div>
                        <form
                            className={classes.form}
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <div className={classes.formGroup}>
                                <AppInput
                                    value={data.fullName}
                                    name="fullName"
                                    placeholder="Повне ФІО"
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('fullName')}
                                    additionalStyles={classes.input}
                                    className={
                                        errors.fullName
                                            ? classes.inputError
                                            : ''
                                    }
                                />
                                {errors.fullName && touched.fullName && (
                                    <div role="alert" className={classes.error}>
                                        {errors.fullName}
                                    </div>
                                )}
                            </div>

                            <div className={classes.formGroup}>
                                <AppInput
                                    additionalStyles={classes.input}
                                    type="email"
                                    value={data.email}
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('email')}
                                    className={
                                        errors.email ? classes.inputError : ''
                                    }
                                />
                                {errors.email && touched.email && (
                                    <div role="alert" className={classes.error}>
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            <div className={classes.formGroup}>
                                <AppInput
                                    additionalStyles={classes.input}
                                    type="tel"
                                    value={data.phone}
                                    name="phone"
                                    placeholder="Номер телефону"
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('phone')}
                                    className={
                                        errors.phone ? classes.inputError : ''
                                    }
                                    pattern="[0-9]*"
                                    inputMode="numeric"
                                />
                                {errors.phone && touched.phone && (
                                    <div role="alert" className={classes.error}>
                                        {errors.phone}
                                    </div>
                                )}
                            </div>

                            <div className={classes.formGroup}>
                                <AppInput
                                    additionalStyles={classes.input}
                                    type="textarea"
                                    value={data.about}
                                    name="about"
                                    placeholder="Розкажіть про себе"
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('about')}
                                    className={
                                        errors.about ? classes.inputError : ''
                                    }
                                />
                                <div className={classes.charCounter}>
                                    {data.about.length}/500
                                </div>
                                {errors.about && touched.about && (
                                    <div role="alert" className={classes.error}>
                                        {errors.about}
                                    </div>
                                )}
                            </div>

                            <div className={classes.formGroup}>
                                <div className={classes.fileUpload}>
                                    <label className={classes.fileLabel}>
                                        <input
                                            type="file"
                                            name="photo"
                                            onChange={handleFileChange}
                                            accept=".jpg,.jpeg,.png,.pdf"
                                            className={classes.fileInput}
                                            multiple
                                            disabled={data.photo?.length >= 2}
                                        />
                                        <span
                                            className={`${classes.fileButton} ${
                                                errors.photo && touched.photo
                                                    ? classes.fileButtonError
                                                    : ''
                                            }`}
                                        >
                                            {data.photo?.length > 0
                                                ? `Файлів вибрано: ${data.photo.length}/2`
                                                : 'Прикріпити фото/документ (макс. 2 файли)'}
                                        </span>
                                    </label>

                                    {data.photo?.length === 0 &&
                                        touched.photo && (
                                            <div
                                                role="alert"
                                                className={classes.error}
                                            >
                                                {errors.photo ||
                                                    'Будь ласка, прикріпіть хоча б один файл'}
                                            </div>
                                        )}

                                    {data.photo?.map((file, index) => (
                                        <div
                                            key={index}
                                            className={classes.fileInfo}
                                        >
                                            <span>
                                                {file.name} (
                                                {(
                                                    file.size /
                                                    1024 /
                                                    1024
                                                ).toFixed(2)}{' '}
                                                MB)
                                            </span>
                                            <button
                                                type="button"
                                                className={classes.removeFile}
                                                onClick={() =>
                                                    removeFile(index)
                                                }
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}

                                    {data.photo?.length >= 2 && (
                                        <div className={classes.fileLimit}>
                                            Досягнуто максимальної кількості
                                            файлів (2)
                                        </div>
                                    )}
                                </div>
                                {errors.photo &&
                                    touched.photo &&
                                    data.photo?.length > 0 && (
                                        <div
                                            role="alert"
                                            className={classes.error}
                                        >
                                            {errors.photo}
                                        </div>
                                    )}
                            </div>

                            <button
                                type="submit"
                                className={classes.submitButton}
                                disabled={
                                    isSubmitting || !isFormValid() // Используем новую функцию для проверки
                                }
                            >
                                {isSubmitting
                                    ? 'Відправка...'
                                    : 'Надіслати заявку'}
                            </button>

                            {/* Индикатор обязательности файлов */}
                            {data.photo?.length === 0 && (
                                <div className={classes.fileRequired}>
                                    * Обов'язково прикріпіть хоча б один файл
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
