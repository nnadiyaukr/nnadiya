import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AuthState {
    email: string
    setEmail: (email: string) => void
}

const useAuthStore = create<AuthState>()(
    devtools(
        (set) => ({
            email: "",
            setEmail: (email: string) => set({ email }, false, 'setEmail'),
        }),
        {
            name: 'auth-store',
            store: "auth"
        }
    )
)

export default useAuthStore
