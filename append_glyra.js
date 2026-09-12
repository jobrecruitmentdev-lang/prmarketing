const fs = require('fs');
const row = '"Glyra Health Care Pvt Ltd","+91-9727720767","Healthcare/Manufacturing","N/A","I noticed your domain glyrahealthcare.com is returning a 403 Forbidden error and is completely blocked from public access. For a healthcare manufacturer operating since 2018, this means you are actively losing direct B2B search traffic. Are you looking to fix this server issue and capture that lost revenue?","URL: https://glyrahealthcare.com/ | Status: 403 Forbidden | CIN: U51909GJ2018PTC100558","","",""\n';
fs.appendFileSync('master_leads_clean.csv', row);
console.log("Appended.");
