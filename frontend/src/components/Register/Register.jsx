import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../../assets/images/signup.png";


function Register() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormErrors(handleValidation(values));

    setIsSubmit(true);
    if (isSubmit) {
      navigate("/");
    }
  };

  //form validation
  const handleValidation = (values) => {
    const errors = {};

    const { name, email, password, confirmPassword } = values;

    if (!name) {
      errors.name = "Name is required";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Must be greater than 8";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Password and confirm password should be same";
    }

    if (!email) {
      errors.email = "Email is required";
    }
    return errors;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="register">
        <div className="registerContainer">
          <div className="registerContent">
            <form onSubmit={(event) => handleSubmit(event)}>
              <h1 className="title">Sign up</h1>

              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={values.name}
                  onChange={(e) => handleChange(e)}
                />
                <p>{formErrors.name}</p>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={(e) => handleChange(e)}
                />
                <p>{formErrors.email}</p>
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                />
                <p>{formErrors.password}</p>
              </div>
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => handleChange(e)}
                />
                <p>{formErrors.confirmPassword}</p>
              </div>

              <button type="submit" className="signupBtn">
                Sign up
              </button>
              <span>
                Already have an Account ?{" "}
                <Link to="/login" className="link">
                  Login
                </Link>
              </span>
            </form>
          </div>
          <div className="registerImg">
            <img src={signupImg} />
          </div>
        </div>
      </div>
    </>
  );


  }
export default Register;
