import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faUserPlus,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
    faGithub,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import Background from "../components/background";
import axios from "axios";

const Networking = () => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [form, setForm] = useState({
        name: "",
        college: "",
        domain: "",
        bio: "",
        linkedin: "",
        github: "",
    });

    const LinkedInRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_%]+\/?$/;
    const GitHubRegex = /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-_%]+\/?$/;

    // Fetch participants on load
    useEffect(() => {
        fetchParticipants();
    }, []);

    const fetchParticipants = async () => {
        try {
            const res = await axios.get("/api/participants");
            setParticipants(res.data.participants);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Only image files allowed");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image must be less than 5MB");
            return;
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.linkedin && !LinkedInRegex.test(form.linkedin)) {
            alert("Please enter a valid LinkedIn profile URL.");
            return;
        }

        if (form.github && !GitHubRegex.test(form.github)) {
            alert("Please enter a valid GitHub profile URL.");
            return;
        }

        if (!image) {
            alert("Please upload an image");
            return;
        }

        try {
            setLoading(true);

            // 1️⃣ Upload Image
            const imageData = new FormData();
            imageData.append("image", image);

            const uploadRes = await axios.post(
                "/api/upload",
                imageData
            );

            const imageUrl = uploadRes.data.imageUrl;

            // 2️⃣ Save participant
            const res = await axios.post("/api/participants", {
                ...form,
                imageUrl,
            });

            console.log("Saved: ", res.data);

            // Reset form
            setForm({
                name: "",
                college: "",
                domain: "",
                bio: "",
                linkedin: "",
                github: "",
            });

            setImage(null);
            setPreview(null);

            // Refresh participants
            fetchParticipants();
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="relative min-h-screen overflow-x-hidden">
            <Background />

            <div className="relative z-10 min-h-screen px-4 md:px-8 py-24">
                <div className="max-w-6xl mx-auto">

                    {/* Back Button */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-purple-300/70 hover:text-white hover:bg-purple-500/20 border border-transparent hover:border-purple-500/30 transition-all duration-300"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <span className="text-sm tracking-wide">Back to Home</span>
                        </Link>
                    </motion.div>

                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                            <span className="text-white">Networking </span>
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
                                Hub
                            </span>
                        </h1>

                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-16 bg-linear-to-r from-transparent to-purple-500/50" />
                            <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#a78bfa]" />
                            <div className="h-px w-16 bg-linear-to-l from-transparent to-purple-500/50" />
                        </div>

                        <p className="text-purple-300/60 text-sm tracking-[0.2em] uppercase">
                            Connect with fellow innovators
                        </p>
                    </motion.div>

                    {/* Networking Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl mx-auto mb-16 p-8 rounded-2xl border backdrop-blur-md space-y-5"
                        style={{
                            background: "rgba(139,92,246,0.05)",
                            borderColor: "rgba(139,92,246,0.2)",
                        }}
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                required
                                className="bg-transparent border border-purple-500/20 rounded-lg px-4 py-3 text-purple-100 focus:outline-none"
                            />
                            <input
                                name="college"
                                value={form.college}
                                onChange={handleChange}
                                placeholder="College"
                                required
                                className="bg-transparent border border-purple-500/20 rounded-lg px-4 py-3 text-purple-100 focus:outline-none"
                            />
                        </div>

                        <input
                            name="domain"
                            value={form.domain}
                            onChange={handleChange}
                            placeholder="Domain (AI, Web3, etc.)"
                            className="w-full bg-transparent border border-purple-500/20 rounded-lg px-4 py-3 text-purple-100 focus:outline-none"
                        />

                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            placeholder="Short Bio"
                            rows="3"
                            className="w-full bg-transparent border border-purple-500/20 rounded-lg px-4 py-3 text-purple-100 focus:outline-none"
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                name="linkedin"
                                value={form.linkedin}
                                onChange={handleChange}
                                placeholder="https://www.linkedin.com/in/username"
                                pattern="https://(www\.)?linkedin\.com/in/[a-zA-Z0-9-_%]+/?"
                                title="Enter a valid LinkedIn profile URL"
                                required
                                className="bg-transparent border border-purple-500/20 rounded-lg px-4 py-3 text-purple-100 focus:outline-none"
                            />
                            <input
                                name="github"
                                value={form.github}
                                onChange={handleChange}
                                placeholder="https://github.com/username"
                                pattern="https://(www\.)?github\.com/[a-zA-Z0-9-]+/?"
                                title="Enter a valid GitHub profile URL"
                                required
                                className="bg-transparent border border-purple-500/20 rounded-lg px-4 py-3 text-purple-100 focus:outline-none"
                            />
                        </div>

                        {/* Profile Image Upload */}
                        <div className="space-y-2">
                            <label className="text-sm text-purple-300">
                                Profile Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                required
                                className="w-full bg-transparent border border-purple-500/20 rounded-lg px-4 py-2 text-purple-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-500"
                            />

                            {preview && (
                                <div className="mt-3 flex justify-center">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-24 h-24 rounded-full object-cover border border-purple-500/40"
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:scale-[1.02]"
                            style={{
                                background:
                                    "linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)",
                                boxShadow:
                                    "0 0 25px rgba(167,139,250,0.4), 0 0 40px rgba(96,165,250,0.3)",
                            }}
                            onClick={handleSubmit}
                        >
                            <FontAwesomeIcon icon={faUserPlus} />
                            Add to Networking Board
                        </button>
                    </motion.form>


                    {/* Empty State */}
                    {participants.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <FontAwesomeIcon
                                icon={faUsers}
                                className="text-purple-400/30 text-4xl mb-4"
                            />
                            <p className="text-purple-200 text-lg font-medium">
                                No participants yet
                            </p>
                            <p className="text-purple-300/50 text-sm">
                                Be the first to join the networking board
                            </p>
                        </motion.div>
                    )}

                    {/* Participants List */}
                    {participants.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="max-w-3xl mx-auto flex flex-col gap-5"
                        >
                            {participants.map((user, index) => (
                                <motion.div
                                    key={user._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 hover:bg-white/[0.07] hover:border-purple-500/40 hover:scale-[1.02]"
                                    style={{
                                        background: "rgba(255,255,255,0.03)",
                                        borderColor: "rgba(139,92,246,0.15)",
                                    }}
                                >
                                    <div className="flex items-start gap-5">

                                        {/* Profile Image */}
                                        <img
                                            src={user.imageUrl}
                                            alt={user.name}
                                            className="w-20 h-20 rounded-full object-cover border border-purple-500/40 shadow-[0_0_20px_rgba(167,139,250,0.35)]"
                                        />

                                        <div className="flex-1">
                                            {/* Name */}
                                            <h3 className="text-xl font-semibold text-white">
                                                {user.name}
                                            </h3>

                                            {/* College + Domain */}
                                            <p className="text-purple-300/60 text-sm mt-1">
                                                {user.college} • {user.domain}
                                            </p>

                                            {/* Bio */}
                                            {user.bio && (
                                                <p className="text-purple-200/80 text-sm mt-3 leading-relaxed">
                                                    {user.bio}
                                                </p>
                                            )}

                                            {/* Social Links */}
                                            <div className="flex gap-6 mt-4 text-sm">
                                                {user.linkedin && (
                                                    <a
                                                        href={user.linkedin}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
                                                    >
                                                        <FontAwesomeIcon icon={faLinkedin} />
                                                        LinkedIn
                                                    </a>
                                                )}

                                                {user.github && (
                                                    <a
                                                        href={user.github}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="flex items-center gap-2 text-purple-300 hover:text-white transition"
                                                    >
                                                        <FontAwesomeIcon icon={faGithub} />
                                                        GitHub
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Networking;
