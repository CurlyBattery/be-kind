import {SQLiteDatabase} from "expo-sqlite";

import {HelpRequestStatus, IHelpRequest} from "@/types/help-request";

class HelpRequestRepository {
    async createHelpRequest(db: SQLiteDatabase, title: string, description: string, userId: number): Promise<number> {
        try {
            const result = await db.runAsync(
                `INSERT INTO help_requests (title, description, user_id)
                 VALUES (?, ?, ?)`,
                [title, description, userId],
            );
            return result.lastInsertRowId;
        } catch (e) {
            console.error('Ошибка записи заявки на помощь в бд', e);
            throw e;
        }
    }

    getAllHelpRequests(db: SQLiteDatabase): Promise<IHelpRequest[]> {
        const result = db.getAllAsync<IHelpRequest>(
            `SELECT *
             FROM help_requests;`
        );
        return result;
    }

    getHelpRequestById(db: SQLiteDatabase, helpRequestId: number): Promise<IHelpRequest | null> {
        const result = db.getFirstAsync<IHelpRequest>(
            `SELECT *
             FROM help_requests
             WHERE helpRequestId = ?;`,
            [helpRequestId]
        );
        return result;
    }

    getAllHelpRequestsByUserId(db: SQLiteDatabase, userId: number): Promise<IHelpRequest[]> {
        const result = db.getAllAsync<IHelpRequest>(
            `SELECT *
             FROM help_requests
             WHERE user_id = ?;`,
            [userId]
        );
        return result;
    }
}

export const helpRequestRepository = new HelpRequestRepository();