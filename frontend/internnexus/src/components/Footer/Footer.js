import React from "react";
import "../Footer/Footer.scss";
import internnexus from "../../imgsrc/internnexus.png";
// import { SiFacebook, SiInstagram, SiLinkedin, SiMedium } from "react-icons/si";
import {LinkedinOutlined, MediumOutlined, FacebookOutlined, InstagramOutlined} from '@ant-design/icons';

function Footer() {
  return (
    <div className="body">
        <hr></hr>
        <div className="footer">
          <img src={internnexus} className="footerLogo" alt="InternnexusLogo" />
          <div className="footer_icons">
            <LinkedinOutlined className="footerIcons"/>
            <MediumOutlined className="footerIcons" />
            <FacebookOutlined className="footerIcons"/>
            <InstagramOutlined className="footerIcons" />
          </div>
        </div>
    </div>
  );
}

export default Footer;
