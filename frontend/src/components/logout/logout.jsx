import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {LogoutUser} from "./../../redux/actions/userAction/userAction";

function Logout(){ 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect( ()=> {
        fetch('/logout',{
            method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
               
        }).then((res)=>{
            dispatch(LogoutUser());
            navigate("/login", { replace: true });
        }).catch((err)=>{
            console.log("hi");
        })
    });
        
    return(
        <>
            Logout User
        </>
    );
    
}
export default Logout;