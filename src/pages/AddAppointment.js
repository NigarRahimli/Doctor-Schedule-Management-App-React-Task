import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";

function AddAppointment() {
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    fetchDoctors();
    setStartTime("");
    setEndTime("");
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:3001/doctors");
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleNameChange = (event) => {
    setPatientName(event.target.value);
  };
  const handleAddAppointment = async () => {
    if (!selectedDoctorId || !startTime || !endTime || !patientName) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/appointments");
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }
      const appointments = await response.json();

      let maxId = 0;
      appointments.forEach((appointment) => {
        if (Number(appointment.id) > maxId) {
          maxId = Number(appointment.id);
        }
      });

      const newAppointmentId = maxId + 1;

      const newAppointment = {
        id: newAppointmentId.toString(),
        doctorId: selectedDoctorId,
        startTime: startTime,
        endTime: endTime,
        patientName: patientName,
      };

      const addResponse = await fetch("http://localhost:3001/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAppointment),
      });

      if (!addResponse.ok) {
        throw new Error("Failed to add appointment");
      }

      setSelectedDoctorId("");
      setStartTime("");
      setEndTime("");
      setPatientName("");

      alert("Appointment added successfully!");
    } catch (error) {
      console.error("Error adding appointment:", error);
      alert("Failed to add appointment. Please try again.");
    }
  };

  return (
    <div className="flex justify-center  flex-col gap-3 p-20 w-96">
      <TextField
        fullWidth
        className="mb-3"
        id="outlined-basic"
        label="Patient Name"
        variant="outlined"
        value={patientName}
        onChange={handleNameChange}
      />
      <FormControl>
        <InputLabel id="doctor-select-label">Doctor</InputLabel>
        <Select
          labelId="doctor-select-label"
          id="doctor-select"
          value={selectedDoctorId}
          onChange={(e) => setSelectedDoctorId(e.target.value)}
          label="Doctor"
        >
          {doctors.map((doctor) => (
            <MenuItem key={doctor.id} value={doctor.id}>
              {doctor.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>
        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <Button variant="contained" onClick={handleAddAppointment}>
        Add Appointment
      </Button>
    </div>
  );
}

export default AddAppointment;
