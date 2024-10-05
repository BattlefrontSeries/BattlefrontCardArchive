const express = require('express');
const path = require('path');
const glob = require('glob');

const app = express();
const port = 3000;

// Serve static files from the Files directory
app.use('/Files', express.static(path.join(__dirname, 'Files')));

// API endpoint to list PNG images
app.get('/api/images', (req, res) => {
    const { season, cardType } = req.query;

    const pattern = path.join(__dirname, 'Files', 'CardArchive', season, cardType, '*.png');
    
    // Use glob to find PNG files
    glob(pattern, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }

        // Map file paths to relative URLs
        const images = files.map(file => `/Files/CardArchive/${season}/${cardType}/${path.basename(file)}`);
        res.json(images);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
