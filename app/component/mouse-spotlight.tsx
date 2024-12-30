"use client"

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function MouseSpotlight() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()

  useEffect(() => {
    // Mouse events
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    // Touch events
    const updateTouchPosition = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        setPosition({ x: touch.clientX, y: touch.clientY })
      }
    }

    // Add both mouse and touch event listeners
    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('touchstart', updateTouchPosition)
    window.addEventListener('touchmove', updateTouchPosition)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('touchstart', updateTouchPosition)
      window.removeEventListener('touchmove', updateTouchPosition)
    }
  }, [])

  if (theme !== 'dark') return null

  return (
    <>
      {/* Primary spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{
          background: `
            radial-gradient(800px at ${position.x}px ${position.y}px, 
            rgba(29, 78, 216, 0.12), 
            transparent 60%),
            radial-gradient(600px at ${position.x}px ${position.y}px, 
            rgba(124, 58, 237, 0.15),
            transparent 40%),
            radial-gradient(400px at ${position.x}px ${position.y}px, 
            rgba(236, 72, 153, 0.1), 
            transparent 30%)
          `
        }}
      />
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none fixed inset-0 z-20"
        style={{
          background: `
            radial-gradient(circle at 15% 50%, 
            rgba(29, 78, 216, 0.08), 
            transparent 25%),
            radial-gradient(circle at 85% 30%, 
            rgba(124, 58, 237, 0.08), 
            transparent 25%)
          `
        }}
      />
    </>
  )
} 