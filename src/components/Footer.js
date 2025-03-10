import React from "react";
import "./Contact.css";

const Contact = () => (
  <div className="footer-container">
    <a
      href="enterprise.bellatoka.app/login"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={`${process.env.PUBLIC_URL}/images/footer/enterprise.png`}
        alt="Enterprise"
        className="footer-icon"
      />
    </a>
    <a
      href="user.bellatoka.app/login"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={`${process.env.PUBLIC_URL}/images/footer/user.png`}
        alt="User"
        className="footer-icon"
      />
    </a>
    <a
      href="https://github.com/corviato1/bellatokaapp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={`${process.env.PUBLIC_URL}/images/footer/github.png`}
        alt="Github"
        className="footer-icon"
      />
    </a>
  </div>
);

export default Contact;
