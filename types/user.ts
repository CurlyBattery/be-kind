export interface IUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}

export enum UserRole {
    SEEKER = 'SEEKER',
    HELPER = 'HELPER',
}