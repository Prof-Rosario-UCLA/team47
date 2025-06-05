// app.js
import express from 'express';
import cors from 'cors';

import authRoutes from './rest/auth.js';
import apiRoutes from './rest/api.js';

const app = express();
const port = 6000;

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});