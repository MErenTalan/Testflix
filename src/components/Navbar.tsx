import Image from "next/image";
import React, { useCallback, useState } from "react";
import NavbarItem from "./navbar/NavbarItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "./navbar/MobileMenu";
import AccountMenu from "./navbar/AccountMenu";
function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
  }, []);

  return (
    <div className="w-full fixed z-40">
      <div
        className="
        px-4
        md:px-16
        py-6
        flex
        flex-row
        items-center
        transition
        duration-55500
        bg-zinc-900
        bg-opacity-90
        "
      >
        <Image
          src="/images/logo.png"
          width={90}
          height={200}
          className="w-auto h-4 lg:h-7"
          alt="Netflix"
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by Languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown className="text-white transition" />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div className="flex flex-row relative items-center gap-2 cursor-pointer">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <Image
                src="/images/default-blue.png"
                alt="avatar"
                width={200}
                height={200}
              />
            </div>
            <BsChevronDown className="text-white transition" />
              <AccountMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
