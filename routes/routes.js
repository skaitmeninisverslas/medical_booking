// IMPORTING CONTROLLERS
const storeAppointmentController = require("../controllers/storeAppointment");
const getAppointmentsController = require("../controllers/getAppointments");

module.exports = (app) => {
  app.post("/api/appointment/store", storeAppointmentController);
  app.get("/api/appointments", getAppointmentsController);
};
