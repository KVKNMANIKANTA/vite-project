import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Send, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/mockData';
import './CalfChatbot.css';

const B = import.meta.env.BASE_URL;

/* ─── Flat product list for matching ─── */
const allProducts = [
  ...products.dairy,
  ...products.vegetables,
  ...products.fruits,
  ...products.accessories
];

function findProduct(text) {
  const lower = text.toLowerCase();
  return allProducts.find(p => lower.includes(p.name.toLowerCase()))
    || allProducts.find(p => {
      const words = p.name.toLowerCase().split(' ');
      return words.some(w => w.length > 3 && lower.includes(w));
    });
}

/* ─── Calf Image Icon ─── */
const CalfIcon = ({ size = 42 }) => (
  <img
    src={`${B}images/chatbot.png`}
    alt="Gowri the Calf"
    width={size}
    height={size}
    style={{ borderRadius: '50%', objectFit: 'cover' }}
  />
);

/* ─── Bot Knowledge Base ─── */
const botResponses = [
  {
    keywords: ['hello', 'hi', 'hey', 'hola', 'greet', 'good morning', 'good evening'],
    response: "Moo! 🐄 Hello there! I'm Gowri, your friendly farm calf assistant. How can I help you today?"
  },
  {
    keywords: ['product', 'products', 'sell', 'what do you', 'items', 'catalog', 'range'],
    response: "We offer a wonderful range of farm-fresh goodies! 🌿\n\n🥛 **Dairy** — Organic Milk, Farm Butter, Greek Yogurt, Cheddar Cheese\n🥬 **Vegetables** — Fresh Spinach, Carrots, Broccoli, Bell Peppers\n🍎 **Fruits** — Red Apples, Bananas, Strawberries, Avocados\n🛍️ **Accessories** — Jute Bags, Bamboo Straws\n\nAll 100% organic and fresh from the farm!"
  },
  {
    keywords: ['dairy', 'milk', 'butter', 'cheese', 'yogurt'],
    response: "Our dairy section is my favorite! 🥛 We have:\n\n• Organic Milk — ₹4.50\n• Farm Butter — ₹6.00\n• Greek Yogurt — ₹3.20\n• Cheddar Cheese — ₹8.50\n\nAll sourced from happy, grass-fed cows like my mom! 🐮"
  },
  {
    keywords: ['vegetable', 'veggie', 'spinach', 'carrot', 'broccoli', 'pepper'],
    response: "Our fresh veggies are harvested daily! 🥬\n\n• Fresh Spinach — ₹2.50\n• Carrots — ₹1.80\n• Broccoli — ₹3.00\n• Bell Peppers — ₹2.20\n\nFarm to your table in under 24 hours! 🌱"
  },
  {
    keywords: ['fruit', 'apple', 'banana', 'strawberry', 'avocado'],
    response: "Our fruits are picked at peak ripeness! 🍎\n\n• Red Apples — ₹3.50\n• Bananas — ₹1.20\n• Strawberries — ₹5.00\n• Avocados — ₹4.00\n\nSweet, juicy, and 100% organic! 🍓"
  },
  {
    keywords: ['delivery', 'deliver', 'ship', 'shipping', 'how long', 'when'],
    response: "We offer same-day farm-to-door delivery! 🚚\n\n• Orders before 10 AM → delivered by evening\n• Free delivery on orders above ₹20\n• We use eco-friendly packaging 📦\n\nYour freshness is our promise!"
  },
  {
    keywords: ['order', 'track', 'status', 'my order', 'where is'],
    response: "__TRACK_ORDERS__"
  },
  {
    keywords: ['organic', 'certificate', 'natural', 'pesticide', 'gmo', 'chemical'],
    response: "Absolutely! We're 100% certified organic! 🌿\n\n✅ No harmful pesticides\n✅ No GMOs\n✅ No artificial chemicals\n✅ Fair trade certified\n\nEvery product is tested and verified for purity. Your health is our priority! 💚"
  },
  {
    keywords: ['return', 'refund', 'replace', 'exchange', 'quality', 'issue', 'complaint'],
    response: "We stand behind our quality! 🛡️\n\n• Not satisfied with freshness? We replace it instantly!\n• Refund requests are processed within 24 hours\n• Contact us through the Contact page for any issues\n\nYour satisfaction is guaranteed, no questions asked! 💚"
  },
  {
    keywords: ['price', 'cost', 'expensive', 'cheap', 'affordable', 'how much'],
    response: "Our prices are fair and farmer-friendly! 💰\n\nPrices range from ₹1.20 (Bananas) to ₹8.50 (Cheddar Cheese). We believe in fair trade — farmers get paid fairly, and you get premium organic produce at reasonable prices!\n\nCheck out our Shop for the full price list 🛒"
  },
  {
    keywords: ['hour', 'open', 'close', 'time', 'available', 'schedule'],
    response: "We're available for you! 🕐\n\n🌅 Online Store: 24/7\n🏪 Farm Visits: 6 AM - 6 PM (Mon-Sat)\n📞 Support: 8 AM - 8 PM daily\n\nOur online shop never sleeps, just like the farm! 🌾"
  },
  {
    keywords: ['payment', 'pay', 'card', 'upi', 'cash'],
    response: "We accept multiple payment methods! 💳\n\n• Credit / Debit Cards\n• UPI Payments\n• Net Banking\n• Cash on Delivery\n\nAll transactions are secure and encrypted! 🔒"
  },
  {
    keywords: ['eco', 'environment', 'sustainable', 'green', 'packaging', 'recycle'],
    response: "Sustainability is in our DNA! 🌍\n\n♻️ 100% biodegradable packaging\n🌱 Carbon-neutral delivery routes\n💧 Water-efficient farming practices\n🌾 Supporting local farming communities\n\nEvery purchase helps the planet! 💚"
  },
  {
    keywords: ['contact', 'support', 'help', 'reach', 'phone', 'email'],
    response: "We'd love to hear from you! 📞\n\nVisit our **Contact** page for:\n• 📧 Email support\n• 📞 Phone support (8 AM - 8 PM)\n• 💬 This chat — I'm always here!\n\nYou can also navigate to the Contact page from the menu bar! 🐄"
  },
  {
    keywords: ['thank', 'thanks', 'awesome', 'great', 'perfect', 'nice', 'good'],
    response: "You're most welcome! 🐄💚 Happy to help! If you need anything else, I'm just a moo away! 🌿"
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'quit', 'exit'],
    response: "Goodbye! 🐄 Come back anytime! Remember — fresh from the farm, always organic! Moo-bye! 🌾💚"
  },
  {
    keywords: ['who are you', 'your name', 'what are you', 'introduce'],
    response: "I'm Gowri 🐄 — the friendliest little calf on the farm! I'm here to help you with everything about our organic farm store. Ask me about products, delivery, orders, or anything else! Moo! 💚"
  }
];

const defaultResponse = "Moo? 🤔 I'm not sure about that one! Try:\n\n• **add milk** — add to cart\n• **track my orders** — order status\n• **show my cart** — view cart\n• **go to shop** — open a page\n\nI can also tell you about products, delivery, payments & more! 🐄💚";

const quickReplies = [
  { label: '🛒 Add Milk', text: 'Add Organic Milk to cart' },
  { label: '📦 Track Orders', text: 'Track my orders' },
  { label: '🏪 Open Shop', text: 'Go to shop' },
  { label: '🛍️ My Cart', text: 'Show my cart' }
];

/* ─── Page routes for navigation ─── */
const pageRoutes = [
  { keywords: ['home', 'main', 'homepage', 'start'], path: '/', name: 'Home' },
  { keywords: ['shop', 'store', 'browse', 'products page', 'buy'], path: '/shop', name: 'Shop', requiresAuth: true },
  { keywords: ['cart', 'basket', 'checkout'], path: '/cart', name: 'Cart', requiresAuth: true },
  { keywords: ['payment', 'pay', 'checkout page'], path: '/payment', name: 'Payment', requiresAuth: true },
  { keywords: ['my orders', 'orders page', 'order history'], path: '/my-orders', name: 'My Orders', requiresAuth: true },
  { keywords: ['about', 'about us', 'who are we', 'our story'], path: '/about', name: 'About Us' },
  { keywords: ['contact', 'contact us', 'reach us', 'support page'], path: '/contact', name: 'Contact' },
  { keywords: ['login', 'sign in', 'log in', 'signin'], path: '/login', name: 'Login' },
];

/* ─── Helper: Match bot response ─── */
function getBotReply(userMsg) {
  const lower = userMsg.toLowerCase().trim();
  for (const entry of botResponses) {
    if (entry.keywords.some(kw => lower.includes(kw))) {
      return entry.response;
    }
  }
  return defaultResponse;
}

/* ─── Helper: Text-to-Speech ─── */
function stripForSpeech(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')           // remove **bold**
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/gu, '') // remove emojis
    .replace(/[•✅♻️🌅🏪📞🟡🔵🟢]/g, '')       // remove remaining symbols
    .replace(/[—→]/g, ', ')                    // replace dashes with pauses
    .replace(/\n+/g, '. ')                     // newlines become sentence breaks
    .replace(/\s{2,}/g, ' ')                   // collapse whitespace
    .trim();
}

function speakText(text) {
  if (!('speechSynthesis' in window)) return;
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const cleaned = stripForSpeech(text);
  const utterance = new SpeechSynthesisUtterance(cleaned);
  utterance.rate = 1.0;
  utterance.pitch = 1.3;   // slightly higher pitch for a young calf voice
  utterance.volume = 0.9;

  // Pick an Indian English female voice (en-IN)
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    // 1st: Microsoft Heera (Windows Indian English female)
    voices.find(v => v.lang === 'en-IN' && v.name.includes('Heera')) ||
    // 2nd: Any Indian English female voice
    voices.find(v => v.lang === 'en-IN' && v.name.toLowerCase().includes('female')) ||
    // 3rd: Google Indian English voice (Chrome)
    voices.find(v => v.lang === 'en-IN' && v.name.includes('Google')) ||
    // 4th: Any en-IN voice available
    voices.find(v => v.lang === 'en-IN') ||
    // 5th: Fallback to any English female voice
    voices.find(v => v.lang.startsWith('en') && (v.name.includes('Zira') || v.name.includes('Samantha'))) ||
    voices.find(v => v.lang.startsWith('en'));

  if (preferred) utterance.voice = preferred;
  window.speechSynthesis.speak(utterance);
}

/* ─── Component ─── */
const HIDDEN_ROUTES = ['/admin', '/employee-dashboard', '/staff-access'];

const CalfChatbot = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, addToCart, cartTotal, cartCount } = useCart();
  const { orders } = useOrder();
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: "Moo! 🐄 Hey there! I'm Gowri, your farm-fresh assistant. Type, tap the 🎤 mic, or just say **\"Hey Gowri\"** anytime to wake me up!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [wakeWordActive, setWakeWordActive] = useState(true);
  const [isActivated, setIsActivated] = useState(false);   // Alexa-like activation glow
  const recognitionRef = useRef(null);
  const wakeListenerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // ─── Speech Recognition setup (for active voice input) ───
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setTimeout(() => {
          sendMessageRef.current(transcript);
        }, 400);
      };

      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  // ─── Alexa-like activation chime ───
  const playActivationChime = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const playNote = (freq, start, dur) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.3, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + start + dur);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur);
      };
      playNote(880, 0, 0.12);
      playNote(1100, 0.08, 0.12);
      playNote(1320, 0.16, 0.18);
    } catch (e) { /* Audio not available */ }
  };

  // ─── "Hey Gowri" Wake Word Listener (Alexa-style) ───
  const wakeGreetings = [
    "Moo! I'm here! What can I do for you?",
    "Hey! Gowri at your service! What do you need?",
    "Moo! You called? I'm all ears!",
    "Yes! I'm listening! Tell me what you need!",
    "Moo moo! Gowri is ready! Go ahead!",
  ];

  // Use refs to avoid stale closures in callbacks
  const isListeningRef = useRef(false);
  const wakeWordActiveRef = useRef(true);
  const voiceEnabledRef = useRef(true);
  isListeningRef.current = isListening;
  wakeWordActiveRef.current = wakeWordActive;
  voiceEnabledRef.current = voiceEnabled;

  const startWakeListener = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const wakePatterns = ['hey gowri', 'hay gowri', 'hey gauri', 'hey gouri', 'a gowri', 'he gowri', 'hey glory', 'hey gori'];

    const createAndStartWake = () => {
      // Don't start if mic is in use
      if (isListeningRef.current) return;

      try {
        // Stop old instance if any
        if (wakeListenerRef.current) {
          try { wakeListenerRef.current.stop(); } catch (e) {}
        }

        const wake = new SpeechRecognition();
        wake.lang = 'en-IN';
        wake.continuous = true;
        wake.interimResults = true;

        wake.onresult = (event) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript.toLowerCase().trim();
            const matchedPattern = wakePatterns.find(p => transcript.includes(p));

            if (matchedPattern) {
              wake.stop();

              // 🔔 Alexa-like activation
              playActivationChime();
              setIsActivated(true);
              setIsOpen(true);
              setTimeout(() => setIsActivated(false), 3000);

              // Extract inline command after the wake word
              const afterWake = transcript.split(matchedPattern).pop()?.trim();

              if (afterWake && afterWake.length > 2) {
                // "Hey Gowri, add milk" — process command directly
                setTimeout(() => {
                  sendMessageRef.current(afterWake);
                }, 600);
              } else {
                // No inline command — greet and listen
                const greeting = wakeGreetings[Math.floor(Math.random() * wakeGreetings.length)];
                if (voiceEnabledRef.current) {
                  speakText(greeting);
                }
                // Start active listening after greeting
                setTimeout(() => {
                  if (recognitionRef.current && !isListeningRef.current) {
                    setInput('');
                    try {
                      recognitionRef.current.start();
                      setIsListening(true);
                    } catch (e) { /* already started */ }
                  }
                }, 2000);
              }
              return;
            }
          }
        };

        wake.onend = () => {
          // Always restart unless mic is in active use
          if (wakeWordActiveRef.current && !isListeningRef.current) {
            setTimeout(() => createAndStartWake(), 3000);
          }
        };

        wake.onerror = (e) => {
          // Restart on any error (including no-speech)
          if (wakeWordActiveRef.current && !isListeningRef.current) {
            setTimeout(() => createAndStartWake(), 3000);
          }
        };

        wakeListenerRef.current = wake;
        wake.start();
        console.log('🐄 Hey Gowri wake listener active');
      } catch (e) {
        // Retry after a longer delay to prevent loops
        setTimeout(() => createAndStartWake(), 5000);
      }
    };

    startWakeListener.current = createAndStartWake;

    const activateOnGesture = () => {
      console.log('🐄 First user gesture detected — activating Hey Gowri listener');
      createAndStartWake();
      document.removeEventListener('click', activateOnGesture);
      document.removeEventListener('touchstart', activateOnGesture);
      document.removeEventListener('keydown', activateOnGesture);
    };

    document.addEventListener('click', activateOnGesture);
    document.addEventListener('touchstart', activateOnGesture);
    document.addEventListener('keydown', activateOnGesture);

    return () => {
      document.removeEventListener('click', activateOnGesture);
      document.removeEventListener('touchstart', activateOnGesture);
      document.removeEventListener('keydown', activateOnGesture);
      if (wakeListenerRef.current) {
        try { wakeListenerRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  // Pause/resume wake listener when active mic is toggled
  useEffect(() => {
    if (isListening && wakeListenerRef.current) {
      try { wakeListenerRef.current.stop(); } catch (e) {}
    }
    if (!isListening && wakeWordActive && startWakeListener.current) {
      setTimeout(() => {
        if (!isListeningRef.current) {
          startWakeListener.current();
        }
      }, 800);
    }
  }, [isListening, wakeWordActive]);

  // Ref to always have latest sendMessage
  const sendMessageRef = useRef(null);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInput('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // ─── Drag state ───
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0, moved: false });

  const handlePointerDown = (e) => {
    // Only drag with primary button
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: position.x,
      startPosY: position.y,
      moved: false
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragRef.current.moved = true;
    }
    const newX = Math.max(0, Math.min(window.innerWidth - 76, dragRef.current.startPosX + dx));
    const newY = Math.max(0, Math.min(window.innerHeight - 76, dragRef.current.startPosY + dy));
    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    // Only toggle chat if it was a click (not a drag)
    if (!dragRef.current.moved) {
      setIsOpen(prev => !prev);
    }
  };

  // Preload voices (some browsers load them async)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  /* ─── Smart reply: handles navigation, add-to-cart, tracking, show cart ─── */
  const getSmartReply = (userText) => {
    const lower = userText.toLowerCase().trim();

    // ── NAVIGATE TO PAGE ──
    const navTriggers = ['go to', 'open', 'take me to', 'navigate to', 'show me', 'visit', 'go '];
    const isNavRequest = navTriggers.some(t => lower.includes(t));
    if (isNavRequest) {
      for (const route of pageRoutes) {
        if (route.keywords.some(kw => lower.includes(kw))) {
          if (route.requiresAuth && (!user || user.role !== 'customer')) {
            return `Moo! 🐄 You need to **log in as a customer** first before I can take you to **${route.name}**. Say **go to login** to sign in! 🔐`;
          }
          // Navigate after a short delay so the user sees the reply first
          setTimeout(() => navigate(route.path), 1200);
          return `🧭 Taking you to **${route.name}** page now! Moo! 🐄💚`;
        }
      }
      return "Moo? 🤔 I couldn't find that page. I can take you to:\n\n• **Home** — go to home\n• **Shop** — go to shop\n• **Cart** — open cart\n• **My Orders** — go to my orders\n• **About Us** — go to about\n• **Contact** — go to contact\n• **Login** — go to login\n\nJust say where you'd like to go! 🐄";
    }

    // ── ADD TO CART ──
    if (lower.includes('add') && (lower.includes('cart') || lower.includes('to'))) {
      if (!user || user.role !== 'customer') {
        return "Moo! 🐄 You need to **log in as a customer** first before I can add items to your cart. Head to the Login page! 🔐";
      }
      const product = findProduct(lower);
      if (product) {
        addToCart(product);
        return `✅ Added **${product.name}** (₹${product.price.toFixed(2)}) to your cart! 🛒\n\nYour cart now has **${cartCount + 1} item(s)**. Say **show my cart** to see everything, or keep adding more!`;
      }
      return "Moo? 🤔 I couldn't find that product. Try saying something like:\n\n• **Add Organic Milk to cart**\n• **Add Bananas**\n• **Add Cheddar Cheese**\n\nI know all our products! 🐄";
    }

    // ── SHOW CART ──
    if (lower.includes('show') && lower.includes('cart') || lower === 'my cart' || lower === 'cart') {
      if (!user || user.role !== 'customer') {
        return "You need to **log in as a customer** first to view your cart! 🔐";
      }
      if (cart.length === 0) {
        return "Your cart is empty! 🛒\n\nTry saying **add Organic Milk** or **add Strawberries** to get started! 🐄";
      }
      const cartItems = cart.map(item => `• ${item.name} × ${item.quantity} — ₹${(item.price * item.quantity).toFixed(2)}`).join('\n');
      return `🛒 **Your Cart** (${cartCount} items):\n\n${cartItems}\n\n💰 **Total: ₹${cartTotal.toFixed(2)}**\n\nHead to the **Cart page** to checkout! 🐄`;
    }

    // ── TRACK ORDERS ──
    const baseReply = getBotReply(userText);
    if (baseReply === '__TRACK_ORDERS__') {
      if (!user || user.role !== 'customer') {
        return "You need to **log in as a customer** to track your orders! 🔐";
      }
      if (orders.length === 0) {
        return "You don't have any orders yet! 📋\n\nBrowse our **Shop** and place your first order. I'll be here to help! 🐄";
      }
      const orderSummaries = orders.slice(0, 3).map(order => {
        const lastCompleted = [...order.tracking].reverse().find(t => t.completed);
        const statusEmoji = order.status === 'Delivered' ? '🟢' : order.status === 'Shipped' ? '🔵' : '🟡';
        return `${statusEmoji} **${order.id}** — ${order.status}\n   📅 ${order.date} | 💰 ₹${order.total.toFixed(2)}\n   📦 ${order.items.join(', ')}\n   ⏱️ Last update: ${lastCompleted?.status} (${lastCompleted?.date})`;
      }).join('\n\n');
      return `📋 **Your Recent Orders:**\n\n${orderSummaries}\n\nVisit **My Orders** page for full details! 🐄`;
    }

    return baseReply;
  };

  const sendMessage = (text) => {
    const userText = text || input.trim();
    if (!userText) return;

    const userMsg = { id: Date.now(), from: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate bot "thinking"
    setTimeout(() => {
      const reply = getSmartReply(userText);
      const botMsg = { id: Date.now() + 1, from: 'bot', text: reply };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      // 🔊 Speak the reply aloud!
      if (voiceEnabled) {
        speakText(reply);
      }
    }, 800 + Math.random() * 600);
  };

  // Keep ref updated
  sendMessageRef.current = sendMessage;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* Helper: render markdown-like bold text */
  const renderText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  // Hide chatbot on admin/staff pages
  if (HIDDEN_ROUTES.some(route => location.pathname.startsWith(route))) {
    return null;
  }

  // Calculate chat window position (opens above or below toggle depending on space)
  const chatWindowStyle = {};
  const spaceAbove = position.y;
  const chatRight = window.innerWidth - position.x - 76;

  if (spaceAbove > 400) {
    chatWindowStyle.bottom = window.innerHeight - position.y + 12;
    chatWindowStyle.right = Math.max(12, chatRight);
  } else {
    chatWindowStyle.top = position.y + 84;
    chatWindowStyle.right = Math.max(12, chatRight);
  }

  return (
    <>
      {/* ── Draggable Toggle Button ── */}
      <motion.button
        className={`calf-chatbot-toggle ${isActivated ? 'activated' : ''} ${isListening ? 'gowri-listening' : ''}`}
        style={{
          left: position.x,
          top: position.y,
          right: 'auto',
          bottom: 'auto',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none'
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        whileHover={isDragging ? {} : { scale: 1.1 }}
        aria-label="Open chat with Gowri the calf"
        title="Chat with Gowri 🐄 (drag to move)"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ fontSize: '1.6rem', color: '#bef264', lineHeight: 1 }}
            >
              ✕
            </motion.span>
          ) : (
            <motion.div
              key="calf"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <CalfIcon size={72} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="calf-chat-window"
            style={chatWindowStyle}
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            {/* Header */}
            <div className="calf-chat-header">
              <div className="calf-chat-header-avatar">
                <CalfIcon size={32} />
              </div>
              <div className="calf-chat-header-info">
                <h4>Gowri the Calf</h4>
                <span>Online — Ready to help!</span>
              </div>
              <button
                className="calf-chat-close-btn"
                onClick={() => {
                  setVoiceEnabled(prev => !prev);
                  if (voiceEnabled) window.speechSynthesis?.cancel();
                }}
                aria-label={voiceEnabled ? 'Mute Gowri' : 'Unmute Gowri'}
                title={voiceEnabled ? 'Mute voice' : 'Unmute voice'}
                style={{ marginLeft: '0' }}
              >
                {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button className="calf-chat-close-btn" onClick={() => { setIsOpen(false); window.speechSynthesis?.cancel(); }} aria-label="Close chat">
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="calf-chat-messages">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`calf-msg ${msg.from}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  {msg.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {renderText(line)}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="calf-typing">
                  <div className="calf-typing-dot" />
                  <div className="calf-typing-dot" />
                  <div className="calf-typing-dot" />
                </div>
              )}

              {/* Quick Replies (shown after first bot message if only 1 message) */}
              {messages.length === 1 && !isTyping && (
                <div className="calf-quick-replies">
                  {quickReplies.map((qr, i) => (
                    <motion.button
                      key={i}
                      className="calf-quick-btn"
                      onClick={() => sendMessage(qr.text)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i + 0.3 }}
                    >
                      {qr.label}
                    </motion.button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="calf-chat-input-area">
              <button
                className={`calf-chat-mic-btn ${isListening ? 'listening' : ''}`}
                onClick={toggleListening}
                disabled={isTyping}
                aria-label={isListening ? 'Stop listening' : 'Voice input'}
                title={isListening ? 'Listening... click to stop' : 'Speak your request'}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <input
                className="calf-chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? '🎙️ Listening...' : 'Type or speak to Gowri...'}
                disabled={isTyping || isListening}
                autoFocus
              />
              <button
                className="calf-chat-send-btn"
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CalfChatbot;
