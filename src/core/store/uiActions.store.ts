//@ts-nocheck
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useUiActionsStore = create()(
    devtools(
        (set) => ({
            showModal: false,
            isLoading: false,
            setShowModal: (value: boolean) =>
                set({ showModal: value }, false, 'setShowModal'),
            setIsLoading: (value) =>
                set({ isLoading: value }, false, 'setIsLoading'),
        }),
        {
            name: 'uiActionsStore',
            store: 'uiActions',
        }
    )
);

export default useUiActionsStore;
