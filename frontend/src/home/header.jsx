import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./app.css";
import { useCart } from "../components/contextReducer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const navigate = useNavigate();
  const cartItems = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/LogIn");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-teal-400 font-bold text-xl text-white z-50 p-4 fixed top-0 w-full">
      <div className="flex justify-between items-center">
        <div className="block sm:hidden">
          <span className="font-serif pl-4 text-2xl text-red-600">H</span>unger
          <span className="font-serif text-2xl text-red-600">H</span>UB
        </div>
        <div className="block sm:hidden mr-5 cursor-pointer">
          <FontAwesomeIcon onClick={toggleMenu} icon={faBars} />
        </div>
        <div className="hidden sm:flex flex-grow justify-between items-center">
          <ul className="flex text-xl gap-4">
            <li>
              <NavLink
                to="/"
                exact="true"
                className="custom-button2 px-3 py-1.5 ml-7 cursor-pointer"
              >
                Home
              </NavLink>
            </li>
            {localStorage.getItem("authToken") && (
              <li>
                <NavLink
                  to="/MyOrder"
                  className="custom-button2 py-1.5 cursor-pointer"
                >
                  MyOrder
                </NavLink>
              </li>
            )}
          </ul>
          <div className="font-serif font-bold">
            <span className=" text-3xl text-red-600">H</span>
            unger
            <span className="text-3xl text-red-600">H</span>UB
          </div>
          {!localStorage.getItem("authToken") ? (
            <div className="flex items-center gap-4">
              <NavLink to="/CreatUser" className="custom-button cursor-pointer">
                SignUp
              </NavLink>
              <NavLink to="/LogIn" className="custom-button cursor-pointer">
                LogIn
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink to="/MyCart" className="custom-button2 cursor-pointer">
                MyCart
                <span className="cart-count">{cartItems.length}</span>
              </NavLink>
              <NavLink
                onClick={handleLogout}
                className="custom-button cursor-pointer"
              >
                LogOut
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <div
        className={`sm:hidden fixed top-0 right-0 h-full bg-teal-400 bg-opacity-70 z-40 transition-transform transform ${
          isMenuOpen ? "translate-x-0 w-3/5" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <FontAwesomeIcon
            onClick={toggleMenu}
            icon={faBars}
            className="cursor-pointer mr-5"
          />
        </div>
        <ul className="flex flex-col text-xl mt-5 gap-8 p-7">
          <li onClick={handleMenuItemClick}>
            <NavLink
              to="/"
              exact="true"
              className="custom-button2 px-7 py-1.5 cursor-pointer w-full text-center"
            >
              Home
            </NavLink>
          </li>
          {localStorage.getItem("authToken") && (
            <li onClick={handleMenuItemClick}>
              <NavLink
                to="/MyOrder"
                className="custom-button2 px-3.5 py-1.5 cursor-pointer w-full text-center"
              >
                MyOrder
              </NavLink>
            </li>
          )}
          {!localStorage.getItem("authToken") ? (
            <>
              <li onClick={handleMenuItemClick}>
                <NavLink
                  to="/CreatUser"
                  className="custom-button px-5 py-1.5 cursor-pointer w-full text-center"
                >
                  SignUp
                </NavLink>
              </li>
              <li onClick={handleMenuItemClick}>
                <NavLink
                  to="/LogIn"
                  className="custom-button px-7 cursor-pointer w-full text-center"
                >
                  LogIn
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li onClick={handleMenuItemClick}>
                <NavLink
                  to="/MyCart"
                  className="custom-button2 py-1.5 cursor-pointer w-full text-center"
                >
                  MyCart
                  <span className="cart-count">{cartItems.length}</span>
                </NavLink>
              </li>
              <li onClick={handleLogout}>
                <NavLink className="custom-button px-6 py-2 cursor-pointer w-full text-center">
                  LogOut
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
