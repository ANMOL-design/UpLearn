import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function InstructorList() {
    let navigate = useNavigate();
  const adminstatus = useSelector((state) => state.AdminReducers);
const [InstructorsInfo,setInstructorInfo] = useState([])

    useEffect(() => {
        window.scroll(0,0);
        // Check is Admin Login Or Not 
        if(Number(adminstatus.isAdminLoggedIn)){
            // call the fetch admin detail function 
            const fetchdata = async () =>{
                await axios.get("/allInstructor").then(response => {
                    console.log(response.data);
                    setInstructorInfo(response.data);
                  })
                  .catch(error => {
                    console.log(error);
                    navigate("/admin-portal-login-190310554227");
                  });
            }
            fetchdata();
        }
        // If User is not login redirect to login 
        else{
            navigate("/admin-portal-login-190310554227");
        }
        console.log(InstructorsInfo);
      }, [adminstatus.isAdminLoggedIn, navigate])
    
  return (
    <>

<table className="instructor-table">
	<thead>
	<tr>
    <th>Name</th>
    <th>email</th>
    <th>Mobile No.</th>
    <th>AadharCard</th>
    <th>Edit Profile</th>
    <th>Delete</th>
	</tr>
	</thead>
	<tbody>
        {InstructorsInfo.map((item)=>(
            <tr>
            <td>{item.Teachername}</td>
            <td>{item.email}</td>
            <td>{item.mobileno}</td>
            <td>{item.Aadharcard}</td>
            <td><button>Edit </button></td>
            <td><button>Delete</button></td>
          </tr>
        ))}
	</tbody>
</table>
    </>
  )
}
