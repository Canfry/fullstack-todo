import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

dotenv.config();

app.use(cors());

const port = process.env.PORT || 5500;

app.get('/', (req, res) => {
  res.send('Hello from server');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
