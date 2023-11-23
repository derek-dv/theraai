import React from "react";
import { Navbar } from "./Navbar";

const Landing = () => {
  return (
    <div className="h-screen bg-blue-900">
      <section className="text-white p-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Thera AI</h1>
          <p className="text-lg">A chatbot powered by OpenAI and React</p>
          <p className="text-md mt-4">
            Find Support and Healing with Our Therapy App
          </p>
          <button>Get Started</button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
