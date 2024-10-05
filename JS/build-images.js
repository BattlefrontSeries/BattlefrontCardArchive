// build-images.js
const glob = require('glob');
const fs = require('fs');

const season = "BS_Season1"; // Change as necessary
const cardType = "Base"; // Change as necessary
const path = `Files/CardArchive/${season}/${cardType}/*.png`; // Change as necessary

glob(path, (err, files) => {
    if (err) {
        console.error('Error fetching images:', err);
        return;
    }

    const filePaths = files.map(file => file.replace(/\\/g, '/')); // Convert Windows paths to POSIX

    fs.writeFileSync('imageList.json', JSON.stringify(filePaths, null, 2));
    console.log('Image list written to imageList.json');
});
