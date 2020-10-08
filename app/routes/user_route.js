const express = require('express');
const router = express.Router();
const controller = require('../controller/user_controller');

router.get('/', controller.list);
router.post('/', controller.add);
router.post('/auth', controller.validateUser);
router.get('/search', controller.searchUser);
router.get('/:id', controller.findUserById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;