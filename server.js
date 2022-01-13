import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandleMiddleware from './middleware/error-handler.js';
import authRouter from './routers/authRoutes.js';
import jobsRouter from './routers/jobsRoutes.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db/connect.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// external middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// express middleware
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

// custom middleware
app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server listening on port ${port}!`);
    });
  } catch (error) {
    console.log(error.errors);
  }
};

start();
