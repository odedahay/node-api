const express = require('express');
const router = express.Router();
const JobController = require('../controllers/job.controler');

//api/jobs/ GET
router.get('/', JobController.findAll);
router.post('/', JobController.create);


// Define the GET Endpoint
router.get('/:id', JobController.findOne);
router.put('/:id', JobController.update);
router.delete('/:id', JobController.delete);

module.exports = router;
