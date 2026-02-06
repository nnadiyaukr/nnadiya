//@ts-nocheck
import classes from './modal.module.scss';
import { useRef } from 'react';
import { useClickAway } from 'react-use';
import useUiActionsStore from '@/core/store/uiActions.store';

export const Modal = ({ children }) => {
    const { setShowModal } = useUiActionsStore();
    const ref = useRef(null);
    useClickAway(ref, () => {
        setShowModal(false);
    });

    return (
        <div className={classes.modal}>
            <div className={classes.body}>
                <div className={classes.content} ref={ref}>
                    {children}
                </div>
            </div>
        </div>
    );
};
