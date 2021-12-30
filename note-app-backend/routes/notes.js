const express = require('express');
const router = express.Router();
const uid = require('uid2');
const { remove, findIndex } = require('lodash');

const list = [];

router.post('/new', (req, res) => {
  console.log(req.body);
  const id = uid(10);
  const newNote = {
    id,
    data: req.body.data
  };
  // console.log(newNote);
  list.push(newNote);
  res.json(newNote);
});

router.get('/', function (req, res, next) {
  res.send(list);
});

router.delete('/:id', function (req, res, next) {
  console.log(req.params.id);
  remove(list, (item) => item.id === req.params.id);
  res.send(list);
});

router.put('/:id', function (req, res, next) {
  const id = req.params.id;
  const data = req.body.data;
  const index = findIndex(list, { id });
  list.splice(index, 1, { id, data });

  res.send({ id, data });
});

module.exports = router;
