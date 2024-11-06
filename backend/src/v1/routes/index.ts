// index.ts
import express from 'express';
import cors from 'cors';
import UserRouter from './users';
import cookieParser from "cookie-parser"
import { dishRouter } from './dishes';
const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

const PORT = 3000;

app.use('/api/v1/users', UserRouter);
app.use('/api/v1/dishes', dishRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
