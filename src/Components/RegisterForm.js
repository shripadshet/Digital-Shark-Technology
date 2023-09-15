import { ErrorMessage, Form, Formik, Field } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function RegisterForm() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    confirmPassword: "",
    role: "",
  };

  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const validate = Yup.object({
    firstName: Yup.string().required("First Name Required"),
    lastName: Yup.string(),
    email: Yup.string().email("Email is invalid").required("email is required"),
    password: Yup.string()
      .min(4, "must be atleast 4 digits")
      .required("password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match!")
      .required("Confirm password is reqired!"),
    age: Yup.number()
      .min(14, "minimum 14 Years")
      .required("Age must be required"),
    role: Yup.string().required("role is required"),
  });

  const sendData = async (values) => {
    await fetch("http://localhost:1337/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.firstName,
        lastname: values.lastName,
        email: values.email,
        age: values.age,
        password: values.password,
        role: values.role,
      }),
    });
    swal({
      title: "Sucess!",
      text: "Registration Successfull!",
      icon: "success",
      button: "ok!",
    });
    navigate("/login");
  };

  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validate}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
            setData(values);
            sendData(values);
          }}
        >
          {(formik) => (
            <div>
              <h2>Sign Up Form </h2>
              <Form
                className="form p-1"
                style={{ border: "solid 2px gray ", marginBottom: "50px" }}
              >
                <TextField
                  type="text"
                  label="Firstname"
                  name="firstName"
                  placeholder="abcd"
                />
                <TextField
                  type="text"
                  label="lastname"
                  name="lastName"
                  placeholder="efgh"
                />
                <TextField
                  type="email"
                  label="email"
                  name="email"
                  placeholder="abcdefgh@gmail.com"
                />
                <TextField
                  type="text"
                  label="password"
                  name="password"
                  placeholder="text@123"
                />
                <div>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="text"
                    id="confirmPassword"
                    placeholder="confirm Password..."
                    {...formik.getFieldProps("confirmPassword")}
                  />
                  <ErrorMessage
                    component="div"
                    name="confirmPassword"
                    className="error"
                  />
                </div>
                <TextField
                  type="number"
                  label="Age"
                  name="age"
                  placeholder="20"
                />
                 <label htmlFor="role">Role</label>
                 
                <Field as="select" name="role">
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user1">User1</option>
                  <option value="user2">User2</option>
                </Field>
                <ErrorMessage component="div" name="role" className="error" />
                <button className="btn btn-dark m-3" type="submit">
                  Register
                </button>
                <button className="btn btn-primary m-3" type="reset">
                  Reset
                </button>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
}
export default RegisterForm;
