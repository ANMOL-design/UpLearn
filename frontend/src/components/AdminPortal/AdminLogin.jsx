import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    let navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        window.scroll(0,130);
    }, [])

    const [err, seterr] = useState('');
    const [pass, setpass] = useState('');
    const [invalid, setinvalid] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const submit = handleValidate();

        if(submit){
            navigate("/admin-portal-home-190310554227");
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

    return(
        <>  
        {/* The Container Of Admin Login  */}
        <div className="signin">
            <div className="signContainer">
                <div className="signWrapper">
                    <h2>Sign In To Admin Account</h2>
                    <p className="pl">"Education is about creating leaders for tomorrow."</p>

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

                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default AdminLogin;