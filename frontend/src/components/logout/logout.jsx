import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

function Logout(){

    const {dispatch} = useContext(UserContext)
    
    const navigate = useNavigate();
    useEffect(()=>{
        fetch('/logout',{
            method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
               
        }).then((res)=>{
            dispatch({type:"USER",payload:false});
            localStorage.setItem("isLoggedin", Number(false));
            window.localStorage.removeItem("Role")
            navigate("/login", { replace: true });
            // if(!res.status===200){
            //     const error = new Error(res.error);
            //      throw error;
            // }
        }).catch((err)=>{
            console.log("hi");
        })
    });
        return(
        <>
        
        </>
        );
    
}
export default Logout;