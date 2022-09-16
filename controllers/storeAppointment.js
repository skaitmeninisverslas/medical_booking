const Appointment = require("../database/models/appointment");

module.exports = (req, res) => {
  const appointmentCreate = {
    ...req.body,
  };

  Appointment.create(appointmentCreate, (error, post) => {
    if (!error) {
      res.status(200).send("Appointment created");
    } else {
      res.status(400).send(`An error ocurred ${error}`);
    }
  });
};
