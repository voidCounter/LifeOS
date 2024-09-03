export interface User {
    userId: string;          // UUID
    name: string;         // Username of the user
    username: string;
    knowledgeXp?: number;    // Knowledge XP, can be null
    email:string;
    avatarUrl: string | null;
}
