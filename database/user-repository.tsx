import {SQLiteDatabase} from "expo-sqlite";

import {IUser, UserRole} from "@/types/user";

class UserRepository {
    async createUser(db: SQLiteDatabase, name: string, email: string, password: string, role: UserRole): Promise<number> {
        try {
            const result = await db.runAsync(
                `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
                [name, email, password, role],
            );
            return result.lastInsertRowId;
        } catch(e) {
            console.error('Ошибка записи пользователя в бд', e);
            throw e;
        }
    }

    getUserById(db: SQLiteDatabase, id: number) {
        const result = db.getFirstAsync<IUser>(
            `SELECT * FROM users WHERE id = ?;`,
            [id]
        );
        return result ?? null;
    }

    getUserByEmail(db: SQLiteDatabase, email: string) {
        const result = db.getFirstAsync<IUser>(
            `SELECT * FROM users WHERE email = ?;`,
            [email]
        );
        return result ?? null;
    }
}

export const userRepository = new UserRepository();