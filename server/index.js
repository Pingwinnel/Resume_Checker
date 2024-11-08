// server.js or app.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const app = express();

// Configure storage
const storage = multer.memoryStorage(); // For MongoDB as binary data
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a Mongoose schema for files
const fileSchema = new mongoose.Schema({
    filename: String,
    contentType: String,
    data: Buffer,
});

const File = mongoose.model('File', fileSchema);

// Route for file upload
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = new File({
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            data: req.file.buffer,
        });
        await file.save();
        res.status(200).send('File uploaded successfully');
    } catch (error) {
        res.status(500).send('Error uploading file');
    }
});

app.listen(5000, () => console.log('Server started on port 5000'));
