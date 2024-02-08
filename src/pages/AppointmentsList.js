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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id </TableCell>
              <TableCell align="center">Patient</TableCell>
              <TableCell align="center">Doctor</TableCell>
              <TableCell align="center">Starts at</TableCell>
              <TableCell align="center">Ends at</TableCell>
              <TableCell align="center"></TableCell>
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
                  <Button variant="contained" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AppointmentsList;
