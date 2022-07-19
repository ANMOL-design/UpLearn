import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Login() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
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

    if (values.password === "") {
      errors.password = "Email and Password is required";
    } else if (values.email === "") {
      errors.email = "Email and Password is required";
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
          <h2>Sign In To Your Account</h2>
          <div className="signWrapper">
            <div className="signHeader">
              <div>
                <a className="signSocial" href="#/">
                  <FcGoogle className="googleIcon" />
                  <span>Sign In with Google</span>
                </a>
                <p>
                  <span>........ </span>
                  Or sign in with your Email
                  <span> ........</span>
                </p>
              </div>
            </div>

            <div className="signForm">
              <form onSubmit={(event) => handleSubmit(event)}>
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

                <button type="submit" className="signupBtn">
                  Sign In
                </button>
                <div className="signupText">
                  <p>
                    Don't have an Account?{" "}
                    <Link to="/sign" className="link">
                      Sign Up
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
export default Login;
