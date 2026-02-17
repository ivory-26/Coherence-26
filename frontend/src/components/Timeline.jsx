// Timeline — vertical event timeline with alternating sticky cards
// connected by a scroll-driven glowing beam. Desktop uses 150 vh
// sticky-rail sections; mobile collapses to a single flowing column.

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { FileText, Lightbulb, Rocket, Upload, Trophy } from 'lucide-react';

// Hackathon milestones shown on the timeline
const timelineData = [
  {
    id: 1,
    date: 'February 10, 2026',
    title: 'Registration Begins',
    description: 'Start your journey by registering for the event. Gather your team and prepare for the challenge.',
    icon: FileText,
  },
  {
    id: 2,
    date: 'March 20, 2026',
    title: 'Workshops & Mentoring',
    description: 'Join our exclusive workshops to sharpen your skills and get guidance from industry experts.',
    icon: Lightbulb,
  },
  {
    id: 3,
    date: 'March 28, 2026',
    title: 'Hackathon Kick-off',
    description: 'The coding begins! Unleash your creativity and build innovative solutions within the timeframe.',
    icon: Rocket,
  },
  {
    id: 4,
    date: 'March 29, 2026',
    title: 'Submission & Judging',
    description: 'Submit your projects for evaluation. Our judges will review the submissions based on creativity and impact.',
    icon: Upload,
  },
  {
    id: 5,
    date: 'March 30, 2026',
    title: 'Winners Announcement',
    description: 'Celebration of the best projects. Prizes and recognition for the top performing teams.',
    icon: Trophy,
  },
];

// Glass bubble node on the track — glows when active (centred in viewport)
const GlassNode = ({ isActive, Icon }) => (
  <div className="timeline-node-wrapper">
    <div className={`timeline-glass-node ${isActive ? 'timeline-glass-node--active' : ''}`}>
      <Icon className="timeline-node-icon" strokeWidth={1.5} />
      <div className="timeline-node-highlight" />
      <div className="timeline-node-rim" />
    </div>
  </div>
);

// Single timeline row — alternates card left/right on desktop.
// The 150 vh section gives the sticky card room to pin in the viewport.
const TimelineRow = ({ data, index }) => {
  const isEven = index % 2 === 0;
  const rowRef = useRef(null);

  // Track row's scroll progress (0 = entering, 1 = exiting viewport)
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });

  // Active when row is roughly centred in viewport (35%–65%)
  const [isActive, setIsActive] = React.useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIsActive(v >= 0.35 && v <= 0.65);
  });

  return (
    <div ref={rowRef} className="timeline-section">
      <div className={`timeline-row ${isEven ? 'timeline-row--even' : 'timeline-row--odd'}`}>
        {/* Spacer — fills opposite side on desktop */}
        <div className="timeline-spacer" />

        {/* Sticky node on the vertical track */}
        <div className="timeline-node-col">
          <GlassNode isActive={isActive} Icon={data.icon} />
        </div>

        {/* Sticky card — pins to viewport centre while section scrolls */}
        <div className={`timeline-card-wrapper ${isEven ? 'md:text-right' : 'md:text-left'}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`timeline-card ${isActive ? 'timeline-card--active' : ''}`}
          >
            <h3 className="mb-1 font-bold text-white text-xl">{data.title}</h3>
            <p className="mb-2 text-sm text-purple-200 font-semibold">{data.date}</p>
            <p className="text-sm leading-snug text-gray-200">{data.description}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Main timeline — header, beam track, and all rows
const Timeline = () => {
  const containerRef = useRef(null);

  // Beam position/height in px + scroll fraction where beam stops growing
  const [beamMetrics, setBeamMetrics] = React.useState({ top: 0, height: 0, endProgress: 0.8 });

  // Measure beam span using offsetTop (immune to sticky-position quirks)
  React.useEffect(() => {
    const updateMetrics = () => {
      if (!containerRef.current) return;
      const sections = containerRef.current.querySelectorAll('.timeline-section');
      if (sections.length < 2) return;

      const nodeRadius = 28; // half of 3.5rem node
      const firstSection = sections[0];
      const lastSection = sections[sections.length - 1];
      const isDesktop = window.innerWidth >= 768;

      let firstY, lastY;

      if (isDesktop) {
        // Node sticky-centres in section — beam ends at ~75% of last section
        firstY = firstSection.offsetTop;
        lastY = lastSection.offsetTop + (lastSection.offsetHeight - lastSection.offsetHeight * 0.25);
      } else {
        // Mobile: node at top of section, offset by radius
        firstY = firstSection.offsetTop + nodeRadius;
        lastY = lastSection.offsetTop + nodeRadius;
      }
      
      const beamHeightVal = lastY - firstY;
      const containerHeight = containerRef.current.scrollHeight;
      const endProg = containerHeight > 0 ? lastY / containerHeight : 1;

      setBeamMetrics({
        top: firstY,
        height: beamHeightVal,
        endProgress: Math.min(Math.max(endProg, 0.1), 0.99),
      });
    };

    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    const timer = setTimeout(updateMetrics, 500); // re-measure after fonts/images load
    return () => {
      window.removeEventListener('resize', updateMetrics);
      clearTimeout(timer);
    };
  }, []);

  // Scroll progress for the container (0–1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Beam grows from 0 to full track height, then clamps
  const beamHeight = useTransform(
    scrollYProgress,
    [0, beamMetrics.endProgress, 1],
    [0, beamMetrics.height, beamMetrics.height]
  );

  return (
    <div
      className="container mx-auto w-full py-23 px-4 bg-transparent relative"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-28"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
          <span className="text-white">Event </span>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
            Timeline
          </span>
        </h2>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-linear-to-r from-transparent to-purple-500/50" />
          <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#a78bfa]" />
          <div className="h-px w-16 bg-linear-to-l from-transparent to-purple-500/50" />
        </div>
        <p className="max-w-xl mx-auto text-gray-300 text-lg leading-relaxed">
          Follow the journey from registration to victory.
        </p>
      </motion.div>

      {/* Timeline body */}
      <div ref={containerRef} className="relative">
        {/* Faint track line */}
        <div 
          className="timeline-track" 
          style={{ top: beamMetrics.top, height: beamMetrics.height }} 
        />
        {/* Glowing beam — height grows with scroll */}
        <motion.div 
          className="timeline-beam" 
          style={{ top: beamMetrics.top, height: beamHeight }} 
        />

        {timelineData.map((item, index) => (
          <TimelineRow key={item.id} data={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
