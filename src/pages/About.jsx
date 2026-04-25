import React from 'react';
import { motion } from 'framer-motion';

const B = import.meta.env.BASE_URL;

const About = () => {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '40px', fontFamily: "'Playfair Display', serif" }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '3.5rem', color: '#ecfccb', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
        >
            Our Roots
        </motion.h1>
        
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ 
                background: 'rgba(255, 255, 255, 0.15)', 
                backdropFilter: 'blur(10px)',
                padding: '30px', 
                borderRadius: '15px', 
                marginBottom: '40px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
        >
            <p style={{ fontSize: '1.3rem', lineHeight: '1.8', color: 'white', margin: 0, fontWeight: '500', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                Founded in 2026, DvBakes & Organics started with a simple mission: to bring the freshest, most ethically sourced produce directly from local farms to your table. We believe that food should not only taste good but do good.
            </p>
        </motion.div>

        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ height: '400px', background: '#e2e8f0', borderRadius: '20px', overflow: 'hidden', position: 'relative', marginBottom: '40px' }}
        >
             {/* Farm Video */}
             <video 
               src={`${B}videos/v1.mp4`} 
               autoPlay 
               muted 
               loop 
               playsInline
               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
             />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', textAlign: 'left' }}>
            <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                style={{ 
                    padding: '20px', 
                    background: 'rgba(255, 255, 255, 0.15)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px', 
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' 
                }}
            >
                <h3 style={{ color: '#bef264', marginTop: 0, fontSize: '1.4rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>100% Organic</h3>
                <p style={{ color: 'white', fontSize: '1.1rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>No pesticides, no synthetic fertilizers. Just pure, natural growth.</p>
            </motion.div>
            <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                style={{ 
                    padding: '20px', 
                    background: 'rgba(255, 255, 255, 0.15)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px', 
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' 
                }}
            >
                <h3 style={{ color: '#bef264', marginTop: 0, fontSize: '1.4rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Community First</h3>
                <p style={{ color: 'white', fontSize: '1.1rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>We support over 50 local families and farmers in our region.</p>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
