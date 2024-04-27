import React from 'react';
import { Link } from "react-router-dom";
import './Banner.css';
const Banner = () => {
  return (
    <section class="banner-section d-flex flex-column justify-content-center align-items-center" id="home">
      <div className="container">
        <div className="row inner-container">
          <div className="col-lg-5 col-md-5 col-12 container-col">
            <div class="banner-items mt-5">
              <h1 class="text-black" data-aos="fade-up" data-aos-delay="500">
                Employee Listening and Coaching Tool
              </h1>
              <h4>
                Achieve more with less by streamlining technology, processes and People
              </h4>
              <br></br>
              <Link to="/demo">
                <button className="button-navigation w-button ">Request a Demo</button>
              </Link>
            </div>
          </div>
          <div className="col-lg-5 col-md-5 col-12 container-col">
            <div class="banner-items mt-5">
              <h1 class="text-black" data-aos="fade-up" data-aos-delay="500">
                Join the <br></br>community
              </h1>
              <h4>
                Meet visionary CPOs and HRs sharing best practices with each other
              </h4>
              <br></br>
              <Link to="/apply">
                <button className="button-navigation w-button ">Apply for Access</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
