import React from "react";
import Layout from "./components/Layout";
import AppointmentsList from "./pages/AppointmentsList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddAppointment from "./pages/AddAppointment";
import "./index.css";
import UpdateAppointment from "./pages/UpdateAppointment";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>} />
        <Route
          path="/appointments"
          element={
            <Layout>
              <AppointmentsList />
            </Layout>
          }
        />
        <Route
          path="/add-appointment"
          element={
            <Layout>
              <AddAppointment />
            </Layout>
          }
        />
        <Route
          path="/update/:id"
          element={
            <Layout>
              <UpdateAppointment />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
