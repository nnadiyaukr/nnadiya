//@ts-nocheck
import MainLayout from '@/layouts/mainLayout';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <MainLayout>
            <Outlet/>
        </MainLayout>
    );
};

export default RootLayout;
