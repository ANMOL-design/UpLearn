import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

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

    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Must be greater than 8";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password and confirm password should be same";
    }

    return errors;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="sign">
        <div className="signContainer">
          <h2>Create Your Account</h2>
          <div className="signWrapper">
            <div className="signHeader">
              <div>
                <a className="signSocial" href="#/">
                  <FcGoogle className="googleIcon" />
                  <span>Sign Up with Google</span>
                </a>
                <p>
                  <span>........ </span>
                  Or sign up with your Email
                  <span> ........</span>
                </p>
              </div>
            </div>

            <div className="signForm">
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className="signInput">
                  <h5>Full Name</h5>
                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={values.name}
                    onChange={(e) => handleChange(e)}
                  />
                  <p>{formErrors.name}</p>
                </div>
                <div className="signInput">
                  <h5>Email</h5>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={(e) => handleChange(e)}
                  />
                  <p>{formErrors.email}</p>
                </div>
                <div className="signInput">
                  <h5>Password</h5>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={(e) => handleChange(e)}
                  />
                  <p>{formErrors.password}</p>
                </div>
                <div className="signInput">
                  <h5>Confirm Password</h5>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={(e) => handleChange(e)}
                  />
                  <p>{formErrors.confirmPassword}</p>
                </div>

                <button type="submit" className="signupBtn">
                  Sign Up
                </button>
                <div className="signupText">
                  <p>
                    Already have an Account?{" "}
                    <Link to="/login" className="link">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
