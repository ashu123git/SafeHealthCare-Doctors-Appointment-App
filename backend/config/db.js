const mongoose = require("mongoose");
const colors = require("colors");

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    // mongoose.connection.host will show whether the code is running on localhost or any other host.
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    // .bgRed.white means whatever error will come it will come with red background and white text.
    // This was possible only because of line 2.
    console.log(`Mongo server error ${error}`.bgRed.white);
  }
};

module.exports = mongoDBConnection;
