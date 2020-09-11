const mongoose = require('mongoose');

const env = require('./environment');

// If you are using local mongodb, uncomment below line
// Connect to db, Make sure mongo is up and running
// mongoose.connect(`mongodb://localhost/${env.local_db}`);

// If you are using mongodb atlas, uncomment below line
// connect to db
mongoose.connect(
  `mongodb+srv://${env.atlas_db_username}:${env.atlas_db_password}@${env.atlas_db_cluster}/${env.atlas_db}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Acquire the connection
const db = mongoose.connection;

// Error
db.on('error', console.error.bind(console, 'Error connecting to db'));

// Up and running
db.once('open', () => {
  console.log('Successfully connected to the database');
});

module.exports = db;
