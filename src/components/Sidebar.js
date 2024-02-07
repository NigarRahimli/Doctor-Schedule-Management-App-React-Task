import React from "react";
import { Sidenav, Nav } from "rsuite";
import "rsuite/dist/rsuite.css";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";

function Sidebar() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidenav defaultOpenKeys={["3", "4"]} style={{ width: 240 }}>
        <Sidenav.Body style={{ height: "100vh", overflowY: "auto" }}>
          <Nav activeKey="1">
            <Nav.Item eventKey="1" icon={<DashboardIcon />}>
              Doctor Schedule Management
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon />}>
              Doctors
            </Nav.Item>
            <Nav.Menu eventKey="3" title="Appointments" icon={<MagicIcon />}>
              <Nav.Item eventKey="3-2">List</Nav.Item>
              <Nav.Item eventKey="3-3">Add new</Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
}

export default Sidebar;
