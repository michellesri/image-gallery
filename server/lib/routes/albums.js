const express = require('express');
const albums = express.Router();
const bodyParser = require('body-parser').json();
const Album = require('../models/album');
const Image = require('../models/image');

albums
  .get('/', (req, res, next) => {
    const query = {};
    Album.find(query)
      .select('name description')
      .lean()
      .then(albums => res.send(albums))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Album.findById(req.params.id)
      .select('name description')
      .lean()
      .then(album => res.send(album))
      .catch(next);
  })

  .get('/:albumId/images', (req, res, next) => {
    Image.find({ album: req.params.albumId })
      .select('title link description album')
      .lean()
      .then(images => res.send(images))
      .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
    new Album(req.body).save()
      .then(savedAlbum => res.send(savedAlbum))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Album.findByIdAndUpdate(req.params.id, req.body, { new: true})
      .then(saved => res.send(saved))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    console.log('delete in albums called');
    Album.findByIdAndRemove(req.params.id)
      .then(deletedAlbum => res.send(deletedAlbum))
      .catch(next);
  });

module.exports = albums;
