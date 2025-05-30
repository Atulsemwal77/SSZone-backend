const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Your application successfully connected to the database.'))
    .catch((err) => {
      console.log(err);
      console.log('Your application failed to connect to the database.');
      process.exit(1);
    })
}