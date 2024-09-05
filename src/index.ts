import express from 'express';
import dotenv from "dotenv";
import { contactRouter } from './routes/contactRoutes';

dotenv.config()
const app = express();

const port = process.env.PORT;
app.use(express.json());
app.use('/v1/api', contactRouter);

app.listen(port, () => {
  return console.log(`App is listening at http://localhost:${port}`);
});