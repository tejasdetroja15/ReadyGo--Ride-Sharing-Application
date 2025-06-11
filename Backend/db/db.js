const mongoose = require('mongoose');

function connctToDb(){
    mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to MongoDB successfully");
    }).catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit if cannot connect to database
    });
}

module.exports = connctToDb;

