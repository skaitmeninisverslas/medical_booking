sap.ui.define(
	["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
	function (Controller, JSONModel) {
		"use strict";

		return Controller.extend("sap.ui.demo.todo.controller.App", {
			onInit: function () {
				// create model
				var oModel = new JSONModel();
				fetch("http://localhost:4000/api/appointments")
					.then((data) => data.json())
					.then((item) => {
						const people = item.appointments.map((appointment) => ({
							name: `${appointment.name}`,
							appointments: [
								{
									start: new Date(appointment.date),
									end: new Date(appointment.date),
									title: `${appointment.name}`,
									info: `${appointment.name} ${appointment.surname}`,
									type: "Type02",
									tentative: false,
								},
							],
						}));

						oModel.setData({
							people: people,
						});
						this.getView().setModel(oModel);
					});
			},

			onPress: function () {
				// Calculate current week number
				Date.prototype.getWeek = function () {
					var firsDayOfYear = new Date(this.getFullYear(), 0, 1);
					return Math.ceil(
						((this - firsDayOfYear) / 86400000 +
							firsDayOfYear.getDay() +
							1) /
							7
					);
				};

				const nameFromInput = this.getView()
					.byId("nameInput")
					.getValue();
				const surnameFromInput = this.getView()
					.byId("surnameInput")
					.getValue();
				const inputDate = Date.parse(
					this.getView().byId("DP1").getValue()
				);

				const chosenWeek = new Date(inputDate).getWeek();

				fetch("http://localhost:4000/api/appointments")
					.then((data) => {
						return data.json();
					})
					.then((item) => {
						const appointmentByPatientName =
							item.appointments.filter(
								(appointment) =>
									appointment.name === nameFromInput &&
									appointment.surname === surnameFromInput
							);

						const appointmentsBySelectedDate =
							item.appointments.some(
								(appointment) =>
									Date.parse(appointment.date) === inputDate
							);

						const weekNumberFromAppointmentDate =
							appointmentByPatientName.map((slot) =>
								new Date(slot.date).getWeek()
							);

						const patientChosenSameWeek =
							weekNumberFromAppointmentDate.some(
								(item) => item === chosenWeek
							);

						if (appointmentsBySelectedDate) {
							const oModel = this.getView().getModel();
							oModel.setProperty(
								"/alert",
								"This appoint time has been booked, please select another time"
							);
						} else if (patientChosenSameWeek) {
							const oModel = this.getView().getModel();
							oModel.setProperty(
								"/alert",
								"You have an appointment this week, please select another week"
							);
						} else {
							fetch(
								"http://localhost:4000/api/appointment/store",
								{
									method: "post",
									headers: {
										Accept: "application/json",
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										name: nameFromInput,
										surname: surnameFromInput,
										date: inputDate,
									}),
								}
							).then(() => {
								const oModel = this.getView().getModel();
								oModel.setProperty(
									"/alert",
									"Thank you for booking an appointment"
								);
							});
						}
					});
			},
		});
	}
);
