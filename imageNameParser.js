
const imageNameMap = loadJsonFile('Files/imageList.json');

// imageNameParser.js
function getValueFromImageName(imageName, key) {
    // Replacing the '=' and '&' separators appropriately for URLSearchParams
    const params = new URLSearchParams(imageName);

    // Retrieve the value for the given key
    const value = params.get(key);

    // Return the value or a message if the key is not found
    return value ? value : `Key "${key}" not found`;
}

// Function to sort images by a given key (e.g., "name", "rating", etc.)
function sortImagesByKey(imagePaths, key) {
    return imagePaths.sort((a, b) => {
        // Extract the values for the given key from both image names
        const valueA = getValueFromImageName(a, key);
        const valueB = getValueFromImageName(b, key);

        // Compare the values for sorting (numerically or alphabetically)
        if (!isNaN(valueA) && !isNaN(valueB)) {
            // If both values are numbers, compare them numerically
            return parseFloat(valueA) - parseFloat(valueB);
        } else {
            // Otherwise, compare them as strings (alphabetically)
            return valueA.localeCompare(valueB);
        }
    });
}

// Load JSON file
function loadJsonFile(filePath) {
    return fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load JSON file');
            }
            return response.json();
        });
}

// Get images using the path look-up map JSON file
function getImages(season, cardType) {
    const key = `${season}/${cardType}`; // Create key from selected season and card type
    const srcList = []; // Initialize an array to store the image src paths

    // Load the JSON file containing image paths
    const imagePaths = imageNameMap[key]; // Get image paths from JSON based on the key
    console.log(`Image Paths found: `, imagePaths);

    if (imagePaths && imagePaths.length > 0) {
        imagePaths.forEach((imagePath) => {
            const src = `Files/CardArchive/${key}/${imagePath}`; // Create the src string for each image
            srcList.push(src); // Add the src string to the list
        });

        return srcList; // Return the list of image src strings
    } else {
        console.error(`No images found for ${key} using JSON file lookup:\n`, imageNameMap);
        return []; // Return an empty array if no images are found
    }
}