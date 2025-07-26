import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const slides = [
  {
    id: 1,
    title: "Find Your Dream Scholarship",
    subtitle: "Connect with top universities worldwide",
    description: "Access thousands of scholarships from prestigious institutions across the globe. Your future starts here.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&h=600&fit=crop",
    cta: "Explore Scholarships",
    ctaLink: "/scholarships"
  },
  {
    id: 2,
    title: "Full Funding Available",
    subtitle: "Study abroad with complete financial support",
    description: "Discover fully-funded scholarship opportunities that cover tuition, living expenses, and more.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=600&fit=crop",
    cta: "View Full Scholarships",
    ctaLink: "/scholarships?type=full-fund"
  },
  {
    id: 3,
    title: "Join 50,000+ Success Stories",
    subtitle: "Students worldwide trust our platform",
    description: "Be part of a growing community of scholars who achieved their dreams through our platform.",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1200&h=600&fit=crop",
    cta: "Get Started Today",
    ctaLink: "/auth"
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[600px] overflow-hidden bg-gradient-to-r from-blue-900 to-blue-800">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <div className="text-blue-200 text-lg font-medium mb-2 animate-fade-in">
                  {slide.subtitle}
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-scale-in">
                  {slide.title}
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed animate-fade-in">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-[#009b5d] hover:bg-[#009b5d] text-lg px-8 py-6">
                    <Link to={slide.ctaLink}>{slide.cta}</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white text-black hover:bg-white hover:text-[#009b5d] text-lg px-8 py-6">
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>

                {/* Statistics */}
                <div className="flex flex-wrap gap-8 mt-12 text-white">
                  <div className="flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-400 fill-current" />
                    <div>
                      <div className="text-2xl font-bold">4.9</div>
                      <div className="text-sm text-blue-200">Average Rating</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-blue-400" />
                    <div>
                      <div className="text-2xl font-bold">50K+</div>
                      <div className="text-sm text-blue-200">Students Helped</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-yellow-400" />
                    <div>
                      <div className="text-2xl font-bold">1000+</div>
                      <div className="text-sm text-blue-200">Scholarships</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
              ? 'bg-white scale-125'
              : 'bg-white/50 hover:bg-white/75'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;