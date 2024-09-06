const mysql = require("mysql2/promise");
const redis = require("redis");
const client = redis.createClient({
    url: 'redis://localhost:6379'
  });
client.connect().catch(console.error);

async function main (userId) {
    async function connectDatabase() {
        return mysql.createPool({
            connectionLimit : 10,
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'swp'
        });
    }
    async function createUser(userId, firstname, money) { 
        const result = await client.multi()
            .hSet('userData:'+userId, 'userId', userId)
            .hSet('userData:'+userId, 'firstname', firstname)
            .hSet('userData:'+userId, 'money', money)
            //.expire('userData:'+userId, 100)
            .exec();
        console.log(result);
        return result;
    }
    
    // get connection for transaction database
    const pool = await connectDatabase();
    // const connection = await pool.getConnection();
    // const [results, fields] = await connection.query("SELECT * FROM users");
    // console.log(results[0])
    // connection.release();
    
    let userData = {};
    if ( !(await client.exists('userData:'+userId)) ) {
        let [results, fields] = await pool.query("SELECT * FROM users WHERE id = ?",[userId]);
        if (results.length > 0 && results[0]) {
            await createUser(results[0]['id'], results[0]['firstname'], results[0]['money']);
            userData = {
                userId: results[0]['id'],
                firstname: results[0]['firstname'],
                money: results[0]['money']
            };
            console.log("From MySQL: ",userData);
        } else {
            console.error("user not found!");
        }
    } else {
        userData = await client.hGetAll('userData:'+userId);
        console.log("From Redis: ",userData);
    }
    
    // use userData for whatever you want
    await client.disconnect();
}

const commandLineParam = process.argv[2] || 13;
main(commandLineParam);
