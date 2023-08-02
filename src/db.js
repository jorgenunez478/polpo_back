import { createPool } from "mysql2/promise";
import {
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
} from "./config.js";

export const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    port: DB_PORT,
    database: "polpo",
});