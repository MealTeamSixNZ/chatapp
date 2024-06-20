import IUserService from "./IUserService";
import User from "./User";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";

class DBUserService implements IUserService {
    private db:Database<sqlite3.Database, sqlite3.Statement>
    constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
        this.db = db
        }
        async setup() {
            await this.db.exec(
            `CREATE TABLE IF NOT EXISTS users (
                name TEXT NOT NULL UNIQUE COLLATE NOCASE, 
                password TEXT NOT NULL, 
                user_ID INTEGER NOT NULL UNIQUE, 
                PRIMARY KEY("user_id" AUTOINCREMENT)
            )`)
        }
    async create(name: string, password: string): Promise<User> {
        const sql = `INSERT into users (name, password) VALUES (?, ?)`
        await this.db.run(sql, name, password)
        return this.findByName(name)
    }
    async find(userID: number): Promise<User> {
        const sql = `SELECT user_ID, name, password FROM users WHERE user_ID = ?` 
        const result = await this.db.get(sql, userID)
        return {
            id:result.user_ID, name:result.name, password:result.password
        }
    }
    async findByName(name: string): Promise<User> {
        const sql = `SELECT user_ID, name, password FROM users WHERE name = ?`
        const result = await this.db.get(sql, name)
        return {
            id:result.user_ID, name:result.name, password:result.password
        }
    }
    async exists(userID: number): Promise<boolean> {
        const sql = `SELECT 1 FROM users WHERE user_ID = ?`
        const result = await this.db.get(sql, userID)
        return result != undefined
    }
    async delete(userID: number): Promise<void> {
        const sql = `DELETE FROM users WHERE user_ID = ?`
        await this.db.run(sql, userID)
    }
}
export default DBUserService