import "./Home.scss";
import NavigationBar from "../NavigationBar";
// import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div id="body">
      <NavigationBar />
      <div className="banner">
        <div className="banner_main">
          {/* */}
          <div className="banner_maindiv">
            <div>
              <h1 className="fontbold">
                {/*fontbold osht ni klass mrena _globals qe e bon font-family = poppins_bold */}
                Quickest way to hire fit remote developer
              </h1>
              <br></br>
              <p className="fontthin">
                {/*fontthin osht ni klass mrena _globals qe e bon font-family = poppins_thin (teksi osht me weight ma tult)*/}
                Start your team with developers of your needs.
              </p>
            </div>
            <div className="banner_buttondiv">
              <button className="button_findintern">
                Register your company
              </button>
              <button className="button_registercompany">Find an Intern</button>
            </div>
          </div>
        </div>
        <div className="banner_bannerPhoto">
          <img
            src={require("./img/man_laptop.jpeg")}
            alt="Photo"
            style={{ height: 400 }}
          ></img>
        </div>
      </div>

      <h1 className="poweredby">POWERED BY</h1>

      <div className="ph_grid">
        <div className="poweredbygrid">
          <img src={require("./img/gjirafalab.png")} className="gridphotos img1"></img>
          <img src={require("./img/frakton.png")} className="gridphotos img2"></img>
          <img src={require("./img/ict.png")} className="gridphotos img3"></img>
          <img src={require("./img/solaborate.png")} className="gridphotos img4"></img>
          <img src={require("./img/starlabs.png")} className="gridphotos img5"></img>
          <img src={require("./img/xponent.jpg")} className="gridphotos img6"></img>
        </div>
      </div>
      <h3 className="poweredby">MEET OUR DEVS</h3>
    </div>
  );
}

export default Home;
