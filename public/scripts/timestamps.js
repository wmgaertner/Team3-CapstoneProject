
//Function creates a timestamp
function maketimestamp(now){
    var hours = now.getHours()
    var minutes = now.getMinutes();
    hours = hours % 12;
    hours = hours != 0 ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var ampm = hours >= 12 ? 'PM' : 'AM';
    timestamp = hours.toString() + ':' + minutes.toString() + ' ' + ampm;
    return timestamp;
}





// exports functions/variables 
module.exports = { maketimestamp } 