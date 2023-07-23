// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Replace 'your_connection_string' with your MongoDB connection string
const dbURI = 'mongodb://localhost:27017/studentidentity';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server started on http://localhost:3000');
    });
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));

// Define the data schema and model
const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const Data = mongoose.model('Data', dataSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API to save data
app.post('/save', async (req, res) => {
  try {
    const { name, password } = req.body;
    const newData = new Data({ name, password });
    await newData.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API to retrieve data
app.get('/retrieve', async (req, res) => {
  try {
    const allData = await Data.find({});
    res.json(allData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static files from the 'public' directory
app.use(express.static('public'));
