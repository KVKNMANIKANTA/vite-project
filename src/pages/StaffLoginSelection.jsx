import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const StaffLoginSelection = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    if (role === 'employee') {
      navigate('/admin');
    } else if (role === 'staff') {
      navigate('/employee-dashboard');
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'column', 
      gap: '2rem',
      background: "linear-gradient(rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.3)), url('/images/adminn.png') no-repeat center center / cover"
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '60px', 
          borderRadius: '30px', 
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: '2.5rem',
          maxWidth: '500px',
          width: '90%'
        }}
      >
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2 }}
        style={{ 
          background: 'linear-gradient(to right, #ecfccb, #86efac)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: "'Playfair Display', serif", 
          fontSize: '3.5rem', 
          margin: 0,
          textAlign: 'center',
          textShadow: '0 4px 10px rgba(134, 239, 172, 0.3)',
          letterSpacing: '1px'
        }}
      >
        Staff Portal
      </motion.h1>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(74, 222, 128, 0.3)' }} 
          whileTap={{ scale: 0.95 }}
          onClick={() => handleLogin('staff')}
          style={{ 
            flex: 1,
            padding: '20px', 
            fontSize: '1.2rem', 
            cursor: 'pointer', 
            background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', 
            border: 'none', 
            color: 'white', 
            borderRadius: '15px', 
            fontWeight: '600', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            minWidth: '150px'
          }}
        >
          Staff Login
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)' }} 
          whileTap={{ scale: 0.95 }}
          onClick={() => handleLogin('employee')}
          style={{ 
            flex: 1,
            padding: '20px', 
            fontSize: '1.2rem', 
            cursor: 'pointer', 
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
            border: 'none', 
            color: 'white', 
            borderRadius: '15px', 
            fontWeight: '600', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            minWidth: '150px'
          }}
        >
          Admin Login
        </motion.button>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, color: '#ecfccb' }} 
        onClick={() => navigate('/login')}
        style={{ 
          background: 'transparent', 
          border: 'none', 
          color: '#cbd5e1', 
          cursor: 'pointer', 
          fontSize: '1rem', 
          textDecoration: 'underline',
          opacity: 0.8
        }}
      >
        ← Back to Customer Login
      </motion.button>
      </motion.div>
    </div>
  );
};

export default StaffLoginSelection;
