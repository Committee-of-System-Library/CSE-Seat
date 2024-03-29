const db = require('./mysql');
const date = require('../services/date');

module.exports = {
    checkMySeat : async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "select * from reservation Where building_id = ? and seat_room = ? "
        + "and seat_num = ? and part = ? and date = ? and user_sid = ?";
        let set  = [
            seatDTO.building_id,
            seatDTO.seat_room,
            seatDTO.seat_num,
            seatDTO.part,
            seatDTO.date,
            seatDTO.user_sid
        ]
        let result = await db.query(sql,set);
        if (!result) return reject(Error('데이터베이스 오류'));
        else if (result.length == 1) return resolve(result[0]);
        else if (result.length == 0) return resolve(false);
        else return reject(new Error('database PK error'));
    }),
    exist : async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "select * from reservation Where building_id = ? and seat_room = ? "
        + "and seat_num = ? and part = ? and date = ?";
        let set  = [
            seatDTO.building_id,
            seatDTO.seat_room,
            seatDTO.seat_num,
            seatDTO.part,
            seatDTO.date,
        ]
        let result = await db.query(sql,set);
        if (!result) return reject(Error('reservation findList error'));
        else if (result.length == 1) return resolve(result[0]);
        else if (result.length == 0) return resolve(false);
        else return reject(new Error('database PK error'));
    }),
    existInDate : async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "select * from reservation Where user_sid = ? and date = ? and part = ?";
        let set  = [
            seatDTO.user_sid,
            seatDTO.date,
            seatDTO.part
        ]
        let result = await db.query(sql,set);
        if (!result) return reject(Error('reservation error'));
        else if (result.length == 1 || result.length == 2) return resolve(result[0]);
        else if (result.length == 0) return resolve(false);
        else return reject(new Error('database PK error'));
    }),
    
    apply : async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "INSERT INTO reservation_apply SET ?"
        let set = {
            user_sid : seatDTO.user_sid,
            apply_time : seatDTO.apply_time,
            want_building_id : seatDTO.building_id,
            
            want_seat_num : seatDTO.seat_num,
            reservation_date : seatDTO.date,
            part1 : seatDTO.part1,
            part2 : seatDTO.part2,
        }
        let result = await db.query(sql,set);
        if (!result || result.affectedRows == 0)
            return reject(new Error('reservation application Pk error'));
        let insertId = result.insertId;
        for (const i in seatDTO.seat_room){
            sql = "INSERT INTO want_rooms SET ?";
            set = {
                apply_id : insertId,
                seat_room : seatDTO.seat_room[i],
            }
            result = await db.query(sql,set);
            if (!result || result.affectedRows == 0)
                return reject(new Error('want_rooms Pk error'));
        }
        for (const i in seatDTO.friends){
            sql = "INSERT INTO friend_request SET ?";
            set = {
                apply_id : insertId,
                friend_sid : seatDTO.friends[i],
            }
            result = await db.query(sql,set);
            if (!result || result.affectedRows == 0)
                return reject(new Error('friend request Pk error'));
        }
        return resolve(insertId);
    }),
    reserve: async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "INSERT INTO reservation SET ?"
        set = {
            user_sid : seatDTO.user_sid,
            building_id : seatDTO.building_id,
            seat_room : seatDTO.seat_room,
            seat_num : seatDTO.seat_num,
            date : seatDTO.date,
            part : seatDTO.part,
            apply_id : seatDTO.apply_id
        }
        let result = await db.query(sql,set);
        if (result && result.affectedRows > 0)
            return resolve(true);
        else{
            console.log(seatDTO);
            return reject(new Error('database PK error'))
        }
            
    }),
    deleteReservation: async (seatDTO) => new Promise( async (resolve, reject) => {
        let sql = "DELETE FROM reservation WHERE building_id = ? and seat_room = ? and seat_num = ? and part = ? and date = ?";

        let result = await db.query(sql,[
            seatDTO.building_id,
            seatDTO.seat_room,
            seatDTO.seat_num,
            seatDTO.part,
            seatDTO.date,
        ]);
        if (result && result.affectedRows > 0)
            return resolve(true);
        else{
            console.log(seatDTO);
            return reject(new Error('database PK error'));
        }
            
    }),
}