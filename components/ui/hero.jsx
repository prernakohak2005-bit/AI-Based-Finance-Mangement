"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="pb-20 px-4 text-center">

      {/* Heading */}
      <h1 className="text-6xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
        Manage Your Finance <br /> with Intelligence
      </h1>

      {/* Description */}
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        An AI-powered financial management platform that helps you track,
        analyze, and optimize your spending with real-time insights.
      </p>

      {/* Buttons */}
      <div className="mb-10 flex justify-center gap-4">
        <Link href="/dashboard">
          <Button size="lg" className="px-8">
            Get Started
          </Button>
        </Link>

        <Button size="lg" variant="outline">
          Watch Demo
        </Button>
      </div>

      {/* 3D Hero Image */}
      <div className="flex justify-center perspective-1000">
        <div className="hero-card">
          <Image
            src="/banner.jpeg"
            width={1280}
            height={720}
            alt="Dashboard Preview"
            className="rounded-2xl border"
            priority
          />
        </div>
      </div>

    </div>
  );
};

export default HeroSection;