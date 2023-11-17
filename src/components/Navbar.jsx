import React from "react";
import { Link } from "react-router-dom";
import '../stylesheet/index.css'
const Navbar = () => {
  const nav = [
    { page: "Home", to: "/" },
    { page: "Login", to: "/login" },
    { page: "profile", to: "/profile" },
  ];

  return (
    <>
      <header className="containerNav container">
        <nav>
        <Link to={'/'}>
          <h1>Logo</h1>
        </Link>
        <div className="nav">
          {nav.map((page) => (
            <Link key={page.page} to={page.to}>
              {page.page}
            </Link>
          ))}
        </div>
          </nav>
      </header>
    </>
  );
};

export default Navbar;
