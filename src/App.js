import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./styles.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

function App() {
  const [users, setUsers] = useState([]);

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mainDiv">
      <h1>Welcome to HumberSocialClub!</h1>
      <div className="flex flex-column md:flex-row justify-content-between my-5">
        <Button
          type="button"
          label="Not 30 years old"
          className="mb-3 md:mb-0"
        />
        <Button type="button" label="Older than 22" className="mb-3 md:mb-0" />
        <Button
          type="button"
          label="Younger than 20"
          className="mb-3 md:mb-0"
        />
        <Button type="button" label="Active Mentors" className="mb-3 md:mb-0" />
        <Button
          type="button"
          label="Not 20 years old"
          className="mb-3 md:mb-0"
        />
      </div>
      <DataTable value={users} showGridlines tableStyle={{ minWidth: "50rem" }}>
        <Column field="name" header="Name"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="age" header="Age"></Column>
        <Column field="isActive" header="Is Active?"></Column>
      </DataTable>
    </div>
  );
}

export default App;
