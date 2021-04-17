import React, { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });

    // remove the previos listener before adding another event listener to the screen
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png"
        alt="Netflix logo"
      />
      <img
        className="nav__avatar"
        src="https://pbs.twimg.com/media/CW2i0pJW4AEYFI3.png"
        alt="Netflix logo"
      />
    </div>
  );
}

export default Navbar;
