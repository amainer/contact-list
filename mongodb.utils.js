const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {
  createEventListeners,
  connect,
  disconnect
};

function createEventListeners() {
  mongoose.connection.on('connected', () => {
    console.log('Successfully connected to database.');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Database connection closed.');
  });

  mongoose.connection.on('error', (err) => {
    console.log(`There was an issue connecting to the database: ${err}`);
  });
}

function connect() {
  const uri = `mongodb://contactlistuser:password@ds129146.mlab.com:29146/contact-list`
  mongoose.connect(uri, { useMongoClient: true });
}

function disconnect() {
  mongoose.disconnect();
}
