const fs = require('fs');

async function run() {
  const apifyToken = process.env.APIFY_TOKEN || '';
  const url = `https://api.apify.com/v2/acts/haketa~india-mca-scraper/runs?token=${apifyToken}`;
  const body = JSON.stringify({ 
    cins: ['U47721PB2026PTC068112', 'U47912TN2026PTC189841', 'U46497TS2026PTC215961'],
    maxConcurrency: 3
  });

  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
    const data = await res.json();
    const runId = data.data.id;
    const defaultDatasetId = data.data.defaultDatasetId;
    console.log('Started run:', runId);
    
    let status = 'RUNNING';
    while (status !== 'SUCCEEDED' && status !== 'FAILED') {
      await new Promise(r => setTimeout(r, 2000));
      const statusRes = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${apifyToken}`);
      const statusData = await statusRes.json();
      status = statusData.data.status;
      console.log('Status:', status);
    }
    
    if (status === 'SUCCEEDED') {
      const datasetRes = await fetch(`https://api.apify.com/v2/datasets/${defaultDatasetId}/items?token=${apifyToken}`);
      const datasetData = await datasetRes.json();
      
      let csvContent = "";
      for (const item of datasetData) {
        // Build the personalized pitch
        const companyName = item.companyName;
        const cin = item.cin;
        const email = item.email || "No email";
        const dirs = (item.directors || []).map(d => d.name).join(", ");
        const paidUp = item.paidUpCapital;
        
        const pitch = `As a newly incorporated healthcare company in 2024, ${companyName} has a blank slate to dominate the local digital market. Directors like ${dirs} need to prioritize early digital PR and SEO to outrank legacy clinics and hospitals. Are you looking to aggressively build your online presence?`;
        
        const techSummary = `CIN: ${cin} | Email: ${email} | Paid-Up: ${paidUp} | Status: New Registration`;
        
        // Format as CSV row
        // Company Name,Phone Number,Niche/Category,Rating & Reviews,Personalized Pitch Angle,Tech Audit Summary,Call Status,Time,Comment
        const row = `"${companyName}","","Healthcare/Medical","New Registration","${pitch}","${techSummary}","","",""`;
        csvContent += row + "\n";
      }
      
      fs.appendFileSync('C:\\hk\\prmarketing\\master_leads_clean.csv', csvContent);
      console.log('Appended to CSV successfully!');
    } else {
        console.log('Run failed');
    }
  } catch (err) {
    console.error(err);
  }
}

run();
