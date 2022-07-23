import { AiOutlineHome, AiFillCheckSquare, AiFillSafetyCertificate } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiSpreadsheet } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { BsStickiesFill } from "react-icons/bs";
import { MdQuiz } from "react-icons/md";
// import MainDash from "./DashboardComponents/MainDash";


//sidebar data
export const SidebarData = [{
    icon: AiOutlineHome,
    heading: "Dashboard",
    // path: MainDash
},
{
    icon: CgProfile,
    heading: "Profile",
    // path: MainDash
},
{
    icon: BiSpreadsheet,
    heading: "Courses",
    // path: MainDash
},
{
    icon: FaChalkboardTeacher,
    heading: "Instructor",
    // path: MainDash
},
{
    icon: GrCertificate,
    heading: "Reports",
    // path: MainDash
},
{
    icon: MdLogout,
    heading: "Logout",
    // path: MainDash
    path: "/logout"
}
];

export const CardData = [{
    icon: BsStickiesFill,
    title: "Course in Progress",
    count: "18"
},
{
    icon: AiFillCheckSquare,
    title: "Course Completed",
    count: "10"
},
{
    icon: AiFillSafetyCertificate,
    title: "Certification Earned",
    count: "12"
},
{
    icon: MdQuiz,
    title: "Quiz Attempt",
    count: "21"
}

];

export const CourseCardData = [
    {
        title: "Networking",
        instructor: "Maical",
        barValue: 60,
        color: {
            backGround: " linear-gradient(221deg, rgba(173,212,206,1) 47%, rgba(40,80,101,1) 100%)"
        }
    },
    {
        title: "Networking",
        instructor: "Maical",
        barValue: 70,
        color: {
            backGround: "linear-gradient(221deg, rgba(173,187,212,1) 47%, rgba(40,65,101,1) 100%)"
        }
    }, {
        title: "Networking",
        instructor: "Maical",
        barValue: 70,
        color: {
            backGround: " linear-gradient(221deg, rgba(173,212,206,1) 47%, rgba(40,80,101,1) 100%)"
        }
    }, {
        title: "Networking",
        instructor: "Maical",
        barValue: 70,
        color: {
            backGround: "linear-gradient(221deg, rgba(173,187,212,1) 47%, rgba(40,65,101,1) 100%)"
        }
    }
];

export const EventData = [
    {
        title: "Basic Computer",
        date: "29 May",
        color: {
            backGround: "#93D2FF"
        }
    },
    {
        title: "Basic Computer",
        date: "29 May",
        color: {
            backGround: "#00D9A1"
        }
    },
    {
        title: "Basic Computer",
        date: "29 May",
        color: {
            backGround: "#93D2FF"
        }
    },
    {
        title: "Basic Computer",
        date: "29 May",
        color: {
            backGround: "#00D9A1"
        }
    }
]