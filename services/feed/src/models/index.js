import mongoose from 'mongoose';

import * as dbConfig from '../config/dbConfig';
import Post from './post';
import Comment from './comment';

mongoose.connect(dbConfig.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Feed DB connection error:'));

db.once('open', function () {
  console.log.bind(console, 'Feed DB connected');
});

export const models = { Post, Comment };

export default { db };
