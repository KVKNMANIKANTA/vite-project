import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Truck, Users, Award, Package, Heart } from 'lucide-react';

const features = [
  {
    icon: <Leaf size={40} />,
    title: "100% Organic",
    description: "Certified organic produce without harmful pesticides or GMOs."
  },
  {
    icon: <Truck size={40} />,
    title: "Farm to Door",
    description: "Harvested in the morning, delivered to your doorstep by evening."
  },
  {
    icon: <Users size={40} />,
    title: "Community Driven",
    description: "Supporting local farming families and strengthening rural economies."
  },
  {
    icon: <Award size={40} />,
    title: "Quality Guaranteed",
    description: "If you are not satisfied with the freshness, we replace it instantly."
  },
  {
    icon: <Package size={40} />,
    title: "Eco-Friendly",
    description: "We use 100% biodegradable and recyclable packaging for all orders."
  },
  {
    icon: <Heart size={40} />,
    title: "Fair Trade",
    description: "Ensuring fair wages and ethical working conditions for all our farmers."
  }
];

const HomeFeatures = () => {
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
          Why Choose Us?
        </motion.h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -15, 
                boxShadow: '0 20px 40px rgba(163, 230, 53, 0.2)',
                borderColor: 'rgba(190, 242, 100, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.15)'
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                borderRadius: '24px',
                padding: '2.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                color: 'white',
                cursor: 'default',
                transition: 'border-color 0.3s ease'
              }}
            >
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.1 }}
                style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  padding: '1.2rem', 
                  borderRadius: '50%', 
                  marginBottom: '1.5rem',
                  color: '#bef264',
                  boxShadow: '0 0 20px rgba(190, 242, 100, 0.2)',
                  border: '1px solid rgba(190, 242, 100, 0.3)'
                }}
              >
                {feature.icon}
              </motion.div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontFamily: 'Playfair Display, serif', fontWeight: '600', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{feature.title}</h3>
              <p style={{ color: '#ffffff', lineHeight: '1.7', fontSize: '1.1rem', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeFeatures;
