const express = require('express');
const router = express.Router();
const { addTask ,getTasks,removeTask ,editTask} = require('../controllers/taskController');

router.post('/add', addTask);
router.get('/get', getTasks);
// router.post('/remove', login);
router.post('/delete', removeTask);
router.put('/edit', editTask);

module.exports = router;
