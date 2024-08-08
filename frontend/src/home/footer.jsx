import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className=" bg-teal-400  py-2">
      <div className="flex justify-center  gap-5">
        <a
          href="https://www.linkedin.com/in/mayank-singh-a76577266/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            style={{ width: "35px", height: "35px", margin: "10px" }}
          />
        </a>
        <a
          href="https://github.com/Mayank-singh-01"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faGithub}
            style={{ width: "35px", height: "35px", margin: "10px" }}
          />
        </a>
        <a
          href="https://x.com/__mayank_singh_"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faTwitter}
            style={{ width: "35px", height: "35px", margin: "10px" }}
          />
        </a>
        <a
          href="https://www.instagram.com/mayank1._8/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            icon={faInstagram}
            style={{ width: "35px", height: "35px", margin: "10px" }}
          />
        </a>
      </div>
      <div className="text-center font-serif font-bold">©HungerHUB.Inc</div>
    </div>
  );
}

export default Footer;
