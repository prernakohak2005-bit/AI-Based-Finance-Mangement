"use client";

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { LayoutDashboard, PenBox } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <div className="flex justify-between items-center p-4 h-16 border-b">

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

      {/* Right Side */}
      <div className="flex items-center gap-3">

        {!isSignedIn ? (
          <>
            <SignInButton mode="modal">
              <button className="px-4 py-2 border rounded-md hover:bg-gray-100 transition">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition">
                Sign Up
              </button>
            </SignUpButton>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 border px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 transition"
            >
              <LayoutDashboard size={18} />
              <span className="hidden sm:block">Dashboard</span>
            </Link>

            <Link
              href="/transaction/create"
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              <PenBox size={18} />
              <span className="hidden sm:block">Add Transaction</span>
            </Link>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
              afterSignOutUrl="/"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;