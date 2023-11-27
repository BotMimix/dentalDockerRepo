const Patient = require('../models/patientModel');

// Retrieving all patients
exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();

    res.status(200).json({
      status: 'succes',
      results: patients.length,
      data: {
        patients
      }
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail'
    });
  }
};

// Retrieving individual patients
  // let the user go to localhost:3000/patients/:id to retrieve patient with whatever :id
exports.getOnePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);

    res.status(200).json({
      status: 'succes',
      data: {
        patient
      }
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail'
    });
  }
};

// Creating patient
exports.createPatient = async (req, res, next) => {
  try {
    const patient = await Patient.create(req.body);

    res.status(200).json({
      status: 'succes',
      data: {
        patient
      }
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 'fail'
    });
  }
};

// Update one patient
exports.updatePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'succes',
      data: {
        patient
      }
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail'
    });
  }
};

// Delete one patient
exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'succes',
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail'
    });
  }
};