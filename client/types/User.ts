export interface User {
    userId: string;          // UUID
    username: string;         // Username of the user
    knowledgeXp?: number;    // Knowledge XP, can be null
    password: string;         // Password of the user
    avatarURL: string | null;
}
