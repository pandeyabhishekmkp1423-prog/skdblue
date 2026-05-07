import React from 'react';
import { motion } from 'motion/react';

export const BlueprintOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden z-0">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <motion.path
          d="M0 200 L1000 200 M200 0 L200 1000 M0 500 L1000 500 M500 0 L500 1000 M0 800 L1000 800 M800 0 L800 1000"
          stroke="currentColor"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="500"
          cy="500"
          r="300"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M300 300 L700 700 M700 300 L300 700"
          stroke="currentColor"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
};

export const ConstructionParticles = ({ color = "accent" }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            x: Math.random() * 100 + "%", 
            y: "0%" 
          }}
          animate={{ 
            opacity: [0, 0.3, 0],
            y: ["0%", "100%"],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 5
          }}
          className={`absolute w-1 h-1 bg-accent rounded-sm blur-[1px]`}
          style={{ 
            width: Math.random() * 3 + 1 + "px", 
            height: Math.random() * 3 + 1 + "px",
            boxShadow: `0 0 10px ${color === 'accent' ? '#D71920' : '#3D2C8D'}`
          }}
        />
      ))}
    </div>
  );
};

export const ArchitecturalSilhouette = ({ opacity = 0.02 }) => {
  return (
    <div 
      className="absolute bottom-0 right-0 w-full h-1/2 pointer-events-none z-0 flex items-end justify-around"
      style={{ opacity }}
    >
       {[...Array(6)].map((_, i) => (
         <motion.div
           key={i}
           initial={{ height: 0 }}
           whileInView={{ height: (20 + Math.random() * 40) + "%" }}
           viewport={{ once: true }}
           transition={{ duration: 2, delay: i * 0.2 }}
           className="w-16 bg-purple-deep border-t border-x border-purple/20"
           style={{ 
             width: (60 + Math.random() * 100) + "px",
             clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
           }}
         >
            <div className="w-full h-full grid grid-cols-3 grid-rows-10 gap-1 p-2">
               {[...Array(12)].map((_, j) => (
                 <div key={j} className="bg-purple/10 rounded-sm" />
               ))}
            </div>
         </motion.div>
       ))}
    </div>
  );
};
