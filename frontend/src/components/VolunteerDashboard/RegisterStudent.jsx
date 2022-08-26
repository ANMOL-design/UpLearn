import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function RegisterStudent(){

    const [values, setvalues] = useState({
        firstName : '',
        LastName : '',
        classes : '',
        email:'',
        password:'',
        cpassword:'',
        Board : '',
        PermanentAddress : '',
        School : '',
        City : '',
        State : '',
        Pincode : '',
        mobileno : '',
        Gender : '',
        DOB : '',
        BIO : '',
        enroll : ''
    });
    const [profile, setprofile] = useState({});
    const [validation, setvalidation] = useState('');
    const [adminInfo, setadminInfo] = useState('');
    const loginDetails = useSelector((state) => state.userReducers);
    let navigate = useNavigate();
    
    useEffect(() => {
        window.scroll(0,0);
        // Check is Admin Login Or Not 
            // call the fetch admin detail function 
            const fetchdata = async () =>{
                await axios.get("/aboutVolunteer").then(response => {
                    setadminInfo(response.data);
                  })
            }
            fetchdata();
    }, [])
   console.log(adminInfo);
    const postUpdateProfileData = async () => {
        const firstName = values.firstName;
        const LastName = values.LastName;
        const classes = Number(values.classes);
        const Board = values.Board;
        const PermanentAddress = values.PermanentAddress;
        const School = values.School;
        const City = values.City;
        const State = values.State;
        const Pincode = values.Pincode;
        const mobileno = values.mobileno;
        const Gender = values.Gender;
        const DOB = values.DOB;
        const BIO = values.BIO;
        const password = values.password;
        const cpassword = values.cpassword;
        const email = values.email;
        const VolunteerId = "63088d4d4c5c6ce0ff8e738f";
        const res =  await fetch("/addUserByVolunteer" ,{
             method : "POST",
             headers : { 
                 "content-Type" : "application/json"
             },
             body : JSON.stringify({

                firstName,
                LastName,
                classes,
                password,
                cpassword,
                email,
                Board,
                PermanentAddress,
                School,
                City,
                State,
                Pincode,
                mobileno,
                Gender,
                DOB,
                BIO,
                VolunteerId
             })
         } );
         
         if(res.status === 200){
            window.alert("Profile Update Successfully");
            navigate("/studentdashboard");
         }
         else{
             console.log(res)
             window.alert("Invalid Request | Internal Server Error");
         }
    }

    const postUpdateProfile = () => {
        if(
            !values.firstName || !values.LastName || !values.DOB || !values.Gender
            || !values.mobileno || !values.PermanentAddress || !values.State || !values.City
            || !values.Pincode || !values.School || !values.Board || !values.classes
        ){
            setvalidation('Please Enter all required fields');
        }
        else if(values.mobileno.length !== 10){
            setvalidation('Mobile Number must be of 10 number or without +91');
        }
        else{
            postUpdateProfileData()
        }
    }

    const handleChange = (event) => {
        setvalues({ ...values, [event.target.name]: event.target.value });
        setvalidation('')
    };

    console.log(values);

    return(
        <>
        <div className="modal-profile">
            <div className="modal-outer-container">
                <h1>Add Students</h1>
                <h2>Personal Details</h2>
                <div className="modal-input-container">
                    {/* First name of User  */}
                    <div className="signInput">
                        <label htmlFor="firstname">First Name</label><br />
                        <input
                        type="text"
                        id="firstname"
                        placeholder="John"
                        name="firstName"
                        value={values.firstName}
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </div>
                    {/* Last name of User  */}
                    <div className="signInput">
                        <label htmlFor="lastname">Last Name</label><br />
                        <input
                        type="text"
                        id="lastname"
                        placeholder="Doe"
                        name="LastName"
                        value={values.LastName}
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </div>
                    <div className="signInput">
                        <label htmlFor="password">Password</label><br />
                        <input
                        type="password"
                        id="password"
                        placeholder="your password"
                        name="password"
                        value={values.password}
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </div>
                    <div className="signInput">
                        <label htmlFor="cpassword">confirm Password</label><br />
                        <input
                        type="password"
                        id="cpassword"
                        placeholder="Confirm password"
                        name="cpassword"
                        value={values.cpassword}
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </div>
                    <div className="signInput">
                        <label htmlFor="email">Email</label><br />
                        <input
                        type="email"
                        id="email"
                        placeholder="Your Email Id"
                        name="email"
                        value={values.email}
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </div>
                    {/* Mobile No of User  */}
                    <div className="signInput">
                        <label htmlFor="mobileno">Phone No.</label><br />
                        <input
                        type="number"
                        id="mobileno"
                        placeholder="8046151300"
                        name="mobileno"
                        min={0}
                        value={values.mobileno}
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </div>
                    {/* Date of birth of User  */}
                    <div className="signInput">
                        <label htmlFor="dob">Date Of Birth</label><br />
                        <input
                            type="date"
                            id="dob"
                            name="DOB"
                            value={values.DOB}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>
                    {/* Gender of User  */}
                    <div className="signInput">
                        <label htmlFor="gender">Gender</label><br />
                        <select id="gender" name="Gender" value={values.Gender}
                            onChange={(e) => handleChange(e)}>
                            <option value="" defaultValue>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                {/* Address of User  */}
                <h2>Address Details</h2>
                <div className="modal-input-container">
                    {/* Permanent Address of User  */}
                    <div className="signInput" style={{width: "100%"}}>
                        <label htmlFor="address">Permanent Address</label><br />
                        <input
                        type="text"
                        id="address"
                        placeholder="11/6, Shanti Chamber, Pusa Road Chowk, Karol Bagh"
                        name="PermanentAddress"
                        style={{width: "100%"}}
                        value={values.PermanentAddress}
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </div>
                    {/* State of User  */}
                    <div className="signInput">
                        <label htmlFor="state">State</label><br />
                        <select id="state" name="State" value={values.State}
                        onChange={(e) => handleChange(e)}>
                        <option value="" defaultValue>Select Your State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        </select>
                    </div>
                    {/* City of User  */}
                    <div className="signInput">
                        <label htmlFor="city">City</label><br />
                        <input
                        type="text"
                        id="city"
                        placeholder=""
                        name="City"   
                        value={values.City}
                        onChange={(e) => handleChange(e)}         
                        required
                        />
                    </div>
                    {/* Pincode of User  */}
                    <div className="signInput">
                        <label htmlFor="pincode">Pincode</label><br />
                        <input
                        type="number"
                        id="pincode"
                        name="Pincode"
                        value={values.Pincode}
                        onChange={(e) => handleChange(e)}
                        min={0}
                        required
                        />
                    </div>
                </div>
                {/* Schooling Details of User  */}
                <h2>Schooling Details</h2>
                <div className="modal-input-container">
                    {/* School Address of User  */}
                    <div className="signInput" style={{width: "100%"}}>
                        <label htmlFor="school">School Name</label><br />
                        <input
                        type="text"
                        id="school"
                        placeholder="Govt. Modal Senior Secondary School"
                        name="School"
                        style={{width: "100%"}}
                        value={values.School}
                        onChange={(e) => handleChange(e)}
                        required
                        />
                    </div>
                    {/* Board of User  */}
                    <div className="signInput">
                        <label htmlFor="board">Board Name</label><br />
                        <input
                        type="text"
                        id="board"
                        placeholder="CBSE"
                        name="Board"
                        value={(values.Board)}
                        onChange={(e) => handleChange(e)}
                        />
                    </div>
                    {/* class name of User  */}
                    <div className="signInput">
                        <label htmlFor="class">Class</label><br />
                        <select id="class" name="classes" value={values.classes}
                        onChange={(e) => handleChange(e)}>
                        <option value="" defaultValue>Select Your Class</option>
                        <option value="1">Class 1</option>
                        <option value="2">Class 2</option>
                        <option value="3">Class 3</option>
                        <option value="4">Class 4</option>
                        <option value="5">Class 5</option>
                        <option value="6">Class 6</option>
                        <option value="7">Class 7</option>
                        <option value="8">Class 8</option>
                        <option value="9">Class 9</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                        </select>
                    </div>
                    {/* Enrollment no of User  */}
                    <div className="signInput">
                        <label htmlFor="rollno">Enrollment No.</label><br />
                        <input
                        type="number"
                        id="rollno"
                        placeholder="Roll No"
                        name="enroll"
                        min={0}
                        value={values.enroll}
                        onChange={(e) => handleChange(e)}  
                        />
                    </div>
                </div>
                {/* About of User  */}
                {/* <h2>About Me</h2>
                <div className="modal-input-container">
                    <div className="signInput">
                    <label htmlFor="Message">Tell us about yourself</label><br />
                    <textarea  className="contactInput-ta"
                        placeholder="Message"
                        name="BIO" 
                        id="message" 
                        cols="500" 
                        rows="20"   
                        value={values.BIO}
                        onChange={(e) => handleChange(e)}                      
                    />
                    </div>
                </div>     */}
                <Link to='privacypolicy'>Terms &amp; Conditions</Link>
               {validation}
                <div className="centerbtn">
                    <p className="invalid" id="hide">{validation}</p>
                    <button onClick={postUpdateProfile}>Update Profile</button>
                </div>
            </div>
          </div>
        </>
    )
}

export default RegisterStudent;