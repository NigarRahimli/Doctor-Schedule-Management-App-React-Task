import React from "react";
import Layout from "./components/Layout";
import AppointmentsList from "./pages/AppointmentsList";

function App() {
  return (
    <>
      <Layout>
       <AppointmentsList/>
      </Layout>
    </>
  );
}

export default App;
