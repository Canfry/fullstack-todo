import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import todos from './routes/todosRoutes.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello from server');
});
app.use('/api/todos', todos);

app.listen(port, () => console.log(`Server running on port ${port}`));
