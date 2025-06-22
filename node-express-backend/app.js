const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');
const connectDB = require('./config/database');

const app = express();

app.use(cors()); // CORS for cross-origin requests
app.use(express.json()); // Parse JSON bodies

dotenv.config();

// Example route
app.get('/', (req, res) => {
  res.send('Task Tracker API is running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/project', projectRoutes);

module.exports = app;
