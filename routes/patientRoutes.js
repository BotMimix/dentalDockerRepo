const express = require('express');

const patientController = require('../controllers/patientController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// the default URL localhost:3000/
router.route('/')
  .get(protect, patientController.getAllPatients)
  .post(protect, patientController.createPatient);

// the specific URL when using getById localhost:3000/:id
router.route('/:id')
  .get(protect, patientController.getOnePatient)
  .patch(protect, patientController.updatePatient)
  .delete(protect, patientController.deletePatient);

module.exports = router;