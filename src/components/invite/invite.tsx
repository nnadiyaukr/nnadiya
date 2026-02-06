// import classes from './invite.module.scss';
// import img01 from '@img/invite/01.png';
// import { Link } from 'react-router';
//
// export const Invite = () => {
//     return (
//         <div className={classes.invite}>
//             <div className="_container-default">
//                 <div className={classes.title}>Присоединяйтесь</div>
//                 <div className={classes.row}>
//                     <div className={classes.img}>
//                         {<img src={img01} alt="invite" />}
//                     </div>
//                     <div className={classes.body}>
//                         <div className={classes.text}>
//                             Если вы хотите помочь нам советом, информацией или
//                             участием
//                         </div>
//                         <div className={classes.actions}>
//                             <Link to="#">Хочу </Link>
//                             <Link to="#"></Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

import React, { useState, useRef } from "react";

export  function Invite() {
    const [form, setForm] = useState({
        lastName: "",
        firstName: "",
        patronymic: "",
        about: "",
        email: "",
        phone: "",
        files: [], // array of File
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        patronymic: "",
        about: "",
        email: "",
        phone: "",
        files: "",
    });

    const fileInputRef = useRef(null);

    // Basic validators
    const validators = {
        lastName: (v) => (v.trim() ? "" : "Фамилия обязательна"),
        firstName: (v) => (v.trim() ? "" : "Имя обязательно"),
        patronymic: (v) => "", // отчество можно не обязательно — уберите валидацию если нужно
        about: (v) => (v.length <= 1000 ? "" : "Поле «О себе» слишком длинное"),
        email: (v) => {
            if (!v.trim()) return "Email обязателен";
            // простой regex для email
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(v) ? "" : "Неверный формат email";
        },
        phone: (v) => {
            if (!v.trim()) return "Телефон обязателен";
            // уже гарантируем, что phone содержит только цифры
            if (!/^\d+$/.test(v)) return "Телефон должен содержать только цифры";
            if (v.length < 7) return "Телефон слишком короткий";
            if (v.length > 15) return "Телефон слишком длинный";
            return "";
        },
        files: (files) => {
            if (!files || files.length === 0) return "Загрузите 1 или 2 фотографии";
            if (files.length > 2) return "Можно загрузить не более 2 фотографий";
            for (let f of files) {
                if (!f.type.startsWith("image/")) return "Допустимы только изображения";
            }
            return "";
        },
    };

    // Validate a single field and update errors state
    function validateField(name, value) {
        const validator = validators[name];
        if (!validator) return;
        const err = validator(value);
        setErrors((e) => ({ ...e, [name]: err }));
        return err;
    }

    // Validate all fields, return boolean valid
    function validateAll() {
        const newErrors = {};
        let valid = true;
        for (let key of Object.keys(validators)) {
            const value = key === "files" ? form.files : form[key];
            const err = validators[key](value);
            newErrors[key] = err;
            if (err) valid = false;
        }
        setErrors(newErrors);
        return valid;
    }

    // Generic change handler for text fields
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
        validateField(name, value);
    }

    // Phone change: allow only digits on input
    function handlePhoneChange(e) {
        const raw = e.target.value || "";
        const digits = raw.replace(/\D/g, "");
        setForm((f) => ({ ...f, phone: digits }));
        validateField("phone", digits);
    }

    // File selection
    function handleFilesChange(e) {
        const fileList = Array.from(e.target.files || []);
        // Limit to first 2 files
        const files = fileList.slice(0, 2);
        setForm((f) => ({ ...f, files }));
        validateField("files", files);
    }

    // Remove one file by index
    function removeFile(index) {
        const newFiles = form.files.filter((_, i) => i !== index);
        setForm((f) => ({ ...f, files: newFiles }));
        validateField("files", newFiles);
        // reset native input if no files remain so user can reselect same file if needed
        if (newFiles.length === 0 && fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    // Submit
    function handleSubmit(e) {
        e.preventDefault();
        const ok = validateAll();
        if (!ok) {
            // focus first field with error
            const firstErrorField = Object.keys(errors).find((k) => errors[k]);
            if (firstErrorField) {
                const el = document.querySelector(`[name="${firstErrorField}"]`);
                if (el && typeof el.focus === "function") el.focus();
            }
            return;
        }

        // Build FormData for demonstration
        const fd = new FormData();
        fd.append("lastName", form.lastName);
        fd.append("firstName", form.firstName);
        fd.append("patronymic", form.patronymic);
        fd.append("about", form.about);
        fd.append("email", form.email);
        fd.append("phone", form.phone);
        form.files.forEach((file, i) => fd.append(`photo_${i + 1}`, file));

        // For demo: log keys and values (files will appear as File objects)
        for (let pair of fd.entries()) {
            console.log(pair[0], pair[1]);
        }

        // reset or show success
        alert("Форма отправлена (см. консоль)");
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div>
                <label>
                    Фамилия
                    <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        onBlur={(e) => validateField("lastName", e.target.value)}
                    />
                </label>
                {errors.lastName && <div role="alert">{errors.lastName}</div>}
            </div>

            <div>
                <label>
                    Имя
                    <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        onBlur={(e) => validateField("firstName", e.target.value)}
                    />
                </label>
                {errors.firstName && <div role="alert">{errors.firstName}</div>}
            </div>

            <div>
                <label>
                    Отчество
                    <input
                        name="patronymic"
                        value={form.patronymic}
                        onChange={handleChange}
                        onBlur={(e) => validateField("patronymic", e.target.value)}
                    />
                </label>
                {errors.patronymic && <div role="alert">{errors.patronymic}</div>}
            </div>

            <div>
                <label>
                    О себе
                    <textarea
                        name="about"
                        value={form.about}
                        onChange={handleChange}
                        onBlur={(e) => validateField("about", e.target.value)}
                    />
                </label>
                {errors.about && <div role="alert">{errors.about}</div>}
            </div>

            <div>
                <label>
                    Email
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={(e) => validateField("email", e.target.value)}
                        autoComplete="email"
                    />
                </label>
                {errors.email && <div role="alert">{errors.email}</div>}
            </div>

            <div>
                <label>
                    Телефон (только цифры)
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handlePhoneChange}
                        onBlur={(e) => validateField("phone", e.target.value)}
                        inputMode="numeric"
                        autoComplete="tel"
                    />
                </label>
                {errors.phone && <div role="alert">{errors.phone}</div>}
            </div>

            <div>
                <label>
                    Фотографии (макс 2)
                    <input
                        ref={fileInputRef}
                        name="files"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFilesChange}
                    />
                </label>
                {errors.files && <div role="alert">{errors.files}</div>}

                {form.files && form.files.length > 0 && (
                    <ul>
                        {form.files.map((f, i) => (
                            <li key={i}>
                                {f.name} ({Math.round(f.size / 1024)} KB){" "}
                                <button type="button" onClick={() => removeFile(i)}>
                                    Удалить
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <button type="submit">Отправить</button>
            </div>
        </form>
    );
}