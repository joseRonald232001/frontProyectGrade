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
      <header className="flex ">
        <Link to={'/'}>
          <h1>Logo</h1>
        </Link>
        <nav className="">
          {nav.map((page) => (
            <Link key={page.page} to={page.to}>
              {page.page}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
