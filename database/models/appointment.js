const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    date: {
      type: Date,
    },
  },
  { collection: "appointments" }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
