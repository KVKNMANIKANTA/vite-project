import React from 'react';
import Hero from '../components/Hero';
import HomeStory from '../components/HomeStory';
import HomeFeatures from '../components/HomeFeatures';
import HomeTestimonials from '../components/HomeTestimonials';

const Home = () => {
  return (
    <div style={{ paddingBottom: '4rem' }}>
      <Hero />
      <HomeStory />
      <HomeFeatures />
      <HomeTestimonials />
    </div>
  );
};

export default Home;
