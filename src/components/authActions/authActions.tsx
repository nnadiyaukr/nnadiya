//@ts-nocheck
import classes from './authActions.module.scss';
import useUiActionsStore from '@/core/store/uiActions.store';

export const AuthActions = () => {
    const { setShowModal } = useUiActionsStore();
    return (
        <div className={classes.actions}>
            <div
                className={classes.login}
                onClick={() => setShowModal('login')}
            >
                Увійти
            </div>
            <div
                className={classes.registration}
                onClick={() => setShowModal('signUp')}
            >
                Реєстрація
            </div>
        </div>
    );
};
