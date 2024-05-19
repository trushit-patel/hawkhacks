import React from "react";
import neureloLogo from "../assets/images/neurelo.png";
import Hawkhacks from "../assets/images/hawkhacks.png";
function Footer() {
  return (
    <footer
      className="py-4 rounded-full shadow-lg"
      style={{
        backgroundColor: "#D875C7",
        marginTop: 20,
        bottom: 10,
        left: 10,
        right: 10,
      }}
    >
      <div className="container mx-auto text-center">
        <p className="text-white">
          Made with
          <img
            src={neureloLogo}
            alt="Neurelo"
            className="h-8 inline-block mx-2"
          />
          Hack at{" "}
          <img
            src={Hawkhacks}
            alt="Hawkhacks"
            className="h-10 inline-block mx-2"
          />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
