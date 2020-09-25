const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const { default: Axios } = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// post storgae
const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  // persist data
  posts[id] = {
    id,
    title,
  };

  // emit to event bus
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('POST EVENT', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log('POSTS SVC LISTENING ON PORT 4000');
});
