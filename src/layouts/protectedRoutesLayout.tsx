//@ts-nocheck

import { Outlet, redirect, useNavigate } from 'react-router';
import localStorageService from '@/services/localStorage.service';
import { useEffect, useState } from 'react';
import httpService from '@/services/http.service';
import { authService } from '@/services/auth.service';
import useErrorStore from '@/core/store/error.store';
import useAuthStore from '@/core/store/auth.store';
import useUiActionsStore from '@/core/store/uiActions.store';

const ProtectedRoutesLayout = () => {
    const [isAuth, setIsAuth]= useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const { setError } = useErrorStore();
    const { setShowModal } = useUiActionsStore();
    // const validateAccess = async () => await httpService.get("validateAccess");
    const checkAuth = async () => {
        try {
            const {data} = await authService.validateAccess();
            if (data?.success === true) {
                console.log("dataasda", data);
                setIsAuth(true)
            }
        } catch (e) {
            console.log("ProtectedRoutesLayout__checkAuth", e)
            setError(e);
            setShowModal('error');
            navigate('/');
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        checkAuth()
        // console.log("Отправляем");
        //
        // validateAccess().then(({ data }) => {
        //
        //     if (data?.success === true) {
        //         console.log("dataasda", data);
        //         setIsAuth(true)
        //
        //     } else {
        //         navigate("/")
        //     }
        // }).catch(e => console.log("ProtectedRoutesLayout__validateAccess", e)).finally(() => setIsLoading(false))
    }, []);

    // useEffect(() => {
    //     if (!isAuth) {
    //         navigate('/')
    //     }
    // }, [isAuth]);
    if (isLoading) {
        return "Loading..."
    }

    return (
        isAuth && <Outlet />
    )
};

export default ProtectedRoutesLayout;
