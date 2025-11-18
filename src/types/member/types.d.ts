export type MemberStore = {
    username: string;
    setUsername: (newState: string) => void;
    role: 'USER' | 'ADMIN';
}