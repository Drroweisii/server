import mongoose from 'mongoose';

export class TestController {
  async apiTest(req, res) {
    try {
      res.json({ message: 'API is working!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async mongoWrite(req, res) {
    try {
      const testCollection = mongoose.connection.collection('test');
      await testCollection.insertOne({ 
        test: true, 
        timestamp: new Date(),
        ...req.body 
      });
      res.json({ message: 'MongoDB write successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async mongoRead(req, res) {
    try {
      const testCollection = mongoose.connection.collection('test');
      const results = await testCollection.find().toArray();
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}