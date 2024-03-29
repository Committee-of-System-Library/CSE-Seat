let db = require('./mysql');

module.exports = {
    findById : async (sid) => new Promise( async (resolve, reject) => {
        let sql = "select * from user where sid = ?"
        let result = await db.query(sql,[sid]);
        if (result.length > 0)
            return resolve(result[0]);
        else if(result.length == 0)
            return resolve(false);
        return reject(new Error('database error.'));
    }),
    findByEmail : async (sid) => new Promise( async (resolve, reject) => {
        let sql = "select * from user where email = ?"
        let result = await db.query(sql,[sid]);
        if (result.length > 0)
            return resolve(result[0]);
        else if(result.length == 0)
            return resolve(false);
        return reject(new Error('database error.'));
    }),
    insert : async(userDTO) => {
        try {
            let sql = "INSERT INTO user SET ?"
            set = {
                sid : userDTO.sid,
                name : userDTO.name,
                password : userDTO.password,
                password_salt : userDTO.password_salt,
                email : userDTO.email
            }
            let result = await db.query(sql,set);
            if (result && result.affectedRows > 0)
                return true;
            else
                throw Error('fail to insert')
        } catch(e){
            console.log(e);
            return false;
        }
        
    }
}