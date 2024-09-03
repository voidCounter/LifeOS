export interface JWTTokenType {
    token: string;
    type: string;
    user: {
        id: string;
        email: string;
        name: string;
        knowledgeXp: number;
    },
    expiresIn: string
}