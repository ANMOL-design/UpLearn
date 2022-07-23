import React from "react";
import Cards from "./Cards/Cards";

//chart library
import Chart from "react-apexcharts";
import CourseCards from "./Cards/CourseCards";
import EventCards from "./Cards/EventCards";

export default function MainDash() {
 
  
  return (
    <div className="mainDashContainer">
      <div>
        <h2>Dashboard</h2>
        <div className="studentNameContainer">
          <div className="studentName">
            <h4>Welcome Alice!</h4>
            <p>
              Education is the passport to the future, So learn more &amp; more
            </p>
          </div>
          <div className="image">
            <img
              src="https://eduadmin-template.multipurposethemes.com/bs4/images/svg-icon/color-svg/custom-15.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="mainCard">
        <Cards />
      </div>
      <div className="studWork">
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

        <div className="studCourses">
          <h4>Current Running Courses</h4>
          <div className="studCoursesContainer">
            <CourseCards />
          </div>
        </div>
      </div>
      <div className="upcomingEvent">
        <h4>Upcoming Events</h4>
        <div>
          <EventCards />
        </div>
      </div>
    </div>
  );
  
}
