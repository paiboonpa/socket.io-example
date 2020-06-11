const redis = require("redis");
const bluebird = require("bluebird");
const mysql = require("mysql2/promise");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

async function main () {
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
    const allKeys = await client.keysAsync('userData:*');
    console.log("***** ALL KEYS *****");
    console.log(allKeys);
    for (let i=0; i<allKeys.length; i++) {
        const userData = await client.hgetallAsync(allKeys[i]);
        console.log(userData)
        await pool.query("UPDATE users SET firstname=?, money=? WHERE id = ?",[userData.firstname, userData.money, userData.userId]);
        console.log("Update user id: " + userData.userId + " with data : " + userData.firstname + " , " + userData.money);
    }
    
}

main();