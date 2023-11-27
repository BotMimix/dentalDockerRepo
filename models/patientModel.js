const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, "Add your first name"],
  },
  lastName: {
    type: String,
    require: [true, "Add your surname"],
  },
  dateOfBirth: {
    type: Date,
    require: [true, "Add your date of birth"],
    // validate: {
    //   validator: function (value) {
    //     // Assuming date format is DD-MM-YYYY
    //     const regex = /^\d{2}-\d{2}-\d{4}$/;
    //     return regex.test(value);
    //   },
    //   message: "Date of birth must be in DD-MM-YYYY format"
    // },
  },
  address: {
    type: String,
    require: [true, "Add your address"],
  },
  email: {
    type: String,
    require: [true, "Add an email"],
  },
  phoneNumber: {
    type: String,
    require: [true, "Add a phone number"],
  },
  gender: String,
  maritalStatus: String,
  socialSecurityNumber: {
    type: String,
    require: [true, "Add your social security number"],
  },
  allergies: [String],
  medications: [String],
  medicalHistory: {
    type: String,
    require: [true, "Add your medical history"],
  },
  insuranceProvider: String,
  policyNumber: String,
  emergencyContact: {
    name: String,
    phoneNumber: String,
    relationship: String,
  },
  appointmentHistory: [
    {
      date: Date,
      doctor: String,
      notes: String,
    },
  ],
  financialInformation: {
    billingInfo: String,
    paymentHistory: [String],
  },
});

// Create the model
const Patient = mongoose.model("Patient", patientSchema);

// Export the model
module.exports = Patient;