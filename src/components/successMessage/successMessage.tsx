import classes from './successMessage.module.scss';
import successIcon from '@icons/success.png';

export const SuccessMessage = () => {
    return (
        <div className={classes.successMessage}>
            <img src={successIcon} alt="successIcon" />
            Дякуємо! Ваше звернення було успішно надіслано.
        </div>
    );
};
