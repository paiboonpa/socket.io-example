import { createClient } from 'redis';
import mysql from "mysql2/promise";

const client = createClient({
    url: 'redis://localhost:6379'
  });
client.connect().catch(console.error);

async function main () {
    async function connectDatabase() {
        return mysql.createPool({
            connectionLimit : 10,
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'swp'
        });
    }
    
    // get connection for transaction database
    const pool = await connectDatabase();
    const allKeys = await client.keys('userData:*');
    console.log("***** ALL KEYS *****");
    console.log(allKeys);
    const connection = await pool.getConnection();
    await connection.query("START TRANSACTION");
    for (let i=0; i<allKeys.length; i++) {
        const userData = await client.hGetAll(allKeys[i]);
        console.log(userData)
        await connection.query("UPDATE users SET firstname=?, money=? WHERE id = ?",[userData.firstname, userData.money, userData.userId]);
        console.log("Update user id: " + userData.userId + " with data : " + userData.firstname + " , " + userData.money);
    }
    connection.query('COMMIT');
    
}

main();