//@ts-nocheck
import { NavBar } from '@/components/navBar/navBar';
import { useState } from 'react';
import { Search } from '@/components/search';
import { Header } from '@/components/header/header';
import ModalsLayout from '@/layouts/modalsLayout';
import useUiActionsStore from '@/core/store/uiActions.store';
import { Loading } from '@/components/loading';

const MainLayout = ({ children }) => {
    const [showSearch, setShowSearch] = useState(false);
    const {isLoading} = useUiActionsStore();

    const handleSearch = (e, id) => {
        if (id === 'search') {
            console.log('id', id);
            e.preventDefault();
            setShowSearch(true);
        }
    };

    return (
        <div>
            <Header />
            <NavBar onSearch={handleSearch} />
            {children}
            {showSearch && <Search handleShowSearch={setShowSearch} />}
            <ModalsLayout />
            {isLoading && <Loading/>}
        </div>
    );
};

export default MainLayout;
