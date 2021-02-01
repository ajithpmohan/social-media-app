import mongoose from 'mongoose';

import * as dbConfig from '../config/dbConfig';
import User from './user';
import Profile from './profile';

mongoose.connect(dbConfig.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Account DB connection error:'));

db.once('open', function () {
  console.log.bind(console, 'Account DB connected');
});

export const models = { User, Profile };

export default { db };
