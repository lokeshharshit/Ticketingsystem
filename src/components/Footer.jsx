import React from "react";
import '../styles/footer.css'

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 w-100 mt-auto">
      <p className="mb-0">© {new Date().getFullYear()} MyApp. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
