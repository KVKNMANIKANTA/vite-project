import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useProduct } from '../../context/ProductContext';
import { motion } from 'framer-motion';
import { Plus, ShoppingBag } from 'lucide-react';

const Shop = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const { addToCart } = useCart();
    const { products, categories } = useProduct();
    
    // Filter logic
    const displayedProducts = activeCategory === 'All' 
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '40px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                <header style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h1 style={{ fontFamily: 'Dancing Script, cursive', fontSize: '4rem', color: '#ecfccb', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Organic Market</h1>
                    <p style={{ color: '#f1f5f9', fontSize: '1.2rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>Fresh from the farm to your table.</p>
                </header>

                {/* Categories */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '10px 25px',
                                borderRadius: '25px',
                                border: 'none',
                                background: activeCategory === cat ? '#F4F1DE' : 'white',
                                color: '#1e293b',
                                boxShadow: activeCategory === cat ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
                                cursor: 'pointer',
                                fontWeight: 500,
                                transition: 'all 0.3s'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <motion.div 
                    layout
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}
                >
                    {displayedProducts.map(product => (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={product.id}
                            style={{ 
                                background: 'rgba(255, 255, 255, 0.15)', 
                                backdropFilter: 'blur(10px)', 
                                borderRadius: '15px', 
                                overflow: 'hidden', 
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', 
                                position: 'relative',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <div style={{ height: '200px', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                {product.image ? (
                                    <img src={product.image} alt={product.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} 
                                        onError={(e) => { e.target.style.display='none'; e.target.parentElement.innerText = product.category === 'Vegetables' ? '🥦' : product.category === 'Fruits' ? '🍎' : '🥛' }}
                                    />
                                ) : (
                                   <span style={{ fontSize: '3rem' }}>🛍️</span>
                                )}
                            </div>
                            <div style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 5px 0', color: 'white', fontSize: '1.2rem', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{product.name}</h3>
                                        <p style={{ margin: 0, color: '#f1f5f9', fontSize: '1rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{product.category}</p>
                                    </div>
                                    <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#bef264', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                                        ₹{Number(product.price).toFixed(2)}
                                    </span>
                                </div>
                                <button
                                    onClick={() => addToCart(product)}
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px', 
                                        background: '#1e293b', 
                                        color: 'white', 
                                        border: 'none', 
                                        borderRadius: '10px', 
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        transition: 'background 0.3s'
                                    }}
                                    onMouseOver={(e) => e.target.style.background = '#334155'}
                                    onMouseOut={(e) => e.target.style.background = '#1e293b'}
                                >
                                    <Plus size={18} /> Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Shop;
