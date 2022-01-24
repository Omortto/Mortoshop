import React from "react";
import NavButton from "./NavButton";

const Navbar = () => {
  return (
    <>
      <NavButton iconShown>Category</NavButton>
      <NavButton iconShown>Collection</NavButton>
      <NavButton iconShown>Focus</NavButton>
      <NavButton>Service Point 1</NavButton>
      <NavButton>Assistance</NavButton>
      <NavButton>Contacts</NavButton>
    </>
  );
};

export default Navbar;
