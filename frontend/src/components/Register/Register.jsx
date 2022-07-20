import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [copassword, setcopassword] = useState('');
  const [invalid, setinvalid] = useState('');

  const postData = async ()=>{

   const name = values.name;
   const email =values.email;
   const password = values.password;
   const cpassword = values.confirmPassword

    const res =  await fetch("/register" ,{
        method : "POST",
        headers : { 
            "content-Type" : "application/json"
        },
        body : JSON.stringify({
            name,email,password,cpassword
        })
    } );
    
    // console.log(res)
   console.log(name);
    if(res.status === 200){
        window.alert("Successful Registration.\nCongratulation now you are a part of Uplearn.");
    }
    else{
        console.log(res)
        window.alert("Registration Fails , Try again")
    }
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = handleValidation();
          
    if (submit) {
      postData();
      navigate("/");
    }
    else{
      setinvalid("Invalid Credential | Internal Server Error");
    }
  };

  //form validation
  const handleValidation = () => {

    if (values.name === '') {
      setname("Name is required");
      window.scroll(0,200);
      return false;
    }
    else if (values.email === '') {
      setemail("Email is required");
      window.scroll(0,250);
      return false;
    }
    else if (values.password === '') {
      setpassword("Password is required");
      return false;
    } 
    else if (values.confirmPassword === '') {
      setcopassword("Please Confirm Your Password");
      return false;
    } 
    else if (values.password.length < 7) {
      setinvalid("Password must be atleast 8 character");
      return false;
    } 
    else if (values.password !== values.confirmPassword) {
      setinvalid("Password and Confirm password should be same");
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setname(''); setemail(''); setpassword(''); setcopassword('');
    setinvalid('');
    console.log(name)
  };

  return (
    <>
      {/* The Container Of Login An Sign In Page  */}
      <div className="signin">
        <div className="signContainer">
          <div className="signWrapper">
            <h2>Create Your Account</h2>
            <p className="pl">"A better learning future starts here."</p>

            {/* Starting the Form  */}
            <div className="signForm">
              <form>
                {/* The Name Input  */}
                <div className="signInput">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    name="name"
                    value={values.name}
                    onChange={(e) => handleChange(e)}
                  />
                  <p>{name}</p>
                </div>
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
                  <p>{email}</p>
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
                  <p>{password}</p>
                </div>
                {/* The Confirm Password Input  */}
                <div className="signInput">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={(e) => handleChange(e)}
                  />
                  <p>{copassword}</p>
                </div>
                {/* The Submit Button  */}
                <div>
                  <p className="invalid">{invalid}</p>
                  <button type="button" className="signupBtn" onClick={handleSubmit}>
                    Sign Up
                  </button>
                </div>
                {/* Go to Login  */}
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
