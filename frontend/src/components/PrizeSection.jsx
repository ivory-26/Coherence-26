import React from "react";
import { motion } from "framer-motion";
import { Code, Brain, Blocks } from "lucide-react";

const trackPrizes = [
  {
    title: "Smart Governance & Public Platforms",
    winner: "₹ 15,000",
    runnerUp: "₹ 7,500",
    Icon: Code,
  },
  {
    title: "HealthTech & Digital Wellbeing",
    winner: "₹ 15,000",
    runnerUp: "₹ 7,500",
    Icon: Brain,
  },
  {
    title: "Student Centric Technology",
    winner: "₹ 15,000",
    runnerUp: "₹ 7,500",
    Icon: Blocks,
  },
];

const sharedPrizeGlow = "rgba(168,85,247,0.24)";

const PrizeSection = () => {
  return (
    <section
      id="prizes"
      className="relative py-24 px-4 md:px-8 overflow-hidden"
    >
      {/* Background overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-950/20 to-transparent pointer-events-none" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="text-white">Prizes </span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
              Up for Grabs
            </span>
          </h2>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-purple-500/50" />
            <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#a78bfa]" />
            <div className="h-px w-16 bg-linear-to-l from-transparent to-purple-500/50" />
          </div>

          {/* <p className="max-w-lg mx-auto text-gray-300 text-base leading-relaxed">
            Glory awaits the worthy. Claim your place at the summit.
          </p> */}
        </motion.div>

        {/* Total Prize Pool Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center mb-2"
        >
          <div className="relative px-10 py-6 rounded-2xl backdrop-blur-xl border border-purple-500/20 bg-white/5 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-purple-500/10 to-blue-500/10 blur-2xl opacity-70 pointer-events-none" />

            <p className="text-sm uppercase tracking-widest text-purple-300/70 mb-2">
              Total Prize Pool
            </p>

            <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              ₹ 1,00,000
            </h3>

            <p className="text-xs text-purple-200/50 mt-2">
              Across all tracks
            </p>
          </div>
        </motion.div>

        {/* Track-wise Prize Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center mt-10 mb-8"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-purple-300/70">
            Track-wise Prizes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {trackPrizes.map((prize, index) => (
            <TrackPrizeCard key={index} prize={prize} index={index} />
          ))}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-right text-white text-sm mr-4 md:mr-10"
        >
          *Each track awards Winner and 1st Runner-up prizes
        </motion.p>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-purple-400/40 text-sm tracking-[0.3em] uppercase">
            Where Brilliance Meets Recognition
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const TrackPrizeCard = ({ prize, index }) => {
  const Icon = prize.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.2,
        duration: 0.7,
        type: "spring",
        stiffness: 60,
      }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="group relative w-full text-center"
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${sharedPrizeGlow}, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-8">
        <motion.div
          className="mb-5 p-4 rounded-2xl border border-white/10 bg-white/5"
          whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          <Icon size={34} className="text-white" strokeWidth={1.8} />
        </motion.div>

        <h3
          className="font-bold text-white mb-3 text-lg md:text-xl min-h-[56px] flex items-center text-center"
        >
          {prize.title}
        </h3>

        <div className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 mb-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-purple-200/70 mb-1">
            Winner
          </p>
          <p className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            {prize.winner}
          </p>
        </div>

        <div className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-purple-200/70 mb-1">
            1st Runner-up
          </p>
          <p className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            {prize.runnerUp}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PrizeSection;
