import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [err, seterr] = useState('');
  const [pass, setpass] = useState('');
  const [invalid, setinvalid] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = handleValidate();

    if(submit){
      navigate("/");
    }
    else{
      setinvalid("Invalid Credential | Internal Server Error");
    }
  };

  const handleValidate = () => {
    // Validate the Email and password
    if(values.email === ''){
      seterr("Email is required.");
      return false;
    }
    else if(values.password === ''){
      setpass("Password is required.");
      return false;
    }

    return true;
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    seterr('');  setpass('');
  };


  return (
    <>
      {/* The Container Of Login An Sign In Page  */}
      <div className="signin">
        <div className="signContainer">
          <div className="signWrapper">
            <h2>Sign In To Your Account</h2>
            <Link to="/register"><p>If you don't have an account you can Register here!</p></Link>

            {/* Starting the Form  */}
            <div className="signForm">
              <form>
                {/* The Email Input  */}
                <div className="signInput">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={(e) => handleChange(e)}
                  />
                  <p>{err}</p>
                </div>
                {/* The Password Input  */}
                <div className="signInput">
                <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={(e) => handleChange(e)}
                  />
                  <p>{pass}</p>
                </div>
                {/* The Submit Button  */}
                <div>
                  <p className="invalid">{invalid}</p>
                  <button type="button" className="signupBtn" onClick={handleSubmit}>
                    Sign In
                  </button>
                </div>

                {/* Go to Register  */}
                <div className="signupText">
                  <p>
                    Don't have an Account?{" "}
                    <Link to="/register" className="link">
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
