
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
  secondaryCtaText,
  secondaryCtaLink,
}) => {
  return (
    <div
      className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="container-custom relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
          {title}
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button
            asChild
            className="bg-brand-gold text-brand-white hover:bg-brand-gold/90 text-lg px-8 py-6"
            size="lg"
          >
            <Link to={ctaLink}>{ctaText}</Link>
          </Button>
          
          {secondaryCtaText && secondaryCtaLink && (
            <Button
              asChild
              variant="outline"
              className="border-white text-brand-blue hover:bg-white/20 text-lg px-8 py-6"
              size="lg"
            >
              <Link to={secondaryCtaLink}>{secondaryCtaText}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
