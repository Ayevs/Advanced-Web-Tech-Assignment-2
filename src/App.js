import React, { useState, useEffect, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "./styles.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

function App() {
  //for particles

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);

  ////++++++++++++++++++++++++++++
  const [users, setUsers] = useState([]);
  //use state for buttons
  const [filteredUsers, setFilteredUsers] = useState([]);
  //used for search
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    age: { value: null, matchMode: FilterMatchMode.IN },
    isActive: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  useEffect(() => {
    fetch("http://localhost:3001/getUsers")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("fetched data:", data);
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const resetFilter = () => {
    setFilteredUsers(users);
  };

  const filterNot30YearOld = () => {
    const filtered = users.filter((user) => user.age !== 30);
    setFilteredUsers(filtered);
  };

  const filterOlderThan22 = () => {
    const filtered = users.filter((user) => user.age > 22);
    setFilteredUsers(filtered);
  };

  const filterYoungerThan20 = () => {
    const filtered = users.filter((user) => user.age < 20);
    setFilteredUsers(filtered);
  };

  const filterActiveMembers = () => {
    const filtered = users.filter((user) => user.isActive);
    setFilteredUsers(filtered);
  };

  const filterNot20 = () => {
    const filtered = users.filter((user) => user.age !== 20);
    setFilteredUsers(filtered);
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  return (
    <div className="mainDiv">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#00275d",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#deb406",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <h1>Welcome to HumberSocialClub!</h1>
      <div className="flex flex-column md:flex-row justify-content-between my-5">
        <Button
          type="button"
          label="Not 30 years old"
          className="mb-3 md:mb-0"
          onClick={filterNot30YearOld}
        />
        <Button
          type="button"
          label="Older than 22"
          className="mb-3 md:mb-0"
          onClick={filterOlderThan22}
        />
        <Button
          type="button"
          label="Younger than 20"
          className="mb-3 md:mb-0"
          onClick={filterYoungerThan20}
        />
        <Button
          type="button"
          label="Active Members"
          className="mb-3 md:mb-0"
          onClick={filterActiveMembers}
        />
        <Button
          type="button"
          label="Not 20 years old"
          className="mb-3 md:mb-0"
          onClick={filterNot20}
        />
        <Button
          type="button"
          label="Reset Filter"
          className="mb-3 md:mb-0"
          onClick={resetFilter}
          severity="secondary"
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>

      <DataTable
        value={filteredUsers}
        showGridlines
        tableStyle={{ minWidth: "50rem" }}
        filters={filters}
      >
        <Column field="name" header="Name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="age" header="Age"></Column>
        <Column field="isActive" header="Active in the club?"></Column>
      </DataTable>
    </div>
  );
}

export default App;
