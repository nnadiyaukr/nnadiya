import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ErrorState {
    error: string
    setError: (error: string) => void
}

const useErrorStore = create<ErrorState>()(
    devtools(
        (set) => ({
            error: "",
            setError: (error: string) => set({ error }, false, 'setError'),
        }),
        {
            name: 'error-store',
            store: "error"
        }
    )
)

export default useErrorStore