import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import OpenAI from 'openai';
import openAiRoutes from './routes/openai.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true  }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/** OPENAI CONFIGURATION */
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/** ROUTES */
app.use('/openai', openAiRoutes);

/**SERVER SETUP */
const PORT = process.env.PORT  || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
