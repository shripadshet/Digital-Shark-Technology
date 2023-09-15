import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import RegisterForm from "./Components/RegisterForm";
import LogIn from "./Components/LogIn";
import Home from "./Components/Home";
import ProtectedRoute from "./ProtectedRoute";
import UseAuth from "./hooks/UseAuth";

function App() {
  const [isAuth, login, logout] = UseAuth();

  const [userMail, setUserMail] = useState("");

  const getLogedinUser = (data) => {
    setUserMail(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route
              path="/login"
              element={<LogIn onSubmit={getLogedinUser} />}
            />
            <Route element={<ProtectedRoute auth={isAuth} />}>
              <Route path="/home" element={<Home userMail={userMail} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
