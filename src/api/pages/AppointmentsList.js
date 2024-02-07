import React, { useState, useEffect } from "react";

function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:3001/appointments");
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();
      console.log(data);
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <div>
      <h1>Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            <div>Doctor ID: {appointment.doctorId}</div>
            <div>Start Time: {appointment.startTime}</div>
            <div>End Time: {appointment.endTime}</div>
            <div>Patient Name: {appointment.patientName}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentsList;
