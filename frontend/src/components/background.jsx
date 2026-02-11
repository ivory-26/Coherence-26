import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

const Background = () => {
  // Generate stars - memoized to prevent re-renders
  const stars = useMemo(() => Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() > 0.9 ? 2.5 : Math.random() > 0.7 ? 1.5 : 1,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
  })), []);

  // Generate fireflies - fewer and smoother
  const fireflies = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 3 + Math.random() * 3,
    duration: 8 + Math.random() * 8,
    delay: Math.random() * 5,
    color: Math.random() > 0.5 ? "#60a5fa" : "#a78bfa",
  })), []);

  // Generate floating particles - slower
  const particles = useMemo(() => Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 25 + Math.random() * 15,
    delay: Math.random() * 15,
  })), []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Deep space gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #050510 0%, #0a0a20 20%, #1a103d 50%, #2d1b4e 75%, #1a1a2e 100%)",
        }}
      />

      {/* Animated nebula clouds - very slow */}
      <motion.div 
        className="absolute top-0 -left-1/4 w-200 h-200 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(19,92,246,0.4) 0%, rgba(88,28,135,0.2) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute -bottom-1/4 -right-1/4 w-175 h-175 rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(30,64,175,0.2) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-125 h-125 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.3) 0%, rgba(124,58,237,0.15) 40%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Stars layer - gentle twinkling */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Shooting stars - occasional */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(1)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-25 h-px"
            style={{
              top: `${15 + i * 30}%`,
              left: "-10%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
              transform: "rotate(-45deg)",
            }}
            animate={{
              x: ["0vw", "120vw"],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 8 + i * 12,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Fireflies - smooth floating */}
      <div className="absolute inset-0 pointer-events-none">
        {fireflies.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}, 0 0 ${particle.size * 4}px ${particle.color}`,
            }}
            animate={{
              y: [0, -20, 5, -10, 0],
              x: [0, 10, -8, 5, 0],
              opacity: [0.4, 0.7, 0.5, 0.8, 0.4],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating dust particles - very slow rise */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-purple-300/20"
            style={{
              left: `${particle.x}%`,
              bottom: "-5%",
              width: particle.size,
              height: particle.size,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -1200],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Mystical orbital rings - very slow rotation */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-225 h-225 opacity-10 pointer-events-none">
        <motion.div 
          className="absolute inset-0 border border-purple-500/40 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_10px_#a78bfa]" />
        </motion.div>
        <motion.div 
          className="absolute inset-20 border border-blue-500/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa]" />
        </motion.div>
        <motion.div 
          className="absolute inset-40 border border-indigo-500/15 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Bottom glow */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-75"
        style={{
          background: "linear-gradient(to top, rgba(9,72,246,0.1) 0%, transparent 100%)",
        }}
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
    </div>
  )
}

export default Background