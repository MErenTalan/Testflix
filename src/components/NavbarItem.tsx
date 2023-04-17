import React, { FC } from "react";

interface NavbarItemProps {
    label: string;
}

const NavbarItem: FC<NavbarItemProps> = ({
    label
})=>{
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
        <a href="#">{label}</a>
    </div>
  );
}

export default NavbarItem;
