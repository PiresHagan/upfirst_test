import express from 'express';
import { config } from 'dotenv';
import { authorizationRouter } from './routes/authorization';
import { tokenRouter } from './routes/token';

config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/oauth', authorizationRouter);
app.use('/api/oauth', tokenRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 