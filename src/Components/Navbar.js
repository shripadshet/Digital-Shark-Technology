import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    
  function handleClickLogIn() {
    navigate("/login");
  }
  function handleClickRegister() {
    navigate("/register");
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, width : "100%" }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            <Button color="inherit"  onClick={handleClickLogIn}>Login</Button>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={handleClickRegister}>Register</Button>
            </Typography>
          
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
export default Navbar;
