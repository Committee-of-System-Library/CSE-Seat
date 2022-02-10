
const getTodayDate = () => {
    today = new Date();
    if (today.getHours() < 6){
        today.setDate(today.getDate() -1);
    }
    year = today.getFullYear();
    month = ('0'+(today.getMonth()+1)).slice(-2);
    day = ('0'+today.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
}

const getTomorrowDate = () => {
    today = new Date();
    today.setDate(today.getDate()+1)
    if (today.getHours() < 6){
        today.setDate(today.getDate() -1);
    }
    year = today.getFullYear();
    month = ('0'+(today.getMonth()+1)).slice(-2);
    day = ('0'+(today.getDate())).slice(-2);
    return year + '-' + month + '-' + day;
}

const getNowTime = () => {
    today = new Date();
    year = today.getFullYear();
    month = ('0'+(today.getMonth()+1)).slice(-2);
    day = ('0'+today.getDate()).slice(-2);
    hours = ('0'+today.getHours()).slice(-2);
    minutes = ('0'+today.getMinutes()).slice(-2);
    seconds = ('0'+today.getSeconds()).slice(-2);
    return year + '-' + month + '-' + day + ' ' +  hours + ':' + minutes + ':' + seconds;
}

module.exports = {
    getTodayDate : getTodayDate,
    getTomorrowDate : getTomorrowDate,
    getNowTime : getNowTime
}