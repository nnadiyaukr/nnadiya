import useErrorStore from '@/core/store/error.store';
import { useEffect } from 'react';
import classes from './errorMessage.module.scss';
import errorIcon from "@icons/error.png";

export const ErrorMessage = () => {
    const { error } = useErrorStore();

    useEffect(() => {
        console.log('error', error);
    }, [error]);

    return <div className={classes.error}>
        <img src={errorIcon} alt="errorIcon" />
        {error}
    </div>;
};
