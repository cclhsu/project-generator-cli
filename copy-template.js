const fs = require('fs-extra');

// Function to copy the template directory to dist
async function copyTemplateToDist() {
  try {
    // Source directory path
    const srcPath = 'src/template';
    // Destination directory path
    const distPath = 'dist/template';

    // Perform the copy operation
    await fs.copy(srcPath, distPath);

    console.log('Template directory copied to dist successfully.');
  } catch (err) {
    console.error('Error copying template directory:', err);
  }
}

// Call the function to perform the copy operation
copyTemplateToDist();

// npm install fs-extra
