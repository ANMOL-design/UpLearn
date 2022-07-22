import { AiOutlineHome, AiFillCheckSquare } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiSpreadsheet } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GrCertificate } from "react-icons/gr";
import { MdLogout } from "react-icons/md";
import { BsStickiesFill } from "react-icons/bs";


//sidebar data
export const SidebarData = [{
        icon: AiOutlineHome,
        heading: "Dashboard",
        path: "/"
    },
    {
        icon: CgProfile,
        heading: "Profile",
        path: "/"
    },
    {
        icon: BiSpreadsheet,
        heading: "Courses",
        path: "/"
    },
    {
        icon: FaChalkboardTeacher,
        heading: "Instructor",
        path: "/"
    },
    {
        icon: GrCertificate,
        heading: "Reports",
        path: "/"
    },
    {
        icon: MdLogout,
        heading: "Logout",
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
        icon: GrCertificate,
        title: "Certification Earned",
        count: "12"
    }
]