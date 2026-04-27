"use client";

import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 h-16">
      
      {/* Logo */}
      <Link href="/">
        <Image
          src="/logo.png"
          alt="welth logo"
          width={200}
          height={60}
          className="h-12 w-auto object-contain"
        />
      </Link>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        
        <SignInButton>
          <button className="px-4 py-2 border rounded-md">
            Sign In
          </button>
        </SignInButton>

        <SignUpButton>
          <button className="bg-purple-700 text-white px-4 py-2 rounded-md">
            Sign Up
          </button>
        </SignUpButton>

        <UserButton />

      </div>
    </div>
  );
};

export default Header;