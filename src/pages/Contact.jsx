import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSend = () => {
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#bef264', '#ffffff', '#86efac'], // Theme colors
      zIndex: 2000 // Render on top of popup
    });
    
    setIsSubmitted(true);
    // Auto-hide after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
        
        {/* Contact Info */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ 
                background: 'rgba(255, 255, 255, 0.15)', 
                backdropFilter: 'blur(10px)', 
                padding: '40px', 
                borderRadius: '20px', 
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white',
                height: 'fit-content'
            }}
        >
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: '#ecfccb', marginBottom: '20px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Get in Touch</h1>
            <p style={{ fontSize: '1.2rem', color: 'white', marginBottom: '40px', lineHeight: '1.6', textShadow: '0 1px 2px rgba(0,0,0,0.5)', fontWeight: '500' }}>
                Have questions about our produce or delivery? We'd love to hear from you.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '50%', color: '#ecfccb', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}><Mail size={24} /></div>
                    <span style={{ fontSize: '1.2rem', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>hello@dvbakesorganics.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '50%', color: '#ecfccb', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}><Phone size={24} /></div>
                    <span style={{ fontSize: '1.2rem', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>+1 (555) 123-4567</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '50%', color: '#ecfccb', backdropFilter: 'blur(5px)', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}><MapPin size={24} /></div>
                    <span style={{ fontSize: '1.2rem', fontWeight: '500', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>123 Green Lane, Organic City, CA</span>
                </div>
            </div>
        </motion.div>

        {/* Form */}
        <motion.form 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
                background: 'rgba(255, 255, 255, 0.15)', 
                backdropFilter: 'blur(10px)', 
                padding: '40px', 
                borderRadius: '20px', 
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'white'
            }}
        >
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Name</label>
                <input type="text" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.15)', color: 'white', fontWeight: '500' }} placeholder="John Doe" />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Email</label>
                <input type="email" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.15)', color: 'white', fontWeight: '500' }} placeholder="john@example.com" />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'white', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Message</label>
                <textarea rows="4" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.3)', background: 'rgba(255, 255, 255, 0.15)', color: 'white', fontWeight: '500', resize: 'none' }} placeholder="How can we help?"></textarea>
            </div>
            <motion.button 
                type="button"
                onClick={handleSend}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                    width: '100%', 
                    padding: '15px', 
                    background: '#166534', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '10px', 
                    fontSize: '1.1rem', 
                    fontWeight: 600, 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '10px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                }}
            >
                Send Message <Send size={18} />
            </motion.button>
        </motion.form>


      </div>
      
      {/* Success Popup */}
      <AnimatePresence>
        {isSubmitted && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(5px)'
                }}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 50 }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(15px)',
                        padding: '40px',
                        borderRadius: '25px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        textAlign: 'center',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        maxWidth: '400px',
                        width: '90%'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        style={{
                            width: '80px',
                            height: '80px',
                            background: '#dcfce7',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 20px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Check size={40} color="#16a34a" strokeWidth={3} />
                    </motion.div>
                    <h2 style={{ color: '#bef264', margin: '0 0 10px', fontSize: '2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Message Sent!</h2>
                    <p style={{ color: 'white', fontSize: '1.2rem', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                        We've received your message and will get back to you shortly.
                    </p>
                    <motion.button
                        onClick={() => setIsSubmitted(false)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            marginTop: '25px',
                            padding: '12px 30px',
                            background: '#16a34a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                        }}
                    >
                        Close
                    </motion.button>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
