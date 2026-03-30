const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer memory storage (we will upload direct to Supabase)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = (supabase, verifyToken) => {
    // Get all plants
    router.get('/', async (req, res) => {
        const { data, error } = await supabase
            .from('plants')
            .select('*')
            .order('id', { ascending: false });

        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    });

    // Get single plant
    router.get('/:id', async (req, res) => {
        const { data, error } = await supabase
            .from('plants')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error) return res.status(500).json({ error: error.message });
        res.json(data);
    });

    // Add/Update helper for file upload
    const uploadImage = async (file) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        const { data, error } = await supabase.storage
            .from('plant-images')
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
                upsert: true
            });

        if (error) throw error;
        
        // Get public URL
        const res = supabase.storage
            .from('plant-images')
            .getPublicUrl(fileName);
            
        return res.data?.publicUrl || '';
    };

    // Add new plant
    router.post('/', verifyToken, upload.single('image'), async (req, res) => {
        try {
            const { name, price, description } = req.body;
            let imageUrl = null;

            if (req.file) {
                imageUrl = await uploadImage(req.file);
            }

            const { data, error } = await supabase
                .from('plants')
                .insert([{ name, price: parseInt(price), description, image: imageUrl }])
                .select();

            if (error) throw error;
            res.status(201).json(data[0]);
        } catch (error) {
            console.error('Operation error:', error);
            res.status(500).json({ error: error.message || error });
        }
    });

    // Update plant
    router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
        try {
            const { name, price, description } = req.body;
            const updateData = { name, price: parseInt(price), description };

            if (req.file) {
                updateData.image = await uploadImage(req.file);
            }

            const { data, error } = await supabase
                .from('plants')
                .update(updateData)
                .eq('id', req.params.id)
                .select();

            if (error) throw error;
            res.json(data[0]);
        } catch (error) {
            console.error('Operation error:', error);
            res.status(500).json({ error: error.message || error });
        }
    });

    // Delete plant
    router.delete('/:id', verifyToken, async (req, res) => {
        try {
            const { error } = await supabase
                .from('plants')
                .delete()
                .eq('id', req.params.id);

            if (error) throw error;
            res.json({ message: 'Deleted successfully' });
        } catch (error) {
            console.error('Operation error:', error);
            res.status(500).json({ error: error.message || error });
        }
    });

    return router;
};
