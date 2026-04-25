import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const B = import.meta.env.BASE_URL;

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleAuthAction = () => {
    if (user) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 },
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={() => setIsOpen(false)} style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div style={{ position: 'relative', width: '120px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={`${B}images/orglogo.png`} 
            alt="Organic Home" 
            style={{ 
              height: '110px', /* Maintained size */
              width: 'auto', 
              position: 'absolute', 
              top: '65%', 
              left: '0', /* Left aligned */
              transform: 'translate(0, -50%)', /* Only vertical centering */
              zIndex: 1002 
            }} 
          />
        </div>
        <span style={{ fontSize: '1.8rem', marginLeft: '10px', whiteSpace: 'nowrap', zIndex: 1003, position: 'relative' }}>Organic Home</span>
      </Link>


      {/* Desktop Menu */}
      <ul className="nav-links desktop-menu">
        {[
          { to: "/", label: "Home" },
          user?.role === 'customer' && { to: "/shop", label: "Shop" },
          user?.role === 'employee' && { to: "/admin", label: "Dashboard" },
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact" }
        ].filter(Boolean).map((link, index) => (
          <li key={index}>
            <Link to={link.to} style={{ textDecoration: 'none', position: 'relative' }}>
              <motion.span
                style={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  fontWeight: '500', 
                  fontSize: '1.1rem',
                  display: 'inline-block',
                  position: 'relative'
                }}
                whileHover={{ color: '#bef264', textShadow: '0 0 10px rgba(190, 242, 100, 0.6)' }}
              >
                {link.label}
                <motion.div 
                  initial={{ width: '0%', opacity: 0 }}
                  whileHover={{ width: '100%', opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    position: 'absolute', 
                    bottom: '-5px', 
                    left: '0', 
                    height: '2px', 
                    background: '#bef264', 
                    boxShadow: '0 0 10px #bef264',
                    borderRadius: '2px'
                  }}
                />
              </motion.span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="cta-buttons desktop-menu">
        {user?.role === 'customer' && (
            <button className="btn btn-login" onClick={() => navigate('/my-orders')} style={{ marginRight: '10px' }}>
                My Orders
            </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {user ? (
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444' }}
              whileTap={{ scale: 0.95 }}
              className="btn" 
              onClick={handleAuthAction}
              style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                borderRadius: '50px'
              }}
            >
              Logout
            </motion.button>
          ) : (
            <>
              <motion.button 
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(190, 242, 100, 0.2)', 
                  borderColor: '#bef264', 
                  boxShadow: '0 0 20px rgba(190, 242, 100, 0.4)' 
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')} 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50px',
                  padding: '10px 25px',
                  color: 'white',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Login
              </motion.button>
              
              <motion.button 
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: 'rgba(190, 242, 100, 0.2)', 
                  borderColor: '#bef264', 
                  boxShadow: '0 0 20px rgba(190, 242, 100, 0.4)' 
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/staff-access')} 
                style={{ 
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50px',
                  padding: '10px 25px',
                  color: '#bef264',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Emp & Staff
              </motion.button>
            </>
          )}
        </div>
        {user?.role === 'customer' && (
            <button className="btn btn-cart" onClick={() => navigate('/cart')}>
                <ShoppingBag size={18} /> Cart ({cartCount})
            </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="mobile-toggle" onClick={toggleMenu} style={isOpen ? { background: '#ef4444', padding: '5px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px' } : {}}>
        {isOpen ? <X color="white" size={24} /> : <Menu color="white" size={28} />}
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <ul className="mobile-nav-links">
              <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
              {user?.role === 'customer' && <li><Link to="/shop" onClick={() => setIsOpen(false)}>Shop</Link></li>}
              {user?.role === 'employee' && <li><Link to="/admin" onClick={() => setIsOpen(false)}>Dashboard</Link></li>}
              <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
              <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
              {user?.role === 'customer' && (
                  <li><Link to="/my-orders" onClick={() => setIsOpen(false)}>My Orders</Link></li>
              )}
              <li style={{ marginTop: '20px' }}>
                {user ? (
                    <button className="btn btn-login" onClick={handleAuthAction} style={{ width: '100%', justifyContent: 'center' }}>
                        Logout
                    </button>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <button className="btn btn-login" onClick={() => { navigate('/login'); setIsOpen(false); }} style={{ width: '100%', justifyContent: 'center' }}>
                            Customer Login
                        </button>
                        <button className="btn btn-login" onClick={() => { navigate('/staff-access'); setIsOpen(false); }} style={{ width: '100%', justifyContent: 'center', borderColor: 'rgba(255,255,255,0.3)' }}>
                            Staff & Admin
                        </button>
                    </div>
                )}
              </li>
              {user?.role === 'customer' && (
                  <li>
                    <button className="btn btn-cart" onClick={() => { navigate('/cart'); setIsOpen(false); }} style={{ width: '100%', justifyContent: 'center' }}>
                        <ShoppingBag size={18} /> Cart ({cartCount})
                    </button>
                  </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;