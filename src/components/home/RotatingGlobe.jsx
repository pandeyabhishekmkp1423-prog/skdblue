import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Sphere, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { MapPin, Globe as GlobeIcon } from 'lucide-react';

function Earth() {
  const earthRef = useRef();
  const cloudsRef = useRef();
  
  const [colorMap, normalMap, roughnessMap, cloudsMap] = useLoader(THREE.TextureLoader, [
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (earthRef.current) earthRef.current.rotation.y = t * 0.1;
    if (cloudsRef.current) cloudsRef.current.rotation.y = t * 0.12;
  });

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshPhysicalMaterial 
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          normalScale={[0.5, 0.5]}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      <mesh ref={cloudsRef}>
        <sphereGeometry args={[3.05, 64, 64]} />
        <meshStandardMaterial 
          map={cloudsMap} 
          transparent 
          opacity={0.4} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      <mesh>
        <sphereGeometry args={[3.1, 64, 64]} />
        <meshBasicMaterial color="#A7C7E7" transparent opacity={0.15} side={THREE.BackSide} />
      </mesh>

      {/* Center on India/Lucknow */}
      <group rotation={[0, -Math.PI / 1.7, -0.45]}>
        <group position={[0, 0, 3.08]}>
           <mesh>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial color="#D71920" />
           </mesh>
           <pointLight intensity={8} color="#D71920" distance={2} decay={2} />
        </group>
      </group>
    </group>
  );
}

export default function RotatingGlobe() {
  const [cameraFov, setCameraFov] = useState(40);

  // Responsive FOV adjustment
  useEffect(() => {
    const handleResize = () => {
      setCameraFov(window.innerWidth < 768 ? 55 : 38);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Text Side - High visibility on all screens */}
          <div className="w-full lg:w-1/2 order-1">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
             >
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                  <div className="w-8 md:w-12 h-[2px] bg-red-600" />
                  <span className="text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.5em]">Global Presence</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-primary uppercase leading-[0.9] mb-8 md:mb-12">
                  STRATEGIC <br /> 
                  <span className="text-gray-300">LOCATION</span>
                </h2>
                
                <div className="space-y-6 text-left">
                   <div className="flex items-start gap-5 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg">
                         <MapPin size={22} />
                      </div>
                      <div>
                         <h4 className="text-xl font-bold text-primary uppercase tracking-tight">Lucknow, UP</h4>
                         <p className="text-gray-500 text-sm md:text-base font-light">
                            Developing architectural landmarks in North India's fastest-growing economic corridor.
                         </p>
                      </div>
                   </div>

                   <div className="p-6 md:p-8 bg-gray-50 border border-gray-100 rounded-[2rem] relative group overflow-hidden">
                      <div className="relative z-10">
                         <div className="flex items-center gap-2 mb-3">
                            <GlobeIcon size={16} className="text-red-600" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Region Focus</span>
                         </div>
                         <h5 className="text-lg font-black text-primary uppercase mb-2">Architectural Excellence</h5>
                         <p className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider leading-relaxed">
                            Bridging local heritage with international engineering standards.
                         </p>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>

          {/* Globe Side - Responsive Canvas Height */}
          <div className="w-full lg:w-1/2 order-2 relative h-[380px] sm:h-[500px] md:h-[600px] lg:h-[750px]">
             <div className="h-full w-full touch-none"> {/* touch-none prevents scroll hijacking */}
                <Canvas>
                  <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={cameraFov} />
                  <Suspense fallback={null}>
                    <Environment preset="city" /> 
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1.2} />
                    
                    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                        <Earth />
                    </Float>
                    
                    <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
                  </Suspense>
                </Canvas>
                
                {/* Floating UI Label for the Globe */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                    <div className="flex flex-col items-center">
                        <div className="w-px h-8 bg-gradient-to-b from-red-500 to-transparent mb-2" />
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-red-600 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-red-100 shadow-xl">
                            Lucknow HQ Center
                        </span>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}