"use client"

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function MouseSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
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
            radial-gradient(800px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(29, 78, 216, 0.12), 
            transparent 60%),
            radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(124, 58, 237, 0.15),
            transparent 40%),
            radial-gradient(400px at ${mousePosition.x}px ${mousePosition.y}px, 
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