import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Home Chef",
    quote: "The freshness is unlike anything I've bought at a supermarket. You can truly taste the difference in every bite.",
    rating: 5
  },
  {
    name: "David Ross",
    role: "Local Resident",
    quote: "I love knowing exactly where my food comes from. Supporting local farmers while eating healthy is a win-win.",
    rating: 5
  },
  {
    name: "Emily Chen",
    role: "Nutritionist",
    quote: "As a nutritionist, I highly recommend their organic produce. It's clean, seasonal, and packed with nutrients.",
    rating: 5
  }
];

const HomeTestimonials = () => {
  return (
    <div style={{ 
      padding: '4rem 2rem', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '80vh' 
    }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ 
            textAlign: 'center', 
            fontFamily: 'Playfair Display, serif', 
            fontSize: '3.5rem', 
            marginBottom: '4rem', 
            background: 'linear-gradient(to right, #ffffff, #bef264)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(163, 230, 53, 0.3)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
          }}
        >
          Community Love
        </motion.h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ 
                y: -15, 
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                borderRadius: '24px',
                padding: '2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                color: 'white',
                cursor: 'default',
                position: 'relative'
              }}
            >
              <Quote size={40} style={{ position: 'absolute', top: '20px', right: '20px', color: 'rgba(190, 242, 100, 0.2)' }} />
              
              <div style={{ display: 'flex', gap: '5px' }}>
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="#bef264" color="#bef264" />
                ))}
              </div>

              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: '1.6', 
                fontStyle: 'italic', 
                color: '#ffffff', 
                fontWeight: '500',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)'
              }}>
                "{item.quote}"
              </p>

              <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                <h4 style={{ fontSize: '1.2rem', fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>{item.name}</h4>
                <p style={{ fontSize: '0.9rem', color: '#bef264', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTestimonials;
