require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Database connection

// Import route files
const adminRoutes = require('./routes/adminRoutes');
const residentRoutes = require('./routes/residentRoutes');
const securityRoutes = require('./routes/securityRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Enable JSON body parsing
app.use(cors()); // Enable CORS for frontend communication

// Connect to MongoDB
connectDB();

// ✅ Use routes correctly (MAKE SURE THESE ARE NOT UNDEFINED)
app.use('/api/admin', adminRoutes);
app.use('/api/resident', residentRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/visitor', visitorRoutes);
app.use('/api/auth', authRoutes);


// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
