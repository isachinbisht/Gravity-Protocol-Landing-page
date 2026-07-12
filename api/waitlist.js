export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    data.timestamp = new Date().toISOString();
    
    // Send to Google Sheets via Apps Script Web App
    // Make sure GOOGLE_SCRIPT_URL is added to Vercel Environment Variables
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    
    if (scriptUrl) {
      try {
        const googleRes = await fetch(scriptUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!googleRes.ok) {
          console.error('Failed to forward to Google Sheets:', googleRes.statusText);
        }
      } catch (fetchErr) {
        console.error('Error contacting Google Apps Script:', fetchErr);
      }
    } else {
      console.warn('GOOGLE_SCRIPT_URL environment variable is missing.');
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to save to waitlist' });
  }
}
