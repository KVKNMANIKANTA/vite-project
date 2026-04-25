import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const B = import.meta.env.BASE_URL;

const villageScenes = [
  {
    name: "Harvest",
    img: `${B}images/img1.png`, 
    leftImg: `${B}images/img2.png`,
    rightImg: `${B}images/img3.png`,
    leftStyle: {
      width: "320px",
      height: "240px",
      top: "140px",
      left: "8%",
      rotate: -5,
      opacity: 0.9,
      borderRadius: "10px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
    },
    rightStyle: {
      width: "320px",
      height: "240px",
      top: "140px",
      right: "8%",
      rotate: 5,
      opacity: 0.9,
      borderRadius: "10px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
    },
    title: "Golden Harvest",
    description:
      "Experience the richness of the land. Our grains are harvested with care, bringing you the purest flavors of the season.",
    background:
      "radial-gradient(circle at center, #3f4d30 0%, #2c3e23 100%)", 
  },
  {
    name: "Market",
    img: `${B}images/img2.png`, 
    leftImg: `${B}images/img3.png`,
    rightImg: `${B}images/img1.png`,
    title: "Village Market",
    leftStyle: {
      width: "320px",
      height: "240px",
      top: "140px",
      left: "8%",
      rotate: -5,
      opacity: 0.9,
      borderRadius: "10px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
    },
    rightStyle: {
      width: "320px",
      height: "240px",
      top: "140px",
      right: "8%",
      rotate: 5,
      opacity: 0.9,
      borderRadius: "10px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
    },
    description:
      "Fresh from the local market to your table. Support local farmers and enjoy the vibrant taste of community-grown produce.",
    background:
      "radial-gradient(circle at center, #854d0e 0%, #451a03 100%)", 
  },
  {
    name: "Community",
    img: `${B}images/img3.png`, 
    leftImg: `${B}images/img1.png`,
    rightImg: `${B}images/img2.png`,
    title: "Rural Bliss",
    leftStyle: {
      width: "320px",
      height: "240px",
      top: "140px",
      left: "8%",
      rotate: -5,
      opacity: 0.9,
      borderRadius: "10px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
    },
    rightStyle: {
      width: "320px",
      height: "240px",
      top: "140px",
      right: "8%",
      rotate: 5,
      opacity: 0.9,
      borderRadius: "10px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
    },
    description:
      "A celebration of togetherness and tradition. Discover the simple joys of village life and the authentic connection to nature.",
    background:
      "radial-gradient(circle at center, #0f172a 0%, #1e293b 100%)",
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const steps = villageScenes.length;
  const stepRad = Math.PI / steps;
  const [stepIndex, setStepIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const radius = 250; 
  const offset = 80 / radius;
  const startAngle = Math.PI + offset;
  const angle = startAngle + stepIndex * stepRad;

  const lastScrollTime = React.useRef(0);

  // Scroll listener removed for normal page scrolling
  // React.useEffect(() => {
  //   const handleWheel = (event) => { ... }
  // }, []);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const move = (dir) => {
    const dirSign = dir === "right" ? 1 : -1;
    setStepIndex(prev => (prev + dirSign + steps) % steps);
    
    // Slight delay for content update to match potential animation if needed
    setTimeout(() => {
      setActiveIndex(prev =>
        (prev + dirSign + villageScenes.length) % villageScenes.length
      );
    }, 100);
  };

  return (
    <div className="hero">
       <video 
         className="hero-video" 
         autoPlay 
         loop 
         muted 
         playsInline
       >
         <source src={`${B}videos/home1.mp4`} type="video/mp4" />
       </video>
       <div className="hero-overlay" />
      
      {/* Decorative Side Images */}
      <motion.img
        key={`left-${activeIndex}`}
        src={villageScenes[activeIndex].leftImg}
        alt=""
        className="left-side"
        style={{
          position: "absolute",
          ...villageScenes[activeIndex].leftStyle
        }}
        initial={{ x: -100, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: villageScenes[activeIndex].leftStyle.opacity,
          rotate: villageScenes[activeIndex].leftStyle.rotate,
          translateX: mousePosition.x * -2, 
          translateY: mousePosition.y * -2 
        }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      <motion.img
        key={`right-${activeIndex}`}
        src={villageScenes[activeIndex].rightImg}
        alt=""
        className="right-side"
        style={{
          position: "absolute",
          ...villageScenes[activeIndex].rightStyle
        }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: villageScenes[activeIndex].rightStyle.opacity,
          rotate: villageScenes[activeIndex].rightStyle.rotate,
          translateX: mousePosition.x * 2, 
          translateY: mousePosition.y * 2 
        }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />

      <div className="hero-content">
        <div className="hero-text">
          <motion.h1
            key={villageScenes[activeIndex].title}
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "circOut" }}
          >
            {villageScenes[activeIndex].title}
          </motion.h1>
          <motion.p
            key={villageScenes[activeIndex].description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {villageScenes[activeIndex].description}
          </motion.p>
          <motion.button 
            className="btn-order"
            onClick={() => navigate('/login')}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Fresh
          </motion.button>
        </div>

        <div className="circular-slider">
          <div className="circle outer-circle">
            <div className="circle inner-circle">
              <motion.div
                className="center-image"
                key={activeIndex} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <img
                  src={villageScenes[activeIndex].img}
                  alt={villageScenes[activeIndex].name}
                  style={{ borderRadius: '50%' }} 
                />
              </motion.div>
            </div>

            <div
              className="moving-ball"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${(angle * 180) / Math.PI}deg) translate(${radius - 10}px)`,
                background: '#4ade80' // Green ball
              }}
            />
          </div>

          <div className="circle-text">
            <svg viewBox="0 0 1100 1200" width="100%" height="100%">
              <defs>
                <path
                  id="circlePath"
                  d="M600,600 m-550,0 a500,500 0 1,1 1000,0 a500,500 0 1,1 -1000,0"
                />
              </defs>
              <text fill="#ecfccb" fontSize="24" letterSpacing="8">
                <textPath href="#circlePath" startOffset="50%">
                  {villageScenes
                    .map((scene) => ` • ${scene.name.toUpperCase()} `)
                    .join("")} • VILLAGE • VIBES 
                </textPath>
              </text>
            </svg>
          </div>

          <button className="arrow left" onClick={() => move("left")}>
            ←
          </button>
          <button className="arrow right" onClick={() => move("right")}>
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
