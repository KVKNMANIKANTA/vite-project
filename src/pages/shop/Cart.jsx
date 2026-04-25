import React from 'react';
import { useCart } from '../../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '40px' }}>
       <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
            <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none', color: '#f1f5f9', marginBottom: '20px' }}>
                <ArrowLeft size={20} /> Continue Shopping
            </Link>
            
           <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#ecfccb', marginBottom: '30px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Your Cart</h1>

           {cart.length === 0 ? (
               <div style={{ 
                   textAlign: 'center', 
                   padding: '60px', 
                   background: 'rgba(255, 255, 255, 0.15)', 
                   backdropFilter: 'blur(10px)',
                   borderRadius: '15px', 
                   color: 'white',
                   border: '1px solid rgba(255, 255, 255, 0.1)'
               }}>
                   <p style={{ fontSize: '1.4rem', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Your cart is empty.</p>
                   <Link to="/shop" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 25px', background: '#3b82f6', color: 'white', textDecoration: 'none', borderRadius: '25px', fontWeight: 600 }}>Start Shopping</Link>
               </div>
           ) : (
               <div style={{ display: 'grid', gap: '30px' }}>
                   <div style={{ 
                       background: 'rgba(255, 255, 255, 0.15)', 
                       backdropFilter: 'blur(10px)', 
                       borderRadius: '15px', 
                       padding: '20px', 
                       boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                       border: '1px solid rgba(255, 255, 255, 0.1)',
                       color: 'white'
                   }}>
                       {cart.map(item => (
                           <motion.div 
                                layout
                                key={item.id} 
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                           >
                               <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                   <div style={{ width: '60px', height: '60px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                                        {/* Simple fallback based on category logic from shop */}
                                        {item.category === 'Vegetables' ? '🥦' : item.category === 'Fruits' ? '🍎' : '🥛'}
                                   </div>
                                   <div>
                                       <h3 style={{ margin: 0, color: 'white', fontSize: '1.2rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{item.name}</h3>
                                       <p style={{ margin: '5px 0 0', color: '#f1f5f9', fontWeight: '500' }}>₹{item.price.toFixed(2)}</p>
                                   </div>
                               </div>

                               <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.2)', padding: '5px 10px', borderRadius: '8px' }}>
                                       <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'white' }}><Minus size={16} /></button>
                                       <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center', color: 'white', fontSize: '1.1rem' }}>{item.quantity}</span>
                                       <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'white' }}><Plus size={16} /></button>
                                   </div>
                                   <p style={{ margin: 0, fontWeight: 700, minWidth: '60px', textAlign: 'right', color: 'white', fontSize: '1.1rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>₹{(item.price * item.quantity).toFixed(2)}</p>
                                   <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#fca5a5' }}><Trash2 size={20} /></button>
                               </div>
                           </motion.div>
                       ))}
                   </div>

                   <div style={{ 
                       background: 'rgba(255, 255, 255, 0.15)', 
                       backdropFilter: 'blur(10px)', 
                       borderRadius: '15px', 
                       padding: '30px', 
                       boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                       border: '1px solid rgba(255, 255, 255, 0.1)',
                       color: 'white'
                   }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 600 }}>
                           <span>Total</span>
                           <span>₹{cartTotal.toFixed(2)}</span>
                       </div>
                       <button onClick={() => navigate('/payment')} style={{ width: '100%', padding: '15px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>
                           Proceed to Checkout
                       </button>
                   </div>
               </div>
           )}
       </div>
    </div>
  );
};

export default Cart;
