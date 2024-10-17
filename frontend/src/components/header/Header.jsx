import React from "react";
import { MdOutlineMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMdPaw } from "react-icons/io";

const Header = () => {
  return (
    <header className="bg-red-600 px-40 py-2 text-white flex justify-between">
      <div className="md:hidden lg:hidden">
        <MdOutlineMenu size={30} />
      </div>

      <Link to="/" className="flex gap-3">
        <IoMdPaw size={50} />
        <span className="text-5xl font-bold">Shop</span>
      </Link>

      <ul className="flex gap-4 float-right text-xl font-semibold items-center">
        <li className="">
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/">login or register</Link>
        </li>
        <li className="md:hidden lg:hidden">
          <MdClose size={30} />
        </li>
      </ul>

      <div className="flex items-center">
        <Link>
          <span className="absolute bg-white text-black rounded px-1 text-xs font-bold right-40 z-10">0</span>
          <MdOutlineShoppingCart size={35} className="relative " />
        </Link>
      </div>
    </header>
  );
};

export default Header;
