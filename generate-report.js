const marge = require("mochawesome-report-generator");
const { merge } = require("mochawesome-merge");
const path = require("path");
const fs = require("fs");

async function generateReport() {
  try {
    const reportDir = path.join(__dirname, "cypress", "reports", "mochawesome");

    // Pakai forward slash biar glob match
    const jsonReport = await merge({
      files: [`${reportDir.replace(/\\/g, "/")}/*.json`],
    });

    const mergedJsonPath = path.join(reportDir, "report.json");
    fs.writeFileSync(mergedJsonPath, JSON.stringify(jsonReport, null, 2));

    console.log("✅ Report JSON merged at:", mergedJsonPath);

    await marge.create(jsonReport, {
      reportDir: reportDir,
      reportFilename: "report",
      charts: true,
      overwrite: true,
      inline: true,
    });

    console.log("✅ HTML report generated at:", path.join(reportDir, "report.html"));
  } catch (err) {
    console.error("❌ Failed to generate report", err);
    process.exit(1);
  }
}

generateReport();
