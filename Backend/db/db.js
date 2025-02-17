const mongoose = require('mongoose');

function connctToDb(){
    mongoose.connect(process.env.DB_CONNECT
    ).then(() => {
        console.log("Connected to Db");
    }).catch(err => console.log(err));
}


module.exports = connctToDb;

