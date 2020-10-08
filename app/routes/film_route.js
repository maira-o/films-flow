const express = require('express');
const router = express.Router();
const controller = require('../controller/film_controller');

router.get('/', controller.list);
router.post('/', controller.add);
router.get('/search', controller.searchFilm);
router.get('/:id', controller.findFilmById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;