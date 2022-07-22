import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
function Login() {
  let navigate = useNavigate();
  const {dispatch} = useContext(UserContext)
  const [values, setValues] = useState({
    email: "",
    password: "",

  });
  
  const [userrole, setuser] = useState('');

  useEffect(() => {
    window.scroll(0,150);
  }, [])

  const [err, seterr] = useState('');
  const [pass, setpass] = useState('');
  const [invalid, setinvalid] = useState('');
  const loginUser = async (e) => {
    // e.preventDefault();
    const {email,password}= values;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      
      body: JSON.stringify({
        email,
        password,
        userrole
      }),
    });
  
    if (res.status === 200) {
      dispatch({type:"USER",payload:true});
      localStorage.setItem("isLoggedin", Number(true));
      window.localStorage.setItem("Role",userrole)
      window.alert("Login succesful");
    }
    else if (res.status === 400){
      window.alert("Enter Email and Password.");
    }
    else if (res.status === 401){
      window.alert("Incorrect Password.");
    }
    else if (res.status === 402){
        window.alert("Email don't exist Invalid Credential.");
    }
    else{
        window.alert("Invalid Credential");
    }
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = handleValidate();

    if(submit){
      loginUser();
      navigate("/");
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
    else if(userrole === ''){
      setinvalid("Please Select User Role");
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
                {/* Select The Role  */}
                <div className="signInput">
                  <label htmlFor="userRole">User Role</label>
                  <select id="userRole" name="userrole" onChange={(e) => {setuser(e.target.value);}}>
                    <option value="" defaultValue>Please Select User Role</option>
                    <option value="STUDENT">Student</option>
                    <option value="INSTRUCTOR">Teacher</option>
                  </select>
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
