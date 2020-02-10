import "./App.css";
import React from "react";
import "react-tabs/style/react-tabs.css";
import GraphComponent from "./components/GraphComponent";
import Select from "react-select";
import changeLanguage, {
  tabs,
  APP_NAME,
  averageDataEng,
  main,
  averages
} from "./text";
import ReactDOM from "react-dom";
import Background from "./img/bg.jpg";
import Login from "./components/Modals/Login";
import Feedback from "./components/Modals/feedback/send/Feedback";
import AOS from "aos";

const languages = [
  {
    value: "en",
    label: <img width="25px" src={require("./img/flags/us.png")} alt="EN"></img>
  },
  {
    value: "ru",
    label: (
      <img width="25px" src={require("./img/flags/russia.png")} alt="RU"></img>
    )
  },
  {
    value: "es",
    label: (
      <img width="25px" src={require("./img/flags/estonia.png")} alt="EE"></img>
    )
  }
];

function refresh(event) {
  changeLanguage(event.value);

  ReactDOM.render(<App />, document.getElementById("root"));
  ReactDOM.render(<GraphComponent />, document.getElementById("graph"));
}

const dropdownIndicatorStyles = (base, state) => {
  let changes = {
    // all your override styles
    display: "none"
  };

  return Object.assign(base, changes);
};

function App() {
  AOS.init();
  return (
    // <div className="App">
    //   <nav
    //     className="navbar navbar-expand-lg bg-transparent"
    //     style={{ position: "absolute", right: "5%" }}
    //   >
    //     <div className="container">
    //       <button
    //         className="navbar-toggler"
    //         type="button"
    //         data-toggle="collapse"
    //         data-target="#navbarResponsive"
    //         aria-controls="navbarResponsive"
    //         aria-expanded="false"
    //         aria-label="Toggle navigation"
    //       >
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbarResponsive">
    //         <ul className="navbar-nav ml-auto">
    //           <li className="nav-item active">
    //             <a className="nav-link" href="/">
    //               {main[0]}
    //               <span className="sr-only">(current)</span>
    //             </a>
    //           </li>
    //           <li className="nav-item">
    //             <a className="nav-link" href="/">
    //               {main[1]}
    //             </a>
    //           </li>
    //           <li className="nav-item">
    //             <a className="nav-link" href="/">
    //               {main[2]}
    //             </a>
    //           </li>
    //           <li>
    //             <div style={{ width: "250%" }}>
    //               <Select
    //                 className="bg-transparent"
    //                 options={languages}
    //                 onChange={refresh}
    //                 defaultValue={languages[0]}
    //                 styles={{ dropdownIndicator: dropdownIndicatorStyles }}
    //                 isSearchable={false}
    //               ></Select>
    //             </div>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    //   <section
    //     id="home"
    //     style={{
    //       height: "400px",
    //       backgroundAttachment: "fixed",
    //       backgroundImage: `url(${Background})`
    //     }}
    //     data-section="home"
    //   >
    //     <div>
    //       <div style={{ padding: "100px" }}>
    //         <h1>InWeGe</h1>
    //         <p>Gender Gaps in Wages and Wealth</p>
    //       </div>
    //     </div>
    //   </section>

    //   <section className="md-5" style={{ marginTop: "-100px" }}>
    //     <div className="container">
    //       <div id="graph">
    //         <GraphComponent></GraphComponent>
    //       </div>
    //     </div>
    //   </section>

    //   <footer
    //     className="py-5"
    //     style={{
    //       backgroundAttachment: "fixed",
    //       backgroundImage: `url(${Background})`
    //     }}
    //   >
    //     <div className="container">
    //       <p className="m-0 text-center text-white">
    //         Copyright &copy; InWeGe 2019
    //       </p>
    //     </div>
    //   </footer>

    //   <script src="vendor/jquery/jquery.min.js"></script>
    //   <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    //   <link
    //     rel="stylesheet"
    //     href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    //   ></link>
    // </div>

    <div>
      <div>
        <div className="site-mobile-menu site-navbar-target">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icofont-close js-menu-toggle"></span>
            </div>
          </div>
          <div className="site-mobile-menu-body"></div>
        </div>

        <header
          className="site-navbar js-sticky-header site-navbar-target"
          role="banner"
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-6 col-lg-2">
                <h1 className="mb-0 site-logo">
                  <a href="index.html" className="mb-0">
                    {APP_NAME}
                  </a>
                </h1>
              </div>

              <div className="col-12 col-md-10 d-none d-lg-block">
                <nav
                  className="site-navigation position-relative text-right"
                  role="navigation"
                >
                  <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                    <li className="active">
                      <a href="index.html" className="nav-link">
                        {tabs[0]}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="nav-link">
                        {tabs[1]}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="nav-link">
                        {tabs[2]}
                      </a>
                    </li>

                    <li className="has-children">
                      <a href="blog.html" className="nav-link">
                        User
                      </a>
                      <ul className="dropdown">
                        <li>
                          <a href="blog.html" className="nav-link">
                            Feedbacks
                          </a>
                        </li>
                        <li>
                          <a href="blog-single.html" className="nav-link">
                            Logout
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="col-6 d-inline-block d-lg-none ml-md-0 py-3">
                <a
                  href="#"
                  className="burger site-menu-toggle js-menu-toggle"
                  data-toggle="collapse"
                  data-target="#main-navbar"
                >
                  <span></span>
                </a>
              </div>
            </div>
          </div>
        </header>

        <main id="main">
          <div className="hero-section">
            <div className="wave">
              <svg width="100%" height="auto" viewBox="0 0 1920 355">
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Apple-TV"
                    transform="translate(0.000000, -402.000000)"
                    fill="#FFFFFF"
                  >
                    <path
                      d="M0,439.134243 C175.04074,464.89273 327.944386,477.771974 458.710937,477.771974 C654.860765,477.771974 870.645295,442.632362 1205.9828,410.192501 C1429.54114,388.565926 1667.54687,411.092417 1920,477.771974 L1920,757 L1017.15166,757 L0,757 L0,439.134243 Z"
                      id="Path"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
            <div className="selector-style w-75 text-center mx-auto">
              <GraphComponent></GraphComponent>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </div>
          </div>
        </main>

        <div className="site-section">
          <div className="container">
            <div className="row justify-content-center text-center mb-5">
              <div className="col-md-5">
                <h2 className="section-heading" data-aos="fade-right">
                  {averageDataEng}
                </h2>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4" data-aos="fade-up" data-aos-delay="">
                <div className="feature-1 text-center">
                  <div className="wrap-icon icon-1">
                    <span className="icon la la-users"></span>
                  </div>
                  <h3 className="mb-3">{averages[0]}</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Rem, optio.
                  </p>
                </div>
              </div>
              <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
                <div className="feature-1 text-center">
                  <div className="wrap-icon icon-1">
                    <span className="icon la la-toggle-off"></span>
                  </div>
                  <h3 className="mb-3">{averages[1]}</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Rem, optio.
                  </p>
                </div>
              </div>
              <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-1 text-center">
                  <div className="wrap-icon icon-1">
                    <span className="icon la la-umbrella"></span>
                  </div>
                  <h3 className="mb-3">{averages[2]}</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Rem, optio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="site-section">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="step">
                  <span className="number">01</span>
                  <h3>Sign Up</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Rem, optio.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="step">
                  <span className="number">02</span>
                  <h3>Create Profile</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Rem, optio.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="step">
                  <span className="number">03</span>
                  <h3>Enjoy the app</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Rem, optio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <h3>About {APP_NAME}</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
                ea delectus pariatur, numquam aperiam dolore nam optio dolorem
                facilis itaque voluptatum recusandae deleniti minus animi.
              </p>
              <p className="social">
                <a href="#">
                  <span className="icofont-twitter"></span>
                </a>
                <a href="#">
                  <span className="icofont-facebook"></span>
                </a>
              </p>
            </div>
            <div className="col-md-7 ml-auto">
              <div className="row site-section pt-0">
                <div className="col-md-4 mb-4 mb-md-0">
                  <h3>Navigation</h3>
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">{tabs[0]}</a>
                    </li>
                    <li>
                      <a href="#">{tabs[1]}</a>
                    </li>
                    <li>
                      <a href="#">{tabs[2]}</a>
                    </li>
                    <li>
                      <a href="#">{tabs[3]}</a>
                    </li>
                  </ul>
                </div>

                <div className="col-md-7 mb-4 mb-md-0">
                  <h3>{main[2]}</h3>
                  <Feedback></Feedback>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center text-center">
            <div className="col-md-7">
              <p className="copyright">
                &copy; Copyright {APP_NAME}. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>

      <a href="#" className="back-to-top">
        <i className="icofont-simple-up"></i>
      </a>
    </div>
  );
}

export default App;
