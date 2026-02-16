const fs = require("fs");

function logActivity(message) {
  const time = new Date().toLocaleString();
  fs.appendFileSync("activity.log", `${time} - ${message}\n`);
}

module.exports = logActivity;