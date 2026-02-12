//@ts-nocheck
import useUiActionsStore from '@/core/store/uiActions.store';
import { Modal } from '@/components/share/modal';
import { LogIn } from '@/components/logIn';
import { SignUp } from '@/components/signUp';
import { ConfirmRegistration } from '@/components/confirmRegistration';
import { ErrorMessage } from '@/components/errorMessage';
import { SuccessMessage } from '@/components/successMessage';
import { useEffect } from 'react';

const ModalsLayout = () => {
    const { showModal } = useUiActionsStore();

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [showModal]);
    const modalsVariable = {
        login: <LogIn />,
        signUp: <SignUp />,
        confirmReg: <ConfirmRegistration />,
        error: <ErrorMessage />,
        success: <SuccessMessage />,
    };

    if (showModal) {
        return <Modal>{modalsVariable[showModal]}</Modal>;
    }
};
export default ModalsLayout;
