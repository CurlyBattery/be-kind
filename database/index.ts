import {SQLiteDatabase} from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 2;

    const result = await db.getFirstAsync<{ user_version: number }>(
        'PRAGMA user_version'
    );
    let currentDbVersion = result?.user_version ?? 0;

    if (currentDbVersion >= DATABASE_VERSION) {
        return;
    }

    if (currentDbVersion === 0) {
        await db.execAsync(`
            PRAGMA journal_mode='wal';
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,  
                role TEXT NOT NULL CHECK(role IN ('SEEKER', 'HELPER')) DEFAULT 'SEEKER',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
        `);
        currentDbVersion = 1;
    }

    if (currentDbVersion === 1) {
        await db.execAsync(`
            ALTER TABLE users ADD COLUMN password TEXT NOT NULL;
        `);
        currentDbVersion = 2;
    }

    await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
}