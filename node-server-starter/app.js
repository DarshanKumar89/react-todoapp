import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authRouter from './routes/auth';
import taskRouter from './routes/task';
import cors from 'cors';

const app = express();

const dbName = 'test';

const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen({ port: 8081 }, () => {
    // eslint-disable-next-line no-console
    console.log('🚀 Server ready at http://localhost:8081');
  });
});

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(authRouter);
app.use(taskRouter);

mongoose.connect(`mongodb://localhost/${ dbName }`, { useNewUrlParser: true, useUnifiedTopology: true });
