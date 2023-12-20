import mongoose from 'mongoose';

require('dotenv').config();

class Connection {
  constructor() {
    const url = process.env.MONGODB_URI || 'database url';
    console.log('Establish new connection with url', url);
    mongoose.Promise = global.Promise;
    mongoose.set('strictQuery', false);
    mongoose.connect(url);
  }
}

export default new Connection();
