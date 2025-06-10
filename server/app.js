// app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './rest/auth.js';
import apiRoutes from './rest/api.js';
import { loadConfig, runningOnAppEngine } from './env.js';

const app = express();
const port = process.env.PORT || 8080;

loadConfig();

app.use(express.json());
if (!runningOnAppEngine()) { app.use(cors({ origin: true, credentials: true })); }
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

// Start server
app.listen(port, () => { console.log(`Server running on port ${port}`); });