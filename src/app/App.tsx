import { Leaf, Droplet, Award, Stethoscope, Shield } from 'lucide-react';
import { FeatureCard } from './components/FeatureCard';
import { StatCard } from './components/StatCard';
import { CTAButton } from './components/CTAButton';
import { ImageWithFallback } from "./components/ImageWithFallback";
import { ImageComparisonSlider } from './components/ImageComparisonSlider';
import kibbleImage from "../assets/93ef747f6772a3fdaf73e5c2e849183565bd4fe0.png";
import rawFoodImage from "../assets/7c91e0c2df328ef98cb278616fe16887a5518c7f.png";
import designImage1 from "../assets/6136b8cbaf00668ccc9824e4a89f2de6355161fb.png";
import designImage2 from "../assets/9a4409f684a5519dabc916a48f3dd3616198aa78.gif";
import designImage3 from "../assets/WA_1773150741173.jpeg";

export default function App() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">What makes us different</h1>
          <h2 className="text-3xl md:text-4xl font-bold">makes them stronger</h2>
        </div>

        {/* Features Grid with Central Image - Desktop */}
        <div className="hidden md:block relative max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-2 gap-x-32 gap-y-24 items-center">
            {/* Top Left - Real Food */}
            <div className="flex justify-end">
              <FeatureCard
                icon={<Leaf className="w-6 h-6 text-green-700" />}
                iconBgColor="bg-green-100"
                title="Real Food"
                description="Wholesome recipes for dogs with real meats and recipes."
              />
            </div>

            {/* Top Right - Made Fresh */}
            <div className="flex justify-start">
              <FeatureCard
                icon={<Droplet className="w-6 h-6 text-blue-700" />}
                iconBgColor="bg-blue-100"
                title="Made Fresh"
                description="We promise maintaining the integrity of whole foods and nutrients."
              />
            </div>

            {/* Bottom Left - Premium Ingredient */}
            <div className="flex justify-end">
              <FeatureCard
                icon={<Award className="w-6 h-6 text-amber-700" />}
                iconBgColor="bg-amber-100"
                title="Premium Ingredient"
                description="Sourcing premium with wholesomeness and quality."
              />
            </div>

            {/* Bottom Right - Vet Developed */}
            <div className="flex justify-start">
              <FeatureCard
                icon={<Stethoscope className="w-6 h-6 text-pink-700" />}
                iconBgColor="bg-pink-100"
                title="Vet Developed"
                description="We take the bar for dog nutrition, delivering healthy and holistic."
              />
            </div>
          </div>

          {/* Central Circular Image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full overflow-hidden shadow-2xl border-8 border-white">
            <ImageComparisonSlider
              baseImage={kibbleImage}
              overlayImage={rawFoodImage}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Features Mobile Layout */}
        <div className="md:hidden mb-12">
          {/* Central Image First on Mobile */}
          <div className="w-56 h-56 mx-auto rounded-full overflow-hidden shadow-2xl border-8 border-white mb-8">
            <ImageComparisonSlider
              baseImage={kibbleImage}
              overlayImage={rawFoodImage}
              className="w-full h-full"
            />
          </div>

          {/* Features as Vertical List */}
          <div className="space-y-6 max-w-md mx-auto">
            <FeatureCard
              icon={<Leaf className="w-6 h-6 text-green-700" />}
              iconBgColor="bg-green-100"
              title="Real Food"
              description="Wholesome recipes for dogs with real meats and recipes."
            />
            <FeatureCard
              icon={<Droplet className="w-6 h-6 text-blue-700" />}
              iconBgColor="bg-blue-100"
              title="Made Fresh"
              description="We promise maintaining the integrity of whole foods and nutrients."
            />
            <FeatureCard
              icon={<Award className="w-6 h-6 text-amber-700" />}
              iconBgColor="bg-amber-100"
              title="Premium Ingredient"
              description="Sourcing premium with wholesomeness and quality."
            />
            <FeatureCard
              icon={<Stethoscope className="w-6 h-6 text-pink-700" />}
              iconBgColor="bg-pink-100"
              title="Vet Developed"
              description="We take the bar for dog nutrition, delivering healthy and holistic."
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <CTAButton text="Get your dog a healthy meal today!" />
          
          {/* Money Back Guarantee */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Shield className="w-4 h-4" />
            <span>31 day money-back guarantee</span>
          </div>
        </div>
      </section>

      {/* Nutrition Foundation Section */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">
                Nutrition is the foundation for longer, healthier lives in dogs.
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6 md:mb-8">
                Invest in your dog's future with our scientifically formulated superfood-powered supplements. Give them the life they deserve—and watch as they thrive with more energy, a shinier coat, a healthier gut, and that loving, playful spirit.
              </p>

              <div className="mb-6 md:mb-8">
                <h3 className="font-semibold text-lg mb-4">Key Points:</h3>
                <div className="space-y-4 md:space-y-6">
                  <StatCard
                    percentage="97%"
                    description="Dogs showed say they feel more confident feeding brands because of not having harmful ingredients and deficiencies those brands have."
                  />
                  <StatCard
                    percentage="84%"
                    description="Our dog food provides superior nutrition and a powerful prebiotics the optimal nutrient absorption."
                  />
                  <StatCard
                    percentage="92%"
                    description="Our dog food's high protein and fat digestibility contribute to lean muscle bodies and satiety."
                  />
                </div>
              </div>

              <div className="flex justify-center lg:justify-start">
                <CTAButton text="Give your furry friend the gift of wholesome nutrition" />
              </div>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-xl h-64 md:h-96 lg:h-auto">
              <ImageWithFallback
                src={designImage1}
                alt="Nutrition section image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gastrointestinal Health Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl h-64 md:h-96 lg:h-auto">
              <ImageWithFallback
                src={designImage2}
                alt="Gastrointestinal health section image"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">
                Improve overall gastrointestinal health for better nutrient absorption
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Through rigorous scientific studies and consultations with veterinarians, we've zeroed in on the most pressing factors that determine a dog's health: the health challenges prevalent in dogs. A staggering 87% of us customers have noticed significant improvements in their dogs' health and happiness, my product line that tells.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prebiotics Section */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">
                Prebiotics nourish the beneficial gut bacteria, supporting digestive health
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our dog food formula contains carefully selected prebiotics that work in harmony with the gut microbiota, providing the necessary nutrients for beneficial bacteria that supports your dog's overall digestive health.
              </p>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-xl h-64 md:h-96 lg:h-auto">
              <ImageWithFallback
                src={designImage3}
                alt="Prebiotics section image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}