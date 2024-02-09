import React, { useState, useEffect } from "react";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import UpdateAppointment from "./UpdateAppointment";
import { Link } from "react-router-dom";

function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:3001/appointments");
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/appointments/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== id)
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleUpdate = (id) => {
    setSelectedAppointmentId(id);
  };

  return (
    <div>
      <h1>Appointments</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="center">Patient</TableCell>
              <TableCell align="center">Doctor</TableCell>
              <TableCell align="center">Starts at</TableCell>
              <TableCell align="center">Ends at</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>{" "}
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow
                key={appointment.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {appointment.id}
                </TableCell>
                <TableCell align="center">{appointment.patientName}</TableCell>
                <TableCell align="center">{appointment.doctorId}</TableCell>
                <TableCell align="center">{appointment.startTime}</TableCell>
                <TableCell align="center">{appointment.endTime}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(appointment.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Link to={`/update/${appointment.id}`}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdate(appointment.id)}
                    >
                      Update
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedAppointmentId && (
        <UpdateAppointment
          appointmentId={selectedAppointmentId}
          onClose={() => setSelectedAppointmentId(null)}
        />
      )}
    </div>
  );
}

export default AppointmentsList;
