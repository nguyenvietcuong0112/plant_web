require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase Setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

// Auth Middleware
const verifyToken = async (req, res, next) => {
    if (!supabase) return res.status(500).json({ error: 'Server missing SUPABASE_URL or SUPABASE_KEY environment variables' });
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    req.user = user;
    next();
};

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', supabaseUrl: !!supabaseUrl });
});

// Routes
const plantRoutes = require('./routes/plants')(supabase, verifyToken);
app.use('/api/plants', plantRoutes);

// Serve frontend build in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
}

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log('Supabase client initialized.');
    });
}

module.exports = app;
