const redis = require("redis");
const bluebird = require("bluebird");
const mysql = require("mysql2/promise");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

async function main (userId) {
    async function connectDatabase() {
        return mysql.createPool({
            connectionLimit : 10,
            host : 'localhost',
            user : 'root',
            password : '',
            database : 'codecamp'
        });
    }
    async function createUser(userId, firstname, money) {
        return client.hmsetAsync('userData:'+userId,
        {
            'userId': userId,
            'firstname': firstname,
            'money': money
        });
    }
    
    // get connection for transaction database
    const pool = await connectDatabase();
    // const connection = await pool.getConnection();
    // const [results, fields] = await connection.query("SELECT * FROM users");
    // console.log(results[0])
    // connection.release();
    
    let userData = {};
    if ( !(await client.existsAsync('userData:'+userId)) ) {
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
        userData = await client.hgetallAsync('userData:'+userId);
        console.log("From Redis: ",userData);
    }
    
    // use userData for whatever you want
}

const commandLineParam = process.argv[2] || 13;
main(commandLineParam);