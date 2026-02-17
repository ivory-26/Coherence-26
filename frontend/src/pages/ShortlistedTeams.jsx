import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeft, faUsers } from "@fortawesome/free-solid-svg-icons";
import Background from "../components/background";

import apiClient from "../api/client";

const ShortlistedTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch shortlisted teams on mount
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await apiClient.get("https://coherence-26-is6m.onrender.com/api/teams/shortlisted");
        const data = res.data;

        if (!data.success) throw new Error(data.message || "Failed to fetch teams");
        setTeams(data.teams);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Client-side filtering by teamName
  const filteredTeams = useMemo(() => {
    if (!debouncedQuery.trim()) return teams;
    return teams.filter((team) =>
      team.teamName.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [teams, debouncedQuery]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />

      <div className="relative z-10 min-h-screen px-4 md:px-8 py-24">
        <div className="max-w-6xl mx-auto">

          {/* Back Button */}
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-purple-300/70 hover:text-white hover:bg-purple-500/20 border border-transparent hover:border-purple-500/30 transition-all duration-300 mb-8"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="text-sm tracking-wide">Back to Home</span>
          </motion.a>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              <span className="text-white">Shortlisted </span>
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
                Teams
              </span>
            </h1>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-linear-to-r from-transparent to-purple-500/50" />
              <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#a78bfa]" />
              <div className="h-px w-16 bg-linear-to-l from-transparent to-purple-500/50" />
            </div>

            <p className="text-purple-300/60 text-sm tracking-[0.2em] uppercase">
              Teams advancing to the next round
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto mb-12"
          >
            <div
              className="relative flex items-center rounded-xl border backdrop-blur-md overflow-hidden"
              style={{
                background: "rgba(139,92,246,0.05)",
                borderColor: "rgba(139,92,246,0.2)",
              }}
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-4 text-purple-400/50"
              />
              <input
                type="text"
                placeholder="Search by team name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent pl-11 pr-4 py-3.5 text-purple-100 placeholder-purple-400/40 focus:outline-none text-sm tracking-wide"
              />
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24">
              <motion.div
                className="w-16 h-16 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(147,197,253,0.9) 0%, rgba(167,139,250,0.7) 40%, rgba(99,102,241,0.5) 100%)",
                  boxShadow: "0 0 40px rgba(167,139,250,0.5), 0 0 80px rgba(96,165,250,0.3)",
                }}
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ rotate: { duration: 3, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
              />
              <p className="text-purple-300/50 text-sm mt-6 tracking-widest uppercase">
                Loading teams...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div
                className="inline-block p-6 rounded-2xl border backdrop-blur-md"
                style={{
                  background: "rgba(239,68,68,0.05)",
                  borderColor: "rgba(239,68,68,0.2)",
                }}
              >
                <p className="text-red-300 text-lg font-medium mb-2">Something went wrong</p>
                <p className="text-red-300/60 text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredTeams.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div
                className="inline-block p-8 rounded-2xl border backdrop-blur-md"
                style={{
                  background: "rgba(139,92,246,0.05)",
                  borderColor: "rgba(139,92,246,0.15)",
                }}
              >
                <FontAwesomeIcon
                  icon={faUsers}
                  className="text-purple-400/30 text-4xl mb-4"
                />
                <p className="text-purple-200 text-lg font-medium mb-1">No teams found</p>
                <p className="text-purple-300/50 text-sm">
                  {debouncedQuery
                    ? `No results for "${debouncedQuery}"`
                    : "No shortlisted teams yet"}
                </p>
              </div>
            </motion.div>
          )}

          {/* Teams List */}
          {!loading && !error && filteredTeams.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto flex flex-col gap-3"
            >
              {/* List Header */}
              <div
                className="flex items-center justify-between px-5 py-3 rounded-xl text-xs tracking-wider uppercase text-purple-400/50"
              >
                <span className="flex-1">Team Name</span>
                <span className="w-40 text-right">Leader</span>
              </div>

              {filteredTeams.map((team, index) => (
                <motion.div
                  key={team._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group"
                >
                  <div
                    className="flex items-center justify-between px-5 py-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.07] hover:border-purple-500/30"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      borderColor: "rgba(139,92,246,0.12)",
                    }}
                  >
                    {/* Team Name */}
                    <span
                      className="flex-1 font-semibold text-transparent bg-clip-text"
                      style={{
                        backgroundImage: "linear-gradient(135deg, #c4b5fd 0%, #93c5fd 100%)",
                      }}
                    >
                      {team.teamName}
                    </span>

                    {/* Leader Name */}
                    <span className="w-40 text-right text-purple-200/70 text-sm">
                      {team.leaderName}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Results count */}
          {!loading && !error && teams.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-purple-400/40 text-sm mt-10 tracking-[0.2em] uppercase"
            >
              {filteredTeams.length} of {teams.length} teams
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortlistedTeams;
