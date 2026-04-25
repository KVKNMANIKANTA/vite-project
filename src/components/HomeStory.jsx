import React from 'react';
import { motion } from 'framer-motion';

const B = import.meta.env.BASE_URL;

const HomeStory = () => {
  return (
    <div style={{ 
      padding: '4rem 2rem', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '80vh' 
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '3rem',
          maxWidth: '1000px',
          width: '100%',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: 'white'
        }}
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ 
            fontFamily: 'Playfair Display, serif', 
            fontSize: '3.5rem', 
            marginBottom: '2rem',
            background: 'linear-gradient(to right, #ffffff, #bef264)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(163, 230, 53, 0.3)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
          }}
        >
          Our Story
        </motion.h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div 
            style={{ flex: '1 1 300px', textAlign: 'left' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p style={{ fontSize: '1.25rem', lineHeight: '1.8', marginBottom: '1.5rem', color: '#ffffff', fontWeight: '500', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
              Born from a passion for authentic flavors and sustainable living, our journey began in the heart of the countryside. We noticed how disconnected modern life had become from the sources of our food.
            </p>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: '#ffffff', fontWeight: '500', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
              We decided to bridge that gap. By partnering directly with local farmers who treat the land with respect, we bring the freshest, most wholesome produce straight to your table. Every item tells a story of hard work, sun, rain, and care.
            </p>
          </motion.div>

          {/* Placeholder for an image or graphic */}
          <motion.div 
            style={{ 
              flex: '1 1 300px', 
              height: '350px', 
              background: 'rgba(255,255,255,0.05)', 
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.2)',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -15, 0] }}
            transition={{ 
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              },
              default: { duration: 0.6, delay: 0.4 }
            }}
          >
             <img src={`${B}images/img1.png`} alt="Our Farm" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeStory;
