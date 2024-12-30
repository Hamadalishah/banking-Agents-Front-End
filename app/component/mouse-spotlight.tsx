// components/MouseSpotlight.tsx

"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import { cn } from './ui/utilis';

const MouseSpotlight: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [circlePos, setCirclePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();
  const animationFrameId = useRef<number | null>(null);

  // Track mouse and touch movements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      checkHover(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setMousePos({ x: touch.clientX, y: touch.clientY });
        checkHover(touch.clientX, touch.clientY);
      }
    };

    const checkHover = (x: number, y: number) => {
      const element = document.elementFromPoint(x, y);
      if (element && element.classList.contains('hover-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Animate the circle to follow the mouse with a little delay
  useEffect(() => {
    const easing = 0.80; // Adjust this value for trailing speed

    const animate = () => {
      setCirclePos(prev => ({
        x: prev.x + (mousePos.x - prev.x) * easing,
        y: prev.y + (mousePos.y - prev.y) * easing,
      }));
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [mousePos]);

  if (theme !== 'dark') return null; // Only show in dark mode

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      {/* Trailing Circle */}
      <div
        className={cn(
          "absolute rounded-full transition-all duration-200",
          isHovering
            ? "bg-spotlight-moving shadow-[0_0_50px_rgba(255,255,255,0.8)] w-50 h-50"
            : "bg-spotlight-idle shadow-[0_0_30px_rgba(70,130,180,0.7)] w-38 h-38"
        )}
        style={{
          top: `${circlePos.y - (isHovering ? 100 : 75)}px`, // Center the circle
          left: `${circlePos.x - (isHovering ? 100 : 75)}px`,
        }}
      />

      {/* Dot */}
      <div
        className={cn(
          "absolute rounded-full transition-all duration-50",
          isHovering ? "hidden" : "block"
        )}
        style={{
          width: '20px',
          height: '20px',
          top: `${mousePos.y - 10}px`, // Center the dot
          left: `${mousePos.x - 10}px`,
          backgroundColor: 'rgba(0, 150, 255, 1)', // Dot color from Tailwind config
          boxShadow: '0 0 10px rgba(0,150,255,0.8)', // Dot shadow from Tailwind config
        }}
      />
    </div>
  );
};

export default MouseSpotlight;
