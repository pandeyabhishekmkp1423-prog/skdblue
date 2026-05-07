import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Maximize2, Sparkles } from 'lucide-react';
import { BlueprintOverlay, ConstructionParticles, ArchitecturalSilhouette } from '../common/ArchitecturalEffects';

const projects = [
  {
    id: 'signature-towers',
    title: 'Signature Towers',
    location: 'Gomti Nagar Extension',
    type: 'Ultra-Luxury High-Rise',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
    price: '₹ 3.5 Cr+',
    tag: 'Flagship'
  },
  {
    id: 'vindhyavashini-villas',
    title: 'Vindhyavashini Villas',
    location: 'Shaheed Path',
    type: 'Royal Smart Villas',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    price: '₹ 5.2 Cr+',
    tag: 'Elite'
  },
  {
    id: 'emerald-township',
    title: 'Emerald Township',
    location: 'Sultanpur Road',
    type: 'Themed Smart Township',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',
    price: '₹ 95 Lac+',
    tag: 'Innovative'
  }
];

function ProjectCard({ project, index }) {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 20;
    const y = ((e.clientY - top) / height - 0.5) * 20;
    setCoords({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.8 }}
      className="group perspective-2000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: 0, y: 0 });
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX: coords.y,
        rotateY: -coords.x,
      }}
    >
      <div className="relative aspect-[3/4.5] rounded-[3.5rem] md:rounded-[4.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] transition-all duration-700 bg-primary border-4 border-white/10 lux-glass">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110 opacity-60 group-hover:opacity-100"
        />
        
        {/* Architectural Wireframe Overlay on Hover */}
        <div className="absolute inset-0 architectural-grid opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />

        {/* Status Badges */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12 flex flex-col space-y-4 z-20">
          <span className="px-6 py-2.5 md:px-8 md:py-3 bg-accent text-white shadow-2xl rounded-full text-[9px] font-black uppercase tracking-[0.3em] backdrop-blur-xl border border-white/20">
            {project.tag}
          </span>
        </div>

        {/* Floating Perspective Content */}
        <div 
          className="absolute inset-x-6 bottom-6 md:inset-x-8 md:bottom-8 p-8 md:p-12 glass rounded-3xl md:rounded-[3.5rem] translate-z-50 opacity-0 group-hover:opacity-100 transition-all duration-1000 border border-white/20 shadow-2xl pointer-events-none"
          style={{ transform: 'translateZ(50px)' }}
        >
          <div className="flex items-center justify-between mb-8">
             <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-silver mb-2">Investment Capital</span>
                <span className="text-white font-black text-2xl md:text-3xl tracking-tighter">{project.price}</span>
             </div>
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] bg-accent text-white flex items-center justify-center shadow-2xl"
             >
                <Maximize2 size={20} />
             </motion.div>
          </div>
          <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4">{project.title}</h3>
          <div className="flex items-center gap-3 text-white/50 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em]">
             <motion.div
               animate={{ y: [0, -4, 0] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             >
                <MapPin size={14} className="text-accent" />
             </motion.div>
             <span>{project.location}</span>
          </div>
        </div>
        
        {/* Rich Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-deep via-purple-deep/40 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-1000" />
      </div>

      {/* External Info Layer */}
      <div className="mt-10 md:mt-14 px-6 md:px-8 flex justify-between items-start">
         <div className="space-y-2 md:space-y-3">
            <h3 className="text-2xl md:text-3xl font-black text-primary uppercase tracking-tighter group-hover:text-purple transition-colors duration-700 leading-none">{project.title}</h3>
            <div className="flex items-center gap-4">
               <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-purple/40">{project.type}</span>
               <div className="w-12 md:w-16 h-px bg-purple/20" />
            </div>
         </div>
         <div className="text-right">
            <span className="text-accent font-black text-2xl md:text-3xl tracking-tighter block mb-1">{project.price}</span>
            <div className="flex items-center justify-end gap-2 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-purple/20">
               <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
               RERA COMPLIANT
            </div>
         </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  return (
    <section 
      className="py-24 md:py-32 bg-luxury-white relative overflow-hidden"
      onMouseMove={(e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      }}
    >
      {/* Mouse Follow Glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-30 transition-opacity duration-1000 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(61,44,141,0.08), transparent 80%)`
        }}
      />

      <div className="absolute inset-0 architectural-grid-light opacity-5 pointer-events-none" />
      <BlueprintOverlay />
      <ConstructionParticles color="#3D2C8D" />
      <ArchitecturalSilhouette opacity={0.03} />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header Enhancement */}
        <div className="flex flex-col xl:flex-row justify-between items-end mb-20 md:mb-32 gap-12 text-left">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 mb-8"
            >
              <div className="flex items-center gap-2">
                 <div className="w-12 h-px bg-purple shadow-[0_0_10px_#3D2C8D]" />
                 <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              </div>
              <span className="text-purple text-[10px] font-black uppercase tracking-[0.6em] drop-shadow-sm">The Distinguished Portfolio</span>
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-primary uppercase leading-[0.8] perspective-1000">
              ARCHITECTURAL <br /> <span className="text-gradient-purple">MONOLITHS</span>
            </h2>
          </div>
          
          <Link to="/projects" className="group relative px-10 py-6 bg-purple-deep rounded-2xl shadow-2xl shadow-purple/20 overflow-hidden transition-all duration-700">
            <div className="flex items-center gap-4 relative z-10">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Full Inventory</span>
               <ArrowRight size={18} className="text-silver group-hover:translate-x-3 transition-transform duration-500" />
            </div>
            <div className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 opacity-20" />
          </Link>
        </div>

        {/* Dense Responsive Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-20">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Immersive Section Footer */}
        <div className="mt-32 md:mt-48 relative">
           <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent" />
           <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative z-10 flex flex-col items-center"
           >
              <Link to="/contact" className="p-10 md:p-16 rounded-[2.5rem] md:rounded-[4rem] lux-glass-light border border-purple/10 group hover:border-purple hover:shadow-2xl transition-all duration-700 flex flex-col items-center gap-6 md:gap-8 text-center max-w-2xl mb-12">
                 <motion.div
                   animate={{ 
                     y: [0, -15, 0],
                     rotate: [0, 5, -5, 0]
                   }}
                   transition={{ 
                     duration: 6, 
                     repeat: Infinity, 
                     ease: "easeInOut" 
                   }}
                 >
                    <Sparkles className="text-accent w-10 h-10 md:w-16 md:h-16 mb-2" />
                 </motion.div>
                 <h4 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tighter">Private Preview Awaits</h4>
                 <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary/60 leading-loose max-w-md">
                    Request an exclusive tour of our active construction sites and experience the engineering artistry first-hand.
                 </p>
              </Link>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
