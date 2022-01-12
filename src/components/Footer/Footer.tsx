import React from "react";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        <a target="_blank" href="https://www.buymeacoffee.com/PeterLiu">
          Buy me a coffee
        </a>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a target="_blank" href="https://www.linkedin.com/in/peter-ty-liu">
          Contact
        </a>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a target="_blank" href="https://www.SweepThoseMines.com">
          Minesweeper
        </a>
      </p>
      <p>version 1.2 (12/01/2022)</p>
    </footer>
  );
}
