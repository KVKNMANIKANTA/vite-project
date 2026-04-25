import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, ChevronRight, MapPin, X } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';

const MyOrders = () => {
    const { orders } = useOrder();
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '40px' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
                <h1 style={{ fontSize: '2.5rem', color: '#ecfccb', marginBottom: '30px', fontFamily: 'Playfair Display, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>My Orders</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                    
                    {/* Orders List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {orders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedOrder(order)}
                                style={{ 
                                    background: 'rgba(255, 255, 255, 0.15)', 
                                    backdropFilter: 'blur(10px)',
                                    padding: '20px', borderRadius: '15px', 
                                    boxShadow: selectedOrder?.id === order.id ? '0 0 0 2px #16a34a' : '0 4px 6px -1px rgba(0,0,0,0.1)',
                                    cursor: 'pointer', transition: 'all 0.2s', border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: 'white'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ fontWeight: 'bold', color: 'white', fontSize: '1.1rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{order.id}</span>
                                    <span style={{ color: '#f1f5f9', fontSize: '0.9rem', fontWeight: '500' }}>{order.date}</span>
                                </div>
                                <div style={{ marginBottom: '15px', color: '#e2e8f0', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: '500' }}>
                                    {order.items.join(', ')}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 'bold', color: 'white', fontSize: '1.1rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>₹{order.total.toFixed(2)}</span>
                                    <StatusBadge status={order.status} />
                                </div>
                            </motion.div>
                        ))}
                        {orders.length === 0 && (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                                No orders yet. Go shop!
                            </div>
                        )}
                    </div>

                    {/* Tracking View */}
                    <AnimatePresence mode="wait">
                        {selectedOrder ? (
                            <motion.div
                                key={selectedOrder.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                style={{ 
                                    background: 'rgba(255, 255, 255, 0.15)', 
                                    backdropFilter: 'blur(10px)',
                                    padding: '30px', 
                                    borderRadius: '20px', 
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
                                    height: 'fit-content', 
                                    position: 'relative',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    color: 'white'
                                }}
                            >
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Track Order {selectedOrder.id}</h2>
                                <button onClick={() => setSelectedOrder(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: '#ef4444', border: 'none', cursor: 'pointer', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}><X size={18} /></button>
                                <div style={{ position: 'relative', paddingLeft: '20px' }}>
                                    {/* Vertical Line */}
                                    <div style={{ position: 'absolute', left: '29px', top: '20px', bottom: '40px', width: '2px', background: '#e2e8f0' }}></div>
                                    
                                    {selectedOrder.tracking.map((step, index) => (
                                        <div key={index} style={{ display: 'flex', gap: '20px', marginBottom: '30px', position: 'relative' }}>
                                            <div style={{ 
                                                width: '20px', height: '20px', borderRadius: '50%', 
                                                background: step.completed ? '#16a34a' : 'rgba(255,255,255,0.2)', 
                                                zIndex: 1, marginTop: '5px', border: '4px solid rgba(255,255,255,0.1)', boxShadow: '0 0 0 1px ' + (step.completed ? '#16a34a' : 'rgba(255,255,255,0.2)')
                                            }}></div>
                                            <div>
                                                <div style={{ fontWeight: 600, color: step.completed ? 'white' : '#94a3b8', fontSize: '1rem', textShadow: step.completed ? '0 1px 2px rgba(0,0,0,0.5)' : 'none' }}>{step.status}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{step.date}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '20px', padding: '15px', background: '#f0fdf4', borderRadius: '10px', display: 'flex', gap: '10px', alignItems: 'center', color: '#166534' }}>
                                    <MapPin size={20} />
                                    <span style={{ fontSize: '0.9rem' }}>Expected Delivery: {selectedOrder.tracking[selectedOrder.tracking.length - 1].date}</span>
                                </div>
                            </motion.div>
                        ) : (
                            <div style={{ 
                                display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', 
                                background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)',
                                borderRadius: '20px', color: '#e2e8f0', flexDirection: 'column', gap: '10px',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}>
                                <Package size={40} />
                                <p>Select an order to view tracking details</p>
                            </div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    let color = '#3b82f6';
    let bg = '#eff6ff';
    
    if (status === 'Delivered') { color = '#16a34a'; bg = '#f0fdf4'; }
    if (status === 'Shipped') { color = '#f59e0b'; bg = '#fef3c7'; }

    return (
        <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, color: color, background: bg }}>
            {status}
        </span>
    );
};

export default MyOrders;
