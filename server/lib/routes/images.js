const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Image = require('../models/image');

router
  .get('/', (req, res, next) => {
    const query = {};

    Image.find(query)
      .select('title description link')
      .lean()
      .then(images => res.send(images))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Image.findById(req.params.id)
      .select('title description link')
      .lean()
      .then(image => res.send(image))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Image.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
    Image.findByIdAndUpdate(req.params.id, req.body)
      .them(saved => res.send(saved))
      .catch(next);
  });

module.exports = router;
