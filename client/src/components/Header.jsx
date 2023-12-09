import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Header = () => {
  return (
    <div className="bg-slate-200 flex-row p-2 px-[2%]">
      <Link to="/" className="flex justify-between flex-row items-center">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500 ">Real</span>
          <span className="text-slate-700 ">Estates</span>
        </h1>
        <form className="bg-slate-100 p-3 rounded-lg flex-item-center flex items-center gap-2">
          <input
            type="text"
            placeholder="Search Property"
            className="bg-transparent w-24 sm:w-64 border outline-none px-2"
          />
          <FaSearch />
        </form>
        <ul className="flex gap-4">
          <Link
            to="/"
            className="text-slate-700 cursor-pointer hover:underline"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-slate-700 cursor-pointer hover:underline"
          >
            About
          </Link>
          <Link
            to="/sign-in"
            className="text-slate-700 cursor-pointer hover:underline"
          >
            Login
          </Link>
        </ul>
      </Link>
    </div>
  );
};

export default Header;
