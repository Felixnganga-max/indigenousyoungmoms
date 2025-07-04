import React from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import WhatWeDo from "../components/WhatWeDo";
import Leriman from "../components/Leriman";
import FAQ from "../components/FAQ";
import CommunityShowcase from "../components/CommunityShowcase";

const Home = () => {
  return (
    <div>
      <Hero />
      <WhatWeDo />
      <CommunityShowcase />
      <FAQ />
    </div>
  );
};

export default Home;
