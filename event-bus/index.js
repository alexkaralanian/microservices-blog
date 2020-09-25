const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);
  axios.post('http://localhost:4000/events', req.body);
  axios.post('http://localhost:4001/events', req.body);
  axios.post('http://localhost:4002/events', req.body);

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen('4005', () => {
  console.log('EVENT BUS LISTENING ON 4005');
});
