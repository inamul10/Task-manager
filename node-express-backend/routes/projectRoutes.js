const express = require('express');
const router = express.Router();
const { addProjects ,getProjects,removeProject} = require('../controllers/projectController');

router.post('/add', addProjects);
router.get('/get', getProjects);
// router.post('/remove', login);
router.post('/delete', removeProject);
// router.post('/edit', login);

module.exports = router;
