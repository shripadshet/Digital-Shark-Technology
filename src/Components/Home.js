import React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Header from "./Header";

function Home(props) {
  const [userData, setUserData] = useState([]);

  const getUserDetails = () => {
    fetch("http://localhost:1337/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((details) => {
        setUserData(details.users);
      });
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  const filtered = userData.filter((item) => {
    return item.email === props.userMail;
  });

  return (
    <>
      <Header filtered={filtered}></Header>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "60%", marginBottom: "25%" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Password</TableCell>
              <TableCell align="right">Age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.password}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default Home;
