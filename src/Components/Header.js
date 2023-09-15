import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import SideBar from "./SideBar";

function Header(props) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("mytoken");
    navigate("/");
  };
  const filteredArray = props.filtered;
  return (
    <>
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        <AppBar position="static">
          <Toolbar sx={{ backgroundColor: "green" }}>
            <SideBar filtered={filteredArray}> </SideBar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <LogoutIcon sx={{ color: "#FC0" }} onClick={logout}>
                LogOut
              </LogoutIcon>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
export default Header;
