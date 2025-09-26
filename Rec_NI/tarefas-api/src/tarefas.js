const express = require('express');
const router = express.Router();
const ctrl = require('./tarefasController');

router.post('/', ctrl.createTask);
router.get('/', ctrl.listTasks);
router.get('/:id', ctrl.getTask);
router.put('/:id', ctrl.updateTask);
router.delete('/:id', ctrl.deleteTask);

module.exports = router;
