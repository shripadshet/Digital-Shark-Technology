import React from "react";
import { Form, Formik } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function LogIn(props) {
  const initialValues = {
    email: "",
    password: "",
  };
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("email is required"),
    password: Yup.string()
      .min(4, "must be atleast 4 digits")
      .required("password required"),
  });
  
  const sendData = async (values) => {
    const response = await fetch("http://localhost:1337/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    const data = await response.json();
    const logedUser = data?.logedInUser ? data.logedInUser : "";
    console.log("logedUser", logedUser);

    localStorage.mytoken = data.user;

    if (data.user === false) {
      alert("invalid user");
    } else {
      swal({
        title: "Sucess!",
        text: "LogIn Successfull!",
        icon: "success",
        button: "ok!",
      });
      navigate("/home");
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
          setData(values);
          sendData(values);
          props.onSubmit(values.email);
        }}
      >
        {(formik) => (
          <div>
            <h2>LogIn Form </h2>
            <Form
              className="form p-1"
              style={{ border: "solid 2px gray ", marginBottom: "50px" }}
            >
              <TextField
                type="email"
                label="email"
                name="email"
                placeholder="abcdefgh@gmail.com"
                autoComplete="off"
              />
              <TextField
                type="text"
                label="password"
                name="password"
                placeholder="text@123"
                autoComplete="off"
              />

              <button className="btn btn-dark m-3" type="submit">
                LogIn
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}
export default LogIn;
