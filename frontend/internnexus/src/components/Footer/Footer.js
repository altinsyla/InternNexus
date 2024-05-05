import React from "react";
import "../Footer/Footer.scss";
import "../../styles/_globals.scss";
import internnexus from "../../imgsrc/internnexus.png";
// import { SiFacebook, SiInstagram, SiLinkedin, SiMedium } from "react-icons/si";
import {
  LinkedinOutlined,
  MediumOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

import DensityMediumIcon from '@mui/icons-material/DensityMedium';

function Footer() {
  return (
    <div className="body">
      <hr></hr>
      <div className="footer">
        <img src={internnexus} className="footerLogo" alt="InternnexusLogo" />
        <div className="footer_icons">
          <a
            href="https://medium.com/@altinsyla11"
            target="_blank"
            className="hreflinknodecoration"
          >
            <LinkedinOutlined className="footerIcons"></LinkedinOutlined>
          </a>

          <a
            href="https://medium.com/@altinsyla11"
            target="_blank"
            className="hreflinknodecoration"
          >
            <MediumOutlined className="footerIcons" />
          </a>

          <a
            href="https://medium.com/@altinsyla11"
            target="_blank"
            className="hreflinknodecoration"
          >
            <FacebookOutlined className="footerIcons" />
          </a>

          <a
            href="https://medium.com/@altinsyla11"
            target="_blank"
            className="hreflinknodecoration"
          >
            <InstagramOutlined className="footerIcons" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
