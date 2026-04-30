import HeroSection from "@/components/ui/hero";
import { featuresData, statsData } from "@/data/landing";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="mt-40">

      {/* HERO */}
      <HeroSection />

      {/* STATS SECTION */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>

                <div className="text-gray-600">
                  {stat.label}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Everything You Need To Manage Your Finances
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              
              <Card key={index} className="p-6 hover:shadow-lg transition">
                
                <CardContent className="flex flex-col items-center gap-4">

                  {feature.icon}

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

    </div>
  );
}