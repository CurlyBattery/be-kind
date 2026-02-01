import {SQLiteDatabase} from "expo-sqlite";

import {HelpRequestStatus, IHelpRequest} from "@/types/help-request";
import {IDonation} from "@/types/donation";

class DonationRepository {
    async createDonation(db: SQLiteDatabase, help_request_id: number, seeker_user_id: number, helper_user_id: number): Promise<number> {
        try {
            const result = await db.runAsync(
                `INSERT INTO donations (help_request_id, seeker_user_id, helper_user_id)
                 VALUES (?, ?, ?)`,
                [help_request_id, seeker_user_id, helper_user_id],
            );
            await db.runAsync(
                `UPDATE help_requests SET status = 'HELPED'
                WHERE id = ?`,
                [help_request_id]
            );
            return result.lastInsertRowId;
        } catch (e) {
            console.error('Ошибка записи доната в бд', e);
            throw e;
        }
    }

    getAllDonationByHelperId(db: SQLiteDatabase, helper_user_id: number): Promise<IDonation[]> {
        const result = db.getAllAsync<IDonation>(
            `SELECT 
                d.id,
                d.created_at,
                hr.title as request_title,
                hr.description as request_description,
                u_helper.name as helper_name,
                u_helper.email as helper_email,
                u_seeker.name as seeker_name,
                u_seeker.email as seeker_email
            FROM donations d
            JOIN help_requests hr ON d.help_request_id = hr.id
            JOIN users u_helper ON d.helper_user_id = u_helper.id
            JOIN users u_seeker ON d.seeker_user_id = u_seeker.id
             WHERE helper_user_id = ?
            ORDER BY d.created_at DESC`,
            [helper_user_id]
        );
        return result;
    }

    getAllDonationBySeekerId(db: SQLiteDatabase, seeker_user_id: number): Promise<IDonation[]> {
        const result = db.getAllAsync<IDonation>(
            `SELECT
                 d.id,
                 d.created_at,
                 hr.title as request_title,
                 hr.description as request_description,
                 u_helper.name as helper_name,
                 u_helper.email as helper_email,
                 u_seeker.name as seeker_name,
                 u_seeker.email as seeker_email
             FROM donations d
                 JOIN help_requests hr ON d.help_request_id = hr.id
                 JOIN users u_helper ON d.helper_user_id = u_helper.id
                 JOIN users u_seeker ON d.seeker_user_id = u_seeker.id
             WHERE seeker_user_id = ?
             ORDER BY d.created_at DESC`,
            [seeker_user_id]
        );
        return result;
    }
}

export const donationRepository = new DonationRepository();