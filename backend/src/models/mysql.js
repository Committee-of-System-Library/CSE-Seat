//if you want to access my DB, contant to chanwooDev / pove2019@gmail.com 
const mysql = require('mysql2/promise');
const DB_key = require(__dirname+'/../config').DB_key;
let pool;

pool = mysql.createPool(DB_key);

pool.getConnection(function(err, conn){  
    if ( err ) 
        throw err;
    else{
        console.log('Database connected successfully');
        conn.release();
    }
});

module.exports = {
    getPool : ()=>{return pool},

    query : async (sql, set) => {
        const connection = await pool.getConnection();
        try {
            const [result, fields] = await connection.query(sql,set);

            await connection.commit();
            connection.release();
            return result;
        } catch (err){
            await connection.rollback();
            connection.release();
            console.log('mysql : ' , err)
            throw err;
        } 
    },
    querys : async (f) => {

        const connection = await pool.getConnection();
        try {
            const connection = await pool.getConnection();
            const result = await f(connection);
            connection.release();
            return result;
        } catch (err){
            await connection.rollback();
            connection.release();
            console.log('mysql : ' , err)
            throw err;
        } 

    }
}