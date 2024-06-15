const fs = require('fs');
const path = require('path');

function getLocalFile(filePath) {
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error('Error accessing the path:', err.message);
            return;
        }

        if (stats.isDirectory()) {
            // Path is a directory, search for metadata.json
            const metadataPath = path.join(filePath, 'metadata.json');
            fs.access(metadataPath, fs.constants.F_OK, (err) => {
                if (err) {
                    console.error('metadata.json not found in the directory.');
                } else {
                    console.log('metadata.json found in the directory.');
                }
            });
        } else if (stats.isFile()) {
            // Path is a file, check if it is an MP4 file
            if (path.extname(filePath).toLowerCase() === '.mp4') {
                console.log('MP4 file found.');
            } else {
                console.error('The file is not an MP4 file.');
            }
        } else {
            console.error('The path is neither a file nor a directory.');
        }
    });
}

// Example usage:
getLocalFile('/home/ocd/Documents/animark/src/');
