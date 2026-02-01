import {SQLiteDatabase} from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
    const DATABASE_VERSION = 4;

    await db.execAsync('PRAGMA foreign_keys=ON;');

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
            PRAGMA foreign_keys=ON;
            
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

    if (currentDbVersion === 2) {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS help_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                status TEXT NOT NULL CHECK(status IN ('ACTIVE', 'HELPED')) DEFAULT 'ACTIVE',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                );
        `);
        currentDbVersion = 3;
    }

    if (currentDbVersion === 3) {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS donations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                help_request_id INTEGER NOT NULL,
                helper_user_id INTEGER NOT NULL,
                seeker_user_id INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (help_request_id) REFERENCES help_requests(id) ON DELETE CASCADE,
                FOREIGN KEY (helper_user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (seeker_user_id) REFERENCES users(id) ON DELETE CASCADE
                );
        `);
        currentDbVersion = 4;
    }

    await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
}