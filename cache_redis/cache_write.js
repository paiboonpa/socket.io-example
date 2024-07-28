const redis = require("redis");
const mysql = require("mysql2/promise");
const client = redis.createClient({
    url: 'redis://localhost:6378'
  });
client.connect().catch(console.error);

async function main () {
    async function connectDatabase() {
        return mysql.createPool({
            connectionLimit : 10,
            host : 'localhost',
            user : 'admin',
            password : '11k3XsnUCQgV',
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