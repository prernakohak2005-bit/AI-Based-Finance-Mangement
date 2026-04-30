import HeroSection from "@/components/ui/hero";
import { featuresData, howItWorksData, statsData, testimonialsData } from "@/data/landing";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mt-32">

      {/* HERO */}
      <HeroSection />

      {/* STATS */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statsData.map((stat, index) => (
              <div key={index}>
                <h3 className="text-3xl font-bold text-blue-600">{stat.value}</h3>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Everything You Need To Manage Your Finances
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition rounded-2xl">
                <CardContent className="flex flex-col items-center gap-4">
                  
                  <div className="text-blue-600 text-3xl">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>

                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksData.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition rounded-2xl">
                <CardContent className="flex flex-col items-center gap-4">

                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl">
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>

                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            What Our Users Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="p-6 rounded-2xl shadow-sm hover:shadow-lg transition">
                <CardContent className="flex flex-col items-center text-center gap-4">

                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>
      <section className="py-20 bg-blue-500">
        <div className="container mx-auto px-4 text-white text-center">

          <h2 className="text-3xl font-bold  text-center mb-4">
            Ready to take Control of Your Finances?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            join thousands of users who are already 
            managing their finances
            smarter with Welth
          </p>
          <Link href="/dashboard">
          <Button
            size="lg"
            className="bg-white text-blue-500 hover:bg-blue-50 animate-bounace"
          >
            Start Free Trial
          </Button>
        </Link>

          </div>
      </section>

    </div>
  );
}