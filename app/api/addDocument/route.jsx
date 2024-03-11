export default async function handler(req, res) {
    if (req.method === 'POST') {
      const data = req.body;
      // Process the data as needed, e.g., save it to a database
      console.log(data);
      res.status(200).json({ message: 'Data received successfully!' });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }