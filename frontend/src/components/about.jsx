import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const features = [
    {
      icon: "⏱️",
      title: "24 Hours",
      description: "Non-stop innovation marathon",
    },
    {
      icon: "🧠",
      title: "Brilliant Minds",
      description: "Collaborate with the best",
    },
    {
      icon: "🚀",
      title: "Limitless Ideas",
      description: "No boundaries, only possibilities",
    },
    {
      icon: "✨",
      title: "Tech Brilliance",
      description: "Cutting-edge solutions",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 px-4 md:px-8 overflow-hidden"
    >
      {/* Section background overlay - subtle */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />

      {/* Decorative elements - toned down */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* <motion.span
            className="inline-block px-4 py-1.5 text-xs font-medium tracking-[0.2em] rounded-full border mb-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(59,130,246,0.1) 100%)",
              borderColor: "rgba(139,92,246,0.3)",
              color: "#c4b5fd",
            }}
          >
            DISCOVER THE JOURNEY
          </motion.span> */}

          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="text-white">
              About{" "}
            </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
              Coherence 2026
            </span>
          </h2>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-purple-500/50" />
            <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#a78bfa]" />
            <div className="h-px w-16 bg-linear-to-l from-transparent to-purple-500/50" />
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mb-16"
        >
          <div
            className="relative p-8 md:p-12 rounded-3xl border backdrop-blur-md overflow-hidden"
            style={{
              background: "rgba(139,92,246,0.05)",
              borderColor: "rgba(139,92,246,0.15)",
            }}
          >
            {/* Subtle corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-purple-500/10 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-500/10 blur-2xl pointer-events-none" />

            {/* Content */}
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
                Welcome to{" "}
                <span className="text-purple-300 font-semibold">
                  Coherence 2026
                </span>
                , where{" "}
                <span className="text-white font-medium">
                  innovation knows no bounds
                </span>
                ! In the heart of our{" "}
                <span className="text-blue-300 font-semibold">
                  24-hour hackathon
                </span>
                , we unite brilliant minds, fueling a{" "}
                <span className="italic text-purple-200">
                  symphony of creativity
                </span>
                .
              </p>

              <div className="my-8 flex justify-center">
                <div className="h-px w-48 bg-linear-to-r from-transparent via-purple-500/40 to-transparent" />
              </div>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
                Join us on a{" "}
                <span className="text-white font-medium">relentless quest</span>{" "}
                to redefine possibilities and amplify the{" "}
                <span className="text-purple-300 font-semibold">
                  pulse of tech brilliance
                </span>
                !
              </p>
            </div>

          </div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              <div
                className="relative p-6 rounded-2xl border border-purple-500/10 backdrop-blur-sm text-center h-full bg-white/5 hover:bg-white/10 transition-colors duration-300"
              >

                <div className="relative z-10">
                  <motion.span
                    className="text-4xl md:text-5xl block mb-4"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.span>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-purple-300/60 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-purple-400/40 text-sm tracking-[0.3em] uppercase">
            Where Ideas Transcend Reality
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
