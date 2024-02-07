import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

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

  const handleChange = (event) => {
    setSelectedDoctorId(event.target.value);
  };

  const handleNameChange = (event) => {
    setPatientName(event.target.value);
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
          onChange={handleChange}
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
    </div>
  );
}

export default AddAppointment;
