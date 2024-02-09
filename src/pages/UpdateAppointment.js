import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";

function UpdateAppointment() {
  const { id } = useParams();
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [patientName, setPatientName] = useState("");

  useEffect(() => {
    fetchDoctors();
    if (id) {
      fetchAppointment(id);
    }
  }, [id]);

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

  const fetchAppointment = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/appointments/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch appointment");
      }
      const data = await response.json();
      setPatientName(data.patientName);
      setSelectedDoctorId(data.doctorId);
      setStartTime(data.startTime);
      setEndTime(data.endTime);
    } catch (error) {
      console.error("Error fetching appointment:", error);
    }
  };

  const handleNameChange = (event) => {
    setPatientName(event.target.value);
  };

  const handleUpdateAppointment = async () => {
    if (!selectedDoctorId || !startTime || !endTime || !patientName) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const updatedAppointment = {
        id: id,
        doctorId: selectedDoctorId,
        startTime: startTime,
        endTime: endTime,
        patientName: patientName,
      };

      const response = await fetch(`http://localhost:3001/appointments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAppointment),
      });
      if (!response.ok) {
        throw new Error("Failed to update appointment");
      }

      alert("Appointment updated successfully!");
      window.location.href = "/appointments";
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update appointment. Please try again.");
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
      <Button variant="contained" onClick={handleUpdateAppointment}>
        Update Appointment
      </Button>
    </div>
  );
}

export default UpdateAppointment;
