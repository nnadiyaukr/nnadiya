//@ts-nocheck
const errorHandler = (e) => {
    const { status } = e;
    if (!status) throw 'Отсутствует связь с сервером';
    if (status === 400) throw 'Пользователь уже существует';
    if (status === 401) throw 'Ошибка авторизации';
     if (status === 409)
        throw 'Код подтверждания уже был отправлен. Проверьте вашу почту';
    if (status === 422) throw 'Ошибка кода подтверждения';
    if (status === 500) throw "Непредвиденная ошибка. Попробуйте позже"
};

export default errorHandler;
