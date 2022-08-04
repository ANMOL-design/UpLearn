import React, {useEffect} from "react";
import Cards from "./Cards/Cards";
import Banner from "./../../../assets/images/custom.svg";

// chart library
import Chart from "react-apexcharts";
import CourseCards from "./Cards/CourseCards";
import EventCards from "./Cards/EventCards";

export default function MainDash() {

  useEffect(() => {
    window.scroll(0, 82);
  }, [])
  
  return (
    <div className="mainDashContainer">
      {/* My dashboard Content  */}
      <h2>&nbsp;&nbsp;My Dashboard</h2>
      {/* Dashboard Banner  */}
      <div className="studentNameContainer">
        {/* Banner Inner Content  */}
          <div className="studentName">
            <h4>Welcome Alice!</h4>
            <p>
              Education is the passport to the future, So learn more &amp; more
            </p>
          </div>
          {/* Banner Image  */}
          <div className="image">
            <img
              src={Banner}
              alt="DashBanner"
            />
          </div>
        </div>
      
      {/* Cards Of Dashboard  */}
        <Cards />

      <div className="studWork">
        {/* Div for the progress working status  */}
        <div className="studWorkStatus">
          <h4>Working Status</h4>
          <Chart
            type="donut"
            width={300}
            height={300}
            series={[45, 67]}
            options={{
              labels: ["Progress", "Done"],
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      total: {
                        show: false,
                        fontSize: 16,
                        color: "#171C24",
                      },
                    },
                  },
                },
              },
              dataLabels: {
                enabled: false,
              },
            }}
          />
        </div>
        {/* courses Progess  */}
        <div className="studCourses">
          <h4>Current Running Courses</h4>
          <div className="studCoursesContainer">
            <CourseCards />
          </div>
        </div>
      </div>

      {/* Upcomming Events  */}
      <div className="upcomingEvent">
        <h4>Upcoming Events</h4>
        <EventCards />
      </div>
    </div>
  );
  
}
