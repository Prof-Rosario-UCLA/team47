// app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './rest/auth.js';
import apiRoutes from './rest/api.js';

const app = express();
const port = 1919;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:80', credentials: true }));
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});