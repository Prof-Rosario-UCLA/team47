import mysql from 'mysql2';
import { config } from 'dotenv'; config({ path: '../.env' });

export const mysql_db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    multipleStatements: false
});

mysql_db.do = (query, values) => {
    return new Promise((resolve, reject) => {
        db.query(query, values, (err, results) => {
            if (err) return reject(err);
            else resolve(results);
        })
    });
}

mysql_db.getOne = async (query, values) => {
    const d = await db.do(query, values);
    if (d.length === 1) return d[0];
    return null;
}

mysql_db.insert = async (query, values) => {
    return (await db.do(query, values)).insertId;
}