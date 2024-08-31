import {User} from "@/types/User";
import {create} from "zustand";
import {JWTTOkenDTO} from "@/types/QuizTypes/JWTTokenDTO";
import {persist} from "zustand/middleware";

interface AuthStore {
    jwtToken: JWTTOkenDTO | null,
    setJwtToken: (jwtToken: JWTTOkenDTO) => void,
    deleteJwtToken: () => void
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            jwtToken: null,
            setJwtToken: (jwtToken: JWTTOkenDTO) => {
                set({jwtToken: jwtToken});
            },
            deleteJwtToken: () => {
                set({jwtToken: null});
            }
        }),
        // TODO: implement a encrypted storage option
        {
            name: "auth-storage"
        }
    ));