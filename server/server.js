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
    try {
        if (!supabase) throw new Error('SUPABASE_URL or SUPABASE_KEY is missing');
        
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'No token provided' });

        const { data: { user }, error } = await supabase.auth.getUser(token);
        
        if (error || !user) {
            console.error('Auth error for token:', token ? token.substring(0, 10) + '...' : 'none', error);
            return res.status(401).json({ 
                error: 'Unauthorized', 
                message: error?.message || 'User not found in Supabase',
                code: error?.code,
                status: error?.status
            });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Routes
const plantRoutes = require('./routes/plants')(supabase, verifyToken);
app.use('/api/plants', plantRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        hasSupabase: !!supabase,
        env: process.env.NODE_ENV
    });
});

// Debug env (safe)
app.get('/api/debug-env', (req, res) => {
    res.json({
        node_env: process.env.NODE_ENV,
        has_url: !!process.env.SUPABASE_URL,
        has_key: !!process.env.SUPABASE_KEY,
        vercel: !!process.env.VERCEL,
        url_start: process.env.SUPABASE_URL ? process.env.SUPABASE_URL.substring(0, 15) : 'none',
        key_start: process.env.SUPABASE_KEY ? process.env.SUPABASE_KEY.substring(0, 10) : 'none',
        key_length: process.env.SUPABASE_KEY ? process.env.SUPABASE_KEY.length : 0
    });
});

// Production serving
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err);
    res.status(500).json({ 
        error: err.message || 'Internal Server Error',
        details: typeof err === 'object' ? JSON.stringify(err) : err
    });
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;
