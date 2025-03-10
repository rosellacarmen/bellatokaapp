import React from "react";
import "../styles/footer.css";

const links = [
  {
    url: "enterprise.bellatoka.app/login",
    imageSrc: `${process.env.PUBLIC_URL}/images/footer/enterprise.png`,
    altText: "Enterprise Login"
  },
  {
    url: "user.bellatoka.app/login",
    imageSrc: `${process.env.PUBLIC_URL}/images/footer/user.png`,
    altText: "User Login"
  },
  {
    url: "https://github.com/corviato1/bellatokaapp",
    imageSrc: `${process.env.PUBLIC_URL}/images/footer/github.png`,
    altText: "GitHub Repository"
  }
];

const Footer = () => (
  <div className="footer-container">
    {links.map((link, index) => (
      <a
        key={index} // Unique key for each link
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={link.imageSrc}
          alt={link.altText}
          title={link.altText}
          className="footer-icon"
        />
      </a>
    ))}
  </div>
);

export default Footer;