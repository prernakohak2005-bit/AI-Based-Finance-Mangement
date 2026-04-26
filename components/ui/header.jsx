"use client";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      
      {/* Always show Sign In */}
      <SignInButton />

      {/* Sign Up button */}
      <SignUpButton>
        <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
          Sign Up
        </button>
      </SignUpButton>

      {/* User profile button */}
      <UserButton />

    </header>
  );
};

export default Header;