import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    if (role === 'employee') {
      navigate('/admin');
    } else if (role === 'staff') {
      navigate('/employee-dashboard');
    } else {
      navigate('/shop');
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ 
          background: 'rgba(255, 255, 255, 0.15)', 
          padding: '50px', 
          borderRadius: '20px', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '2rem' 
        }}
      >
      <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ color: 'white', fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Customer Login</motion.h1>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(163, 230, 53, 0.7)" }} 
          whileTap={{ scale: 0.95 }}
          onClick={() => handleLogin('customer')}
          style={{ padding: '20px 60px', fontSize: '1.2rem', cursor: 'pointer', background: 'linear-gradient(45deg, #a3e635, #84cc16)', border: 'none', color: '#1a2e05', fontWeight: 'bold', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}
        >
          Sign In as Customer
        </motion.button>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, color: '#ecfccb' }} 
        onClick={() => navigate('/staff-access')}
        style={{ background: 'transparent', border: 'none', color: '#e2e8f0', cursor: 'pointer', fontSize: '1rem', textDecoration: 'underline' }}
      >
        Go to Staff/Admin Portal
      </motion.button>
      </motion.div>
    </div>
  );
};

export default Login;
