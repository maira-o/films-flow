const express = require('express');
const router = express.Router();
const controller = require('../controller/serie_controller');

router.get('/', controller.list);
router.post('/', controller.add);
router.get('/search', controller.searchSerie);
router.get('/:id', controller.findSerieById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;