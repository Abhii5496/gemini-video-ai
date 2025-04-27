import React from "react";

export const StylishCard = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Card content */}
      <div className="relative bg-gray-900 rounded-lg p-6 shadow-xl z-10">
        {children}
      </div>

      {/* Animated border lines */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        {/* Top border */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-border-x"></div>

        {/* Right border */}
        <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-border-y"></div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-border-x-reverse"></div>

        {/* Left border */}
        <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent animate-border-y-reverse"></div>
      </div>
    </div>
  );
};

export default function Example() {
  return (
    <div className="p-8">
      <StylishCard className="w-80">
        <h3 className="text-xl font-semibold text-white">Stylish Card Title</h3>
        <p className="mt-4 text-gray-300">
          This card has a cool animated border with moving lines on the edges.
        </p>
      </StylishCard>
    </div>
  );
}
