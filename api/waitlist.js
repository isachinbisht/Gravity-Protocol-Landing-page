export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    data.timestamp = new Date().toISOString();
    
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    
    if (!scriptUrl) {
      console.error('GOOGLE_SCRIPT_URL environment variable is missing.');
      return res.status(500).json({ 
        success: false, 
        error: 'GOOGLE_SCRIPT_URL environment variable is not configured on Vercel.' 
      });
    }

    try {
      const googleRes = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!googleRes.ok) {
        const text = await googleRes.text();
        console.error('Failed to forward to Google Sheets:', googleRes.statusText, text);
        return res.status(500).json({ 
          success: false, 
          error: `Google Sheets API responded with status ${googleRes.status}: ${googleRes.statusText}` 
        });
      }

      // Check if Apps Script returned an error in the response body (some scripts return 200 but contain error messages)
      const result = await googleRes.json();
      if (result.status === 'error' || result.success === false) {
        console.error('Google Sheets Script returned error status:', result);
        return res.status(500).json({ 
          success: false, 
          error: result.message || 'Google Sheets Script returned an error status' 
        });
      }

      return res.status(200).json({ success: true, googleResult: result });
    } catch (fetchErr) {
      console.error('Error contacting Google Apps Script:', fetchErr);
      return res.status(500).json({ 
        success: false, 
        error: `Failed to contact Google Apps Script: ${fetchErr.message}` 
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: `Internal Server Error: ${error.message}` });
  }
}
