require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
//app.use(cors({ origin: 'http://localhost:5173' })); // allow React app
app.use(cors());
app.use(express.json()); // parse JSON request bodies


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

// Test route
app.get('/', (req, res) => res.json({ message: 'API is running!' }));

//Vercel serverless doesn't use app.listen.
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));