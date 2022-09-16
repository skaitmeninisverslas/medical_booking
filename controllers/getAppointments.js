const Appointment = require("../database/models/appointment");

module.exports = async (req, res) => {
  const appointments = await Appointment.find({});

  return res.status(200).json({
    appointments,
  });
};
