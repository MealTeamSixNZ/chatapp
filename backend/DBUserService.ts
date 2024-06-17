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
            PRIMARY KEY("user_id" AUTOINCREMENT))`)
        }
    create(name: string, password: string): User {
        throw new Error("Method not implemented.");
    }
    find(userID: number): User {
        throw new Error("Method not implemented.");
    }
    findByName(name: string): User {
        throw new Error("Method not implemented.");
    }
    exists(userID: number): boolean {
        throw new Error("Method not implemented.");
    }
    delete(userID: number): void {
        throw new Error("Method not implemented.");
    }

}
export default DBUserService