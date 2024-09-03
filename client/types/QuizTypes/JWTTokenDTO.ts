import {User} from "@/types/User";

export interface JWTTOkenDTO {
    token: string;
    type: string;
    expiresIn: string;
    user: User;
}