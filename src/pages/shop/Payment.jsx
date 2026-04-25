import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';
import { CheckCircle, CreditCard as CardIcon, Calendar, Lock, Smartphone, Globe, Banknote, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';

const Payment = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const { addOrder } = useOrder();
    const navigate = useNavigate();
    const [activeMethod, setActiveMethod] = useState('card');
    const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
    const [upiId, setUpiId] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'number' && value.length > 19) return;
        if (name === 'expiry' && value.length > 5) return;
        if (name === 'cvv' && value.length > 3) return;

        let formattedValue = value;
        if (name === 'expiry' && value.length === 2 && cardData.expiry.length === 1) {
            formattedValue = value + '/';
        }

        setCardData({ ...cardData, [name]: formattedValue });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Add order to context
        addOrder({
            total: cartTotal,
            items: cart.map(item => item.name)
        });

        setIsProcessing(false);
        setIsSuccess(true);
        
        // Fire confetti from side cannons (bombers) — same effect as was on Home
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
          // Left Bomber
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.8 },
            colors: ['#a3e635', '#ffffff', '#ecfccb'],
            zIndex: 9999
          });
          
          // Right Bomber
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.8 },
            colors: ['#a3e635', '#ffffff', '#ecfccb'],
            zIndex: 9999
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());

        clearCart();
        setTimeout(() => navigate('/shop'), 4000); // Navigate to shop
    };

    if (isSuccess) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ 
                        textAlign: 'center', 
                        padding: '40px', 
                        background: 'rgba(255, 255, 255, 0.15)', 
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px', 
                        boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'white'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        style={{ width: '80px', height: '80px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}
                    >
                        <CheckCircle size={40} color="#16a34a" />
                    </motion.div>
                    <h2 style={{ color: '#86efac', margin: '0 0 10px', fontSize: '2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Payment Successful!</h2>
                    <p style={{ color: 'white', fontSize: '1.2rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Your order has been placed successfully.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ 
                width: '100%', maxWidth: '1000px', 
                background: 'rgba(255, 255, 255, 0.15)', 
                backdropFilter: 'blur(10px)',
                borderRadius: '20px', 
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)', 
                overflow: 'hidden', 
                display: 'flex', 
                minHeight: '600px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                
                {/* Sidebar */}
                <div style={{ width: '250px', background: 'rgba(15, 23, 42, 0.6)', color: 'white', padding: '30px 20px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '30px', fontFamily: 'Playfair Display, serif', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>Payment Method</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <MethodTab icon={<CardIcon size={20} />} label="Card" active={activeMethod === 'card'} onClick={() => setActiveMethod('card')} />
                        <MethodTab icon={<Smartphone size={20} />} label="UPI" active={activeMethod === 'upi'} onClick={() => setActiveMethod('upi')} />
                        <MethodTab icon={<Globe size={20} />} label="Net Banking" active={activeMethod === 'netbanking'} onClick={() => setActiveMethod('netbanking')} />
                        <MethodTab icon={<Banknote size={20} />} label="COD" active={activeMethod === 'cod'} onClick={() => setActiveMethod('cod')} />
                    </div>
                    <div style={{ marginTop: 'auto', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <div style={{ fontSize: '1rem', color: '#e2e8f0' }}>Total Amount</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4ade80', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>₹{cartTotal.toFixed(2)}</div>
                    </div>
                </div>

                {/* Content Area */}
                <div style={{ flex: 1, padding: '40px', background: 'transparent', position: 'relative' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeMethod}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            style={{ height: '100%' }}
                        >
                            {activeMethod === 'card' && (
                                <CardPayment 
                                    cardData={cardData} 
                                    handleInputChange={handleInputChange} 
                                    handlePayment={handlePayment} 
                                    isProcessing={isProcessing}
                                    isFlipped={isFlipped}
                                    setIsFlipped={setIsFlipped}
                                />
                            )}
                            {activeMethod === 'upi' && <UPIPayment handlePayment={handlePayment} isProcessing={isProcessing} upiId={upiId} setUpiId={setUpiId} />}
                            {activeMethod === 'netbanking' && <NetBankingPayment handlePayment={handlePayment} isProcessing={isProcessing} />}
                            {activeMethod === 'cod' && <CODPayment handlePayment={handlePayment} isProcessing={isProcessing} />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// Sub-components
const MethodTab = ({ icon, label, active, onClick }) => (
    <div 
        onClick={onClick}
        style={{ 
            display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', borderRadius: '10px', 
            cursor: 'pointer', background: active ? 'rgba(255, 255, 255, 0.2)' : 'transparent', color: active ? 'white' : '#94a3b8',
            transition: 'all 0.2s', fontWeight: 500,
            border: active ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid transparent'
        }}
    >
        {icon} {label}
    </div>
);

const CardPayment = ({ cardData, handleInputChange, handlePayment, isProcessing, isFlipped, setIsFlipped }) => (
    <div style={{ display: 'grid', gap: '40px' }}>
        <div style={{ perspective: '1000px', display: 'flex', justifyContent: 'center' }}>
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ width: '350px', height: '220px', position: 'relative', transformStyle: 'preserve-3d' }}
            >
                {/* Front */}
                <div style={{ 
                    position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', borderRadius: '15px', padding: '20px', color: 'white',
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><CardIcon /> <span style={{ fontStyle: 'italic' }}>DvBank</span></div>
                    <div style={{ fontSize: '1.6rem', fontFamily: 'monospace', letterSpacing: '2px' }}>{cardData.number || '#### #### #### ####'}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div><div style={{ fontSize: '0.7rem', opacity: 0.7 }}>HOLDER</div><div>{cardData.name || 'FULL NAME'}</div></div>
                        <div><div style={{ fontSize: '0.7rem', opacity: 0.7 }}>EXPIRES</div><div>{cardData.expiry || 'MM/YY'}</div></div>
                    </div>
                </div>
                {/* Back */}
                <div style={{ 
                    position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', borderRadius: '15px', transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', boxShadow: '0 20px 50px rgba(0,0,0,0.2)', overflow: 'hidden'
                }}>
                    <div style={{ height: '40px', background: 'black', marginTop: '30px' }}></div>
                    <div style={{ padding: '20px', textAlign: 'right' }}>
                        <div style={{ fontSize: '0.8rem', color: 'white', marginBottom: '5px' }}>CVV</div>
                        <div style={{ background: 'white', color: 'black', padding: '5px 10px', borderRadius: '4px', display: 'inline-block', fontFamily: 'monospace' }}>{cardData.cvv || '123'}</div>
                    </div>
                </div>
            </motion.div>
        </div>
        <form onSubmit={handlePayment} style={{ display: 'grid', gap: '20px' }}>
            <input type="text" name="number" placeholder="Card Number" value={cardData.number} onChange={handleInputChange} onFocus={() => setIsFlipped(false)} style={inputStyle} required />
            <input type="text" name="name" placeholder="Card Holder Name" value={cardData.name} onChange={handleInputChange} onFocus={() => setIsFlipped(false)} style={inputStyle} required />
            <div style={{ display: 'flex', gap: '20px' }}>
                <input type="text" name="expiry" placeholder="MM/YY" value={cardData.expiry} onChange={handleInputChange} onFocus={() => setIsFlipped(false)} style={inputStyle} required />
                <input type="text" name="cvv" placeholder="CVV" value={cardData.cvv} onChange={handleInputChange} onFocus={() => setIsFlipped(true)} onBlur={() => setIsFlipped(false)} style={inputStyle} required />
            </div>
            <PayButton isProcessing={isProcessing} />
        </form>
    </div>
);

const UPIPayment = ({ handlePayment, isProcessing, upiId, setUpiId }) => (
    <div style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h3 style={{ marginBottom: '30px', color: 'white', fontSize: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Scan QR Code or Enter UPI ID</h3>
        <div style={{ width: '200px', height: '200px', background: 'white', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
            <div style={{ width: '100%', height: '100%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <QrCode size={100} color="#1e293b" />
            </div>
        </div>
        <form onSubmit={handlePayment} style={{ width: '100%', maxWidth: '400px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input 
                    type="text" placeholder="username@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} 
                    style={{ ...inputStyle, flex: 1 }} required 
                />
                <button type="button" style={{ padding: '0 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Verify</button>
            </div>
            <PayButton isProcessing={isProcessing} />
        </form>
    </div>
);

const NetBankingPayment = ({ handlePayment, isProcessing }) => (
    <div>
        <h3 style={{ marginBottom: '20px', color: 'white' }}>Select Your Bank</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
            {['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank'].map(bank => (
                <div key={bank} style={{ padding: '15px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', color: 'white', fontWeight: 500, transition: 'all 0.2s', background: 'rgba(255,255,255,0.05)' }} onClick={(e) => { e.target.style.borderColor = '#4ade80'; e.target.style.background = 'rgba(74, 222, 128, 0.2)'; }}>
                    {bank}
                </div>
            ))}
        </div>
        <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '30px', fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
            <option style={{ color: 'black' }}>Other Banks</option>
            <option style={{ color: 'black' }}>Bank of Baroda</option>
            <option style={{ color: 'black' }}>Kotak Mahindra</option>
            <option style={{ color: 'black' }}>Punjab National Bank</option>
        </select>
        <button onClick={handlePayment} style={buttonStyle}>{isProcessing ? 'Processing...' : 'Pay Now'}</button>
    </div>
);

const CODPayment = ({ handlePayment, isProcessing }) => (
    <div style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100px', height: '100px', background: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '30px' }}>
            <Banknote size={50} color="#16a34a" />
        </div>
        <h3 style={{ marginBottom: '10px', color: 'white', fontSize: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Cash on Delivery</h3>
        <p style={{ color: '#f1f5f9', marginBottom: '30px', maxWidth: '400px', fontSize: '1.1rem', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
            Pay with cash upon delivery. Please ensure you have the exact amount to avoid any inconvenience.
        </p>
        <div style={{ width: '100%', maxWidth: '300px' }}>
            <button onClick={handlePayment} style={buttonStyle}>{isProcessing ? 'Placing Order...' : 'Confirm Order'}</button>
        </div>
    </div>
);

const PayButton = ({ isProcessing }) => (
    <button disabled={isProcessing} style={{ ...buttonStyle, opacity: isProcessing ? 0.7 : 1 }}>
        {isProcessing ? 'Processing...' : 'Pay Now'}
    </button>
);

const inputStyle = { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.2)', fontSize: '1rem', outline: 'none', color: 'white', background: 'rgba(255, 255, 255, 0.1)' };
const buttonStyle = { width: '100%', padding: '16px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' };

export default Payment;
