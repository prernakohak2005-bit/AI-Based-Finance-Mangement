"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="pb-20 px-4 text-center">

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Manage Your Finance <br /> with Intelligence
      </h1>

      {/* Description */}
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        An AI-powered financial management platform that helps you track,
        analyze, and optimize your spending with real-time insights.
      </p>

      {/* Button */}
      <div className="mb-10">
        <Link href="/dashboard">
          <Button size="lg" className="px-8">
            Get Started
          </Button>
        </Link>
      </div>

      {/* Image */}
      <div>
        <Image
          src="/banner.jpeg"
          width={1280}
          height={720}
          alt="Dashboard Preview"
          className="rounded-lg shadow-2xl border mx-auto"
          priority
        />
      </div>

    </div>
  );
};

export default HeroSection;