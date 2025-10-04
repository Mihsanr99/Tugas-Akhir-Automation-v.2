const fs = require("fs");
const path = require("path");

const reportDir = path.join(__dirname, "cypress", "reports", "mochawesome");

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);

      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
    console.log(`🗑️ Deleted folder: ${folderPath}`);
  } else {
    console.log(`⚠️ Folder not found: ${folderPath}`);
  }
}

// Bersihkan folder report
deleteFolderRecursive(reportDir);
